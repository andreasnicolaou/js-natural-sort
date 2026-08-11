import { naturalSort } from './index';

describe('Natural Sort Tests', () => {
  test('Simple Numerics', () => {
    expect(['10', 9, 2, '1', '4'].sort(naturalSort())).toEqual(['1', 2, '4', 9, '10']);
  });

  test('Floats', () => {
    expect(['10.0401', 10.022, 10.042, '10.021999'].sort(naturalSort())).toEqual([
      '10.021999',
      10.022,
      '10.0401',
      10.042,
    ]);
  });

  test('IP address equality (line 29)', () => {
    expect(['192.168.1.1', '192.168.1.1'].sort(naturalSort())).toEqual(['192.168.1.1', '192.168.1.1']);
  });

  test('Hexadecimal string comparison', () => {
    expect(['0x20', '0x10'].sort(naturalSort())).toEqual(['0x10', '0x20']);
    expect(['0x10', '0x20'].sort(naturalSort())).toEqual(['0x10', '0x20']);
  });

  test('Float & Decimal Notation', () => {
    expect(['10.04f', '10.039F', '10.038d', '10.037D'].sort(naturalSort())).toEqual([
      '10.037D',
      '10.038d',
      '10.039F',
      '10.04f',
    ]);
  });

  test('Scientific Notation', () => {
    expect(['1.528535047e5', '1.528535047e7', '1.528535047e3'].sort(naturalSort())).toEqual([
      '1.528535047e3',
      '1.528535047e5',
      '1.528535047e7',
    ]);
  });

  test('IP Addresses', () => {
    expect(['192.168.0.100', '192.168.0.1', '192.168.1.1'].sort(naturalSort())).toEqual([
      '192.168.0.1',
      '192.168.0.100',
      '192.168.1.1',
    ]);
  });

  test('Filenames', () => {
    expect(['car.mov', '01alpha.sgi', '001alpha.sgi', 'my.string_41299.tif'].sort(naturalSort())).toEqual([
      '001alpha.sgi',
      '01alpha.sgi',
      'car.mov',
      'my.string_41299.tif',
    ]);
  });

  test('Dates (MM/DD/YYYY)', () => {
    expect(['10/12/2008', '10/11/2008', '10/11/2007', '10/12/2007'].sort(naturalSort())).toEqual([
      '10/11/2007',
      '10/12/2007',
      '10/11/2008',
      '10/12/2008',
    ]);
  });

  test('Money', () => {
    expect(['$10002.00', '$10001.02', '$10001.01'].sort(naturalSort())).toEqual([
      '$10001.01',
      '$10001.02',
      '$10002.00',
    ]);
  });

  test('Movie Titles', () => {
    expect(
      ['1 Title - The Big Lebowski', '1 Title - Gattaca', '1 Title - Last Picture Show'].sort(naturalSort())
    ).toEqual(['1 Title - Gattaca', '1 Title - Last Picture Show', '1 Title - The Big Lebowski']);
  });

  test('Case-sensitive sorting (default)', () => {
    expect(['a', 'B'].sort(naturalSort())).toEqual(['B', 'a']);
  });

  test('Case-insensitive sorting', () => {
    const sortInsensitive = naturalSort({ insensitive: true });
    expect(['a', 'B'].sort(sortInsensitive)).toEqual(['a', 'B']);
  });

  test('ISO Date Sorting', () => {
    expect(['2022-01-01', '2020-01-01', '2021-01-01'].sort(naturalSort())).toEqual([
      '2020-01-01',
      '2021-01-01',
      '2022-01-01',
    ]);
  });

  test('Relative Paths Sorting', () => {
    expect(['./images/2.png', './images/10.png', './images/1.png'].sort(naturalSort())).toEqual([
      './images/1.png',
      './images/2.png',
      './images/10.png',
    ]);
  });

  test('Absolute Paths Sorting', () => {
    expect(
      ['/home/user/images/2.png', '/home/user/images/10.png', '/home/user/images/1.png'].sort(naturalSort())
    ).toEqual(['/home/user/images/1.png', '/home/user/images/2.png', '/home/user/images/10.png']);
  });

  test('Leading Zeros and Mixed Numbers with Strings', () => {
    expect(['file001.txt', 'file1.txt', 'file010.txt', 'file2.txt'].sort(naturalSort())).toEqual([
      'file1.txt',
      'file2.txt',
      'file001.txt',
      'file010.txt',
    ]);
  });

  test('Mixed Special Characters and Numbers', () => {
    expect(['file-10.txt', 'file-2.txt', 'file-1.txt', 'file-5.txt'].sort(naturalSort())).toEqual([
      'file-1.txt',
      'file-2.txt',
      'file-5.txt',
      'file-10.txt',
    ]);
  });

  test('Very Large Numbers', () => {
    expect(['1e100', '1e101', '1e99'].sort(naturalSort())).toEqual(['1e99', '1e100', '1e101']);
  });

  test('File Names with Multiple Extensions', () => {
    expect(['file.1.2.txt', 'file.10.txt', 'file.2.1.txt'].sort(naturalSort())).toEqual([
      'file.1.2.txt',
      'file.2.1.txt',
      'file.10.txt',
    ]);
  });

  test('Negative Numbers', () => {
    expect(['-5', '10', '-10', '5'].sort(naturalSort())).toEqual(['-10', '-5', '5', '10']);
  });

  test('Long Strings and Alphanumeric Sorting', () => {
    expect(['abc10def', 'abc2def', 'abc1def', 'abc11def'].sort(naturalSort())).toEqual([
      'abc1def',
      'abc2def',
      'abc10def',
      'abc11def',
    ]);
  });

  test('Dates in Different Formats (ISO Date format)', () => {
    expect(['2022-01-02', '2021-12-31', '2020-11-11', '2021-01-01'].sort(naturalSort())).toEqual([
      '2020-11-11',
      '2021-01-01',
      '2021-12-31',
      '2022-01-02',
    ]);
  });

  test('Mixed Case Alphanumeric Strings', () => {
    expect(['A2', 'a1', 'B1', 'b2'].sort(naturalSort({ insensitive: true }))).toEqual(['a1', 'A2', 'B1', 'b2']);
  });

  test('Mixed Case Alphanumeric Strings Descenting', () => {
    expect(['A2', 'a1', 'B1', 'b2'].sort(naturalSort({ insensitive: true, order: 'desc' }))).toEqual([
      'b2',
      'B1',
      'A2',
      'a1',
    ]);
  });

  test('Sorting a List with Special Characters', () => {
    expect(['hello!', 'hello#', 'hello$', 'hello@'].sort(naturalSort())).toEqual([
      'hello!',
      'hello#',
      'hello$',
      'hello@',
    ]);
  });

  test('Sorting a List with Special Characters Descenting', () => {
    expect(['hello!', 'hello#', 'hello$', 'hello@'].sort(naturalSort({ order: 'desc' }))).toEqual([
      'hello@',
      'hello$',
      'hello#',
      'hello!',
    ]);
  });

  test('Strings with punctuation mixed with numbers', () => {
    expect(['file1!10.txt', 'file1@5.txt', 'file1#2.txt'].sort(naturalSort())).toEqual([
      'file1!10.txt',
      'file1#2.txt',
      'file1@5.txt',
    ]);
  });

  test('Sorting relative paths', () => {
    expect(['./folder1/file1.txt', './folder2/file2.txt', './folder1/file10.txt'].sort(naturalSort())).toEqual([
      './folder1/file1.txt',
      './folder1/file10.txt',
      './folder2/file2.txt',
    ]);
  });

  test('Sorting with multiple spaces between numbers', () => {
    expect(['file    10.txt', 'file 2.txt', 'file 1.txt', 'file 11.txt'].sort(naturalSort())).toEqual([
      'file 1.txt',
      'file 2.txt',
      'file    10.txt',
      'file 11.txt',
    ]);
  });

  test('Sorting with multiple spaces between numbers Descenting', () => {
    expect(['file    10.txt', 'file 2.txt', 'file 1.txt', 'file 11.txt'].sort(naturalSort({ order: 'desc' }))).toEqual([
      'file 11.txt',
      'file    10.txt',
      'file 2.txt',
      'file 1.txt',
    ]);
  });

  test('Sorting absolute paths with dates in file names', () => {
    expect(
      ['/home/user/file_2022-01-01.txt', '/home/user/file_2021-12-31.txt', '/home/user/file_2020-11-11.txt'].sort(
        naturalSort()
      )
    ).toEqual(['/home/user/file_2020-11-11.txt', '/home/user/file_2021-12-31.txt', '/home/user/file_2022-01-01.txt']);
  });

  test('Sorting objects by string property', () => {
    expect([{ name: 'File 10' }, { name: 'File 2' }, { name: 'File 1' }].sort(naturalSort({ key: 'name' }))).toEqual([
      { name: 'File 1' },
      { name: 'File 2' },
      { name: 'File 10' },
    ]);
  });

  test('Sorting objects by numeric property', () => {
    expect([{ id: 10 }, { id: 2 }, { id: 1 }].sort(naturalSort({ key: 'id' }))).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 10 },
    ]);
  });

  test('Sorting objects by nested property', () => {
    expect(
      [{ data: { value: '10.5' } }, { data: { value: '2.3' } }, { data: { value: '1.7' } }].sort(
        naturalSort({ key: (x) => x.data.value })
      )
    ).toEqual([{ data: { value: '1.7' } }, { data: { value: '2.3' } }, { data: { value: '10.5' } }]);
  });

  test('Sorting objects with mixed value types', () => {
    expect([{ val: '10' }, { val: 2 }, { val: '1' }].sort(naturalSort({ key: 'val' }))).toEqual([
      { val: '1' },
      { val: 2 },
      { val: '10' },
    ]);
  });

  test('Sorting objects with case-sensitive property', () => {
    expect([{ code: 'a10' }, { code: 'A2' }, { code: 'a1' }].sort(naturalSort({ key: 'code' }))).toEqual([
      { code: 'A2' },
      { code: 'a1' },
      { code: 'a10' },
    ]);
  });

  test('Sorting objects with case-insensitive property', () => {
    expect(
      [{ code: 'a10' }, { code: 'A2' }, { code: 'a1' }].sort(naturalSort({ key: 'code', insensitive: true }))
    ).toEqual([{ code: 'a1' }, { code: 'A2' }, { code: 'a10' }]);
  });

  test('Sorting objects with missing key property', () => {
    expect([{ id: 10 }, { name: 'Item 2' }, { id: 1 }].sort(naturalSort({ key: 'id' }))).toEqual([
      { id: 1 },
      { id: 10 },
      { name: 'Item 2' },
    ]);
  });

  test('Sorting objects with null/undefined values', () => {
    expect(
      [{ val: 10 }, { val: null }, { val: 2 }, { val: undefined }].sort(naturalSort({ key: 'val', order: 'asc' }))
    ).toEqual([{ val: 2 }, { val: 10 }, { val: null }, { val: undefined }]);
  });

  test('Sorting objects in descending order', () => {
    expect([{ id: 10 }, { id: 2 }, { id: 1 }].sort(naturalSort({ key: 'id', order: 'desc' }))).toEqual([
      { id: 10 },
      { id: 2 },
      { id: 1 },
    ]);
  });

  test('Zero and zero-padded whole values sort numerically', () => {
    expect(['1', '0', '2'].sort(naturalSort())).toEqual(['0', '1', '2']);
    expect([1, 0, 2].sort(naturalSort())).toEqual([0, 1, 2]);
    expect(['007', '8', '9'].sort(naturalSort())).toEqual(['007', '8', '9']);
    expect(['0.10', '0.9'].sort(naturalSort())).toEqual(['0.10', '0.9']);
  });

  test('IPv6 addresses', () => {
    expect(
      ['2001:0db8:0000:0000:0000:0000:0000:0002', '2001:0db8:0000:0000:0000:0000:0000:0001'].sort(naturalSort())
    ).toEqual(['2001:0db8:0000:0000:0000:0000:0000:0001', '2001:0db8:0000:0000:0000:0000:0000:0002']);
  });

  test('Mixed IPv4 and IPv6 compares without NaN', () => {
    const compare = naturalSort();
    expect(Number.isNaN(compare('192.168.0.1', '2001:0db8:0000:0000:0000:0000:0000:0001'))).toBe(false);
    expect(['2001:0db8:0000:0000:0000:0000:0000:0001', '192.168.0.1'].sort(compare)).toEqual([
      '192.168.0.1',
      '2001:0db8:0000:0000:0000:0000:0000:0001',
    ]);
  });

  test('Invalid octets are not treated as an IP address', () => {
    expect(['999.999.999.999', '1.1.1.1'].sort(naturalSort())).toEqual(['1.1.1.1', '999.999.999.999']);
  });

  test('Hex values beyond Number.MAX_SAFE_INTEGER stay distinct', () => {
    expect(['0xFFFFFFFFFFFFFFFF', '0xFFFFFFFFFFFFFFFE', '0x1'].sort(naturalSort())).toEqual([
      '0x1',
      '0xFFFFFFFFFFFFFFFE',
      '0xFFFFFFFFFFFFFFFF',
    ]);
    expect(naturalSort()('0x000f', '0xF')).toBe(0);
  });

  test('Date objects', () => {
    const dates = [new Date('2021-06-05'), new Date('2020-01-01'), new Date('2022-03-03')];
    expect(dates.sort(naturalSort()).map((date) => date.toISOString())).toEqual([
      '2020-01-01T00:00:00.000Z',
      '2021-06-05T00:00:00.000Z',
      '2022-03-03T00:00:00.000Z',
    ]);
  });

  test('Invalid Date does not throw or produce NaN', () => {
    const compare = naturalSort();
    expect(Number.isNaN(compare(new Date('nope'), new Date('2020-01-01')))).toBe(false);
  });

  test('Objects that only claim the Date tag do not throw', () => {
    const compare = naturalSort();
    const fake = { [Symbol.toStringTag]: 'Date' } as unknown as Date;
    expect(Object.prototype.toString.call(fake)).toBe('[object Date]');
    expect(() => compare(fake, new Date('2020-01-01'))).not.toThrow();
  });

  test('Values whose toString throws do not abort the sort', () => {
    const compare = naturalSort();
    // String() throws on both of these: no [[DateValue]] slot, and no prototype at all
    expect(() => compare(Object.create(Date.prototype) as Date, new Date('2020-01-01'))).not.toThrow();
    expect(() => compare(Object.create(null) as unknown as string, 'a')).not.toThrow();
    expect(['b', Object.create(null) as unknown as string, 'a'].sort(compare)).toHaveLength(3);
  });

  test('Null and undefined entries with a key do not throw', () => {
    expect([null, { id: 2 }, { id: 1 }].sort(naturalSort({ key: 'id' }))).toEqual([{ id: 1 }, { id: 2 }, null]);
    expect([undefined, { id: 1 }].sort(naturalSort({ key: 'id' }))).toEqual([{ id: 1 }, undefined]);
  });

  test('Date detection stays linear on long inputs', () => {
    const compare = naturalSort();
    const value = `1${' '.repeat(20000)}1:`;
    const start = Date.now();
    compare(value, `${value}b`);
    expect(Date.now() - start).toBeLessThan(1000);
  });

  test('Comparisons never return NaN', () => {
    const compare = naturalSort();
    const values = ['0', '1', '007', 'a', 'B', '10.5', '0x1f', '192.168.0.1', '::1', '2001:db8::1', '', '2020-01-01'];
    for (const a of values) {
      for (const b of values) {
        expect(Number.isNaN(compare(a, b))).toBe(false);
      }
    }
  });

  test('Sorting objects with function key selector', () => {
    expect(
      [
        { name: 'John', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
      ].sort(naturalSort({ key: (x) => `${x.name}${x.age}` }))
    ).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
    ]);
  });
});
