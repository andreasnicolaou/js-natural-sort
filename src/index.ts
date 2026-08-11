export type NaturalSortableValue = string | number | undefined | null | Date | boolean | bigint;
class JsNaturalSort {
  // Date-like shapes, kept as separate patterns so each one stays simple and, more importantly, so each
  // uses a single unambiguous quantifier: the previous combined pattern nested `[\w ]+` groups, which
  // backtracked super-linearly (a 1600 character value took minutes to reject).
  private static readonly DATE_LONG_REGEX = /^\w+, \w+ \d+, \d{4}/; // "Monday, August 11, 2026"
  private static readonly DATE_NUMERIC_REGEX = /^\d{1,4}[/-]\d{1,4}[-/]\d{1,4}/; // "10/12/2008", "2008-10-12"
  private static readonly DATE_TIME_REGEX = /^[\w ,]*\d{1,2}:\d{2}/; // "Sat, 11 Aug 2026 10:30:00"
  private static readonly DECIMAL_REGEX = /^[+-]?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?$/;
  private static readonly HEX_PREFIX_REGEX = /^0x0*/i;
  private static readonly HEX_REGEX = /^0x[0-9a-f]+$/i;
  private static readonly IPV4_REGEX = /^\d{1,3}(?:\.\d{1,3}){3}$/;
  private static readonly IPV6_REGEX = /^[0-9a-f]{1,4}(?::[0-9a-f]{1,4}){7}$/i;
  private static readonly LEADING_ZERO_REGEX = /^0/;
  private static readonly NUMBER_REGEX = /(^([+-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi;
  private static readonly WHITESPACE_REGEX = /\s+/g;

  private readonly insensitive: boolean;

  constructor(insensitive: boolean = false) {
    this.insensitive = insensitive;
  }

  public compare(a: NaturalSortableValue, b: NaturalSortableValue): number {
    const xTime = this.dateValue(a);
    const yTime = this.dateValue(b);
    if (xTime !== null && yTime !== null) {
      return xTime - yTime;
    }

    const x = this.normalize(a);
    const y = this.normalize(b);

    const hex = this.compareHex(x, y);
    if (hex !== null) {
      return hex;
    }

    const ip = this.compareIp(x, y);
    if (ip !== null) {
      return ip;
    }

    const xN = this.toChunks(x);
    const yN = this.toChunks(y);
    const xDate = xN.length !== 1 && this.isDateLike(x) ? Date.parse(x) : Number.NaN;
    const yDate = yN.length !== 1 && this.isDateLike(y) ? Date.parse(y) : Number.NaN;
    if (!Number.isNaN(xDate) && !Number.isNaN(yDate)) {
      return xDate - yDate;
    }

    return this.compareChunks(xN, yN);
  }

  /**
   * Reads a chunk as a number, or NaN when it should be compared as text.
   * Chunks with a leading zero stay text so that `file001` keeps its padding, unless the whole
   * value is a single decimal chunk ("0", "007", "0.5"), which is genuinely numeric.
   */
  private chunkToNumber(chunk: string, single: boolean): number {
    if (JsNaturalSort.LEADING_ZERO_REGEX.test(chunk) && !(single && JsNaturalSort.DECIMAL_REGEX.test(chunk))) {
      return Number.NaN;
    }
    return Number.parseFloat(chunk);
  }

  private compareChunk(xChunk: string, yChunk: string, xSingle: boolean, ySingle: boolean): number {
    const xNum = this.chunkToNumber(xChunk, xSingle);
    const yNum = this.chunkToNumber(yChunk, ySingle);
    const xIsNum = !Number.isNaN(xNum);
    const yIsNum = !Number.isNaN(yNum);

    // Numbers sort before text
    if (xIsNum !== yIsNum) {
      return xIsNum ? -1 : 1;
    }
    if (xIsNum && yIsNum && xNum !== yNum) {
      return xNum < yNum ? -1 : 1;
    }
    // Equal numbers still tie-break on the raw chunk, so "1.0" and "1.00" keep a stable order
    if (xChunk === yChunk) {
      return 0;
    }
    return xChunk < yChunk ? -1 : 1;
  }

  private compareChunks(xN: string[], yN: string[]): number {
    const xSingle = xN.length === 1;
    const ySingle = yN.length === 1;
    const maxLength = Math.max(xN.length, yN.length);

    for (let cLoc = 0; cLoc < maxLength; cLoc++) {
      const result = this.compareChunk(xN[cLoc] ?? '', yN[cLoc] ?? '', xSingle, ySingle);
      if (result !== 0) {
        return result;
      }
    }

    return 0;
  }

  /**
   * Compares two hex literals by magnitude. Digits are compared after stripping the prefix and any
   * padding, so values wider than `Number.MAX_SAFE_INTEGER` stay exact.
   */
  private compareHex(x: string, y: string): number | null {
    if (!JsNaturalSort.HEX_REGEX.test(x) || !JsNaturalSort.HEX_REGEX.test(y)) {
      return null;
    }
    const xHex = x.toLowerCase().replace(JsNaturalSort.HEX_PREFIX_REGEX, '');
    const yHex = y.toLowerCase().replace(JsNaturalSort.HEX_PREFIX_REGEX, '');
    if (xHex.length !== yHex.length) {
      return xHex.length - yHex.length;
    }
    if (xHex === yHex) {
      return 0;
    }
    return xHex < yHex ? -1 : 1;
  }

  /**
   * Compares two addresses of the same family part by part. Returns null when either value is not an
   * address, or when an IPv4 address meets an IPv6 one, so the caller falls back to natural ordering.
   */
  private compareIp(x: string, y: string): number | null {
    const xParts = this.ipParts(x);
    const yParts = this.ipParts(y);
    if (!xParts || !yParts || xParts.length !== yParts.length) {
      return null;
    }
    for (let i = 0; i < xParts.length; i++) {
      if (xParts[i] !== yParts[i]) {
        return xParts[i] - yParts[i];
      }
    }
    return 0;
  }

  /**
   * Returns the timestamp of a Date, or null for anything else (an invalid Date included).
   * The tag is checked instead of `instanceof` so Dates from another realm (jsdom, vm, an iframe) are
   * still recognized; `instanceof` would also accept `Object.create(Date.prototype)`, which throws on
   * `getTime()`. The callable guard covers objects that merely claim the tag via `Symbol.toStringTag`.
   */
  private dateValue(value: NaturalSortableValue): number | null {
    if (Object.prototype.toString.call(value) !== '[object Date]') {
      return null;
    }
    const date = value as Date;
    if (typeof date.getTime !== 'function') {
      return null;
    }
    const time = date.getTime();
    return typeof time === 'number' && !Number.isNaN(time) ? time : null;
  }

  private ipParts(value: string): number[] | null {
    if (JsNaturalSort.IPV4_REGEX.test(value)) {
      const parts = value.split('.').map(Number);
      return parts.every((part) => part <= 255) ? parts : null;
    }
    if (JsNaturalSort.IPV6_REGEX.test(value)) {
      return value.split(':').map((part) => Number.parseInt(part, 16));
    }
    return null;
  }

  private isDateLike(value: string): boolean {
    return (
      JsNaturalSort.DATE_TIME_REGEX.test(value) ||
      JsNaturalSort.DATE_NUMERIC_REGEX.test(value) ||
      JsNaturalSort.DATE_LONG_REGEX.test(value)
    );
  }

  private normalize(value: NaturalSortableValue): string {
    if (value === null || value === undefined) {
      return '';
    }
    let str: string;
    try {
      str = String(value);
    } catch {
      // A value whose own toString throws (a null-prototype object, or something inheriting from
      // Date.prototype with no date behind it) sorts as empty instead of aborting the whole sort
      // and leaving the array half reordered.
      return '';
    }
    str = str.replace(JsNaturalSort.WHITESPACE_REGEX, ' ').trim();
    return this.insensitive ? str.toLowerCase() : str;
  }

  /** Splits a value into alternating text and number chunks, e.g. "file10.txt" -> ["file", "10", ".txt"]. */
  private toChunks(str: string): string[] {
    return str
      .replace(JsNaturalSort.NUMBER_REGEX, '\0$1\0')
      .replace(/^\0|\0$/g, '')
      .split('\0');
  }
}

export type NaturalSortOptions<T = unknown> = {
  insensitive?: boolean;
  order?: 'asc' | 'desc';
  key?: keyof T | ((obj: T) => NaturalSortableValue);
};

/**
 * Creates a sorting function based on the given parameters.
 * @param options - Configuration options for the sorting behavior.
 * @param options.insensitive - A flag to indicate whether the sorting should be case-insensitive. Default is false.
 * @param options.order - The desired order for sorting, either 'asc' for ascending or 'desc' for descending. Default is 'asc'.
 * @param options.key - The property key or accessor function to use when sorting objects.
 * @returns A comparison function that can be used with sorting functions like `Array.prototype.sort`.
 * @author Andreas Nicolaou
 */
export const naturalSort = <T = unknown>({ insensitive = false, order = 'asc', key }: NaturalSortOptions<T> = {}): ((
  a: T,
  b: T
) => number) => {
  const sorter = new JsNaturalSort(insensitive);
  const select = (item: T): NaturalSortableValue => {
    if (key === undefined) {
      return item as unknown as NaturalSortableValue;
    }
    if (typeof key === 'function') {
      return key(item);
    }
    // Guard against null/undefined entries in the array being sorted
    return item === null || item === undefined ? undefined : (item[key] as unknown as NaturalSortableValue);
  };

  return (a: T, b: T) => {
    const result = sorter.compare(select(a), select(b));
    return order === 'desc' ? -result : result;
  };
};
