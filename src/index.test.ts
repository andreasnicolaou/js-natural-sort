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
});
