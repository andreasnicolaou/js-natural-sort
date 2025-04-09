class JsNaturalSort {
  private static readonly DATE_REGEX =
    /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[/-]\d{1,4}[-/]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private static readonly HEX_REGEX = /^0x[0-9a-f]+$/i;
  private static readonly IP_REGEX = /^(?:(\d{1,3}\.){3}\d{1,3}|([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/;
  private static readonly LEADING_ZERO_REGEX = /^0/;
  private static readonly NUMBER_REGEX = /(^([+-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi;
  private static readonly SPACE_REGEX = /(^[ ]*|[ ]*$)/g;

  private insensitive: boolean;

  constructor(insensitive: boolean = false) {
    this.insensitive = insensitive;
  }

  public compare(a: string | number, b: string | number): number {
    const x = this.normalize(a).replace(JsNaturalSort.SPACE_REGEX, '') || '';
    const y = this.normalize(b).replace(JsNaturalSort.SPACE_REGEX, '') || '';

    if (JsNaturalSort.IP_REGEX.test(x) && JsNaturalSort.IP_REGEX.test(y)) {
      const xParts = x.split('.').map(Number);
      const yParts = y.split('.').map(Number);
      for (let i = 0; i < 4; i++) {
        if (xParts[i] !== yParts[i]) {
          return xParts[i] - yParts[i];
        }
      }
      return 0;
    }

    const xN = this.normalizeChunks(x)
      .replace(JsNaturalSort.NUMBER_REGEX, '\0$1\0')
      .replace(/\0$/, '')
      .replace(/^\0/, '')
      .split('\0');
    const yN = this.normalizeChunks(y)
      .replace(JsNaturalSort.NUMBER_REGEX, '\0$1\0')
      .replace(/\0$/, '')
      .replace(/^\0/, '')
      .split('\0');
    const xHex = x.match(JsNaturalSort.HEX_REGEX);
    const yHex = y.match(JsNaturalSort.HEX_REGEX);
    const xDate = !xHex && xN.length !== 1 && x.match(JsNaturalSort.DATE_REGEX) && Date.parse(x);
    const yDate = !yHex && xDate && y.match(JsNaturalSort.DATE_REGEX) && Date.parse(y);

    if (xHex && yHex) {
      const xNum = parseInt(xHex[0], 16);
      const yNum = parseInt(yHex[0], 16);
      return xNum - yNum;
    }

    if (xDate && yDate) {
      return xDate - yDate;
    }

    const maxLength = Math.max(xN.length, yN.length);
    for (let cLoc = 0; cLoc < maxLength; cLoc++) {
      const xChunk = xN[cLoc] || '';
      const yChunk = yN[cLoc] || '';

      const xNum = parseFloat(xChunk);
      const yNum = parseFloat(yChunk);

      const xValidNum = !isNaN(xNum) && !xChunk.match(JsNaturalSort.LEADING_ZERO_REGEX) ? xNum : NaN;
      const yValidNum = !isNaN(yNum) && !yChunk.match(JsNaturalSort.LEADING_ZERO_REGEX) ? yNum : NaN;

      if (isNaN(xValidNum)) {
        if (!isNaN(yValidNum)) {
          return 1;
        }
      } else if (isNaN(yValidNum)) {
        return -1;
      }

      if (!isNaN(xValidNum) && !isNaN(yValidNum)) {
        if (xValidNum !== yValidNum) {
          return xValidNum - yValidNum;
        }
        if (xChunk !== yChunk) {
          if (xChunk < yChunk) {
            return -1;
          }
          if (xChunk > yChunk) {
            return 1;
          }
        }
        continue;
      }

      // Pure string comparison using ASCII order
      if (xChunk < yChunk) {
        return -1;
      }
      if (xChunk > yChunk) {
        return 1;
      }
    }

    return 0;
  }

  private normalize(value: string | number): string {
    const str = value.toString();
    return this.insensitive ? str.toLowerCase() : str;
  }

  private normalizeChunks(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
  }
}
/**
 * Creates a sorting function based on the given parameters.
 * @param insensitive - A flag to indicate whether the sorting should be case-insensitive. Default is false.
 * @param order - The desired order for sorting, either 'asc' for ascending or 'desc' for descending. Default is 'asc'.
 * @returns A comparison function that can be used with sorting functions like `Array.prototype.sort`.
 * @author Andreas Nicolaou
 */
export function naturalSort(
  insensitive: boolean = false,
  order: 'asc' | 'desc' = 'asc'
): (a: string | number, b: string | number) => number {
  const sorter = new JsNaturalSort(insensitive);
  return (a: string | number, b: string | number) => {
    const result = sorter.compare(a, b);
    return order === 'desc' ? -result : result;
  };
}
