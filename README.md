# js-natural-sort

![GitHub package.json version](https://img.shields.io/github/package-json/v/andreasnicolaou/js-natural-sort)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/andreasnicolaou/js-natural-sort/build.yaml)
![GitHub License](https://img.shields.io/github/license/andreasnicolaou/js-natural-sort)

![NPM Downloads](https://img.shields.io/npm/dm/%40andreasnicolaou%2Fjs-natural-sort)

`js-natural-sort` is a JavaScript package that provides a natural sorting function for strings and numbers, handling various types of data such as dates, IPs, hexadecimal numbers, and regular strings. It offers a more intuitive sorting order compared to default lexicographical sorting.

## Features

- Natural sorting (e.g. '10' < '100')
- Date-aware comparisons
- IP address sorting
- Hexadecimal value support
- Case-insensitive mode
- Handles leading zeroes correctly
- Object support via key or accessor
- ESM, CommonJS, AMD, UMD (browser), and minified UMD build support
- TypeScript type definitions included

## Browser Usage

You can use the UMD build directly in the browser:

```html
<script src="dist/index.umd.js"></script>
<script>
  // global variable: naturalSort
  const arr = ['10', '2', '1'].sort(naturalSort());
  console.log(arr); // ["1", "2", "10"]
</script>
```

For production, use the minified build (`dist/index.umd.min.js`).

## Installation

You can install the package via npm:

```bash
npm install @andreasnicolaou/js-natural-sort
```

## Usage (Node.js / Bundlers)

```typescript
import { naturalSort } from '@andreasnicolaou/js-natural-sort';

const arrFloats = ['10.0401', 10.022, 10.042, '10.021999'].sort(naturalSort());
console.log(arrFloats); // ['10.021999', 10.022, '10.0401', 10.042]
```

```typescript
import { naturalSort } from '@andreasnicolaou/js-natural-sort';

const arrDates = ['2022-01-02', '2021-12-31', '2020-11-11', '2021-01-01'].sort(naturalSort());
console.log(arrDates); // ['2020-11-11', '2021-01-01', '2021-12-31', '2022-01-02']
```

```typescript
import { naturalSort } from '@andreasnicolaou/js-natural-sort';

const arrObj = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
].sort(naturalSort({ key: (x) => `${x.name}${x.age}` }));
console.log(arrObj); // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 35 }, { name: 'John', age: 30 }]
```

```typescript
import { naturalSort } from '@andreasnicolaou/js-natural-sort';

const arrObj2 = [{ id: 10 }, { id: 2 }, { id: 1 }].sort(naturalSort({ key: 'id', order: 'desc' }));
console.log(arrObj2); // [{ id: 10 }, { id: 2 }, { id: 1 }]
```

## TypeScript

Type definitions are included. You can use this package with full TypeScript support out of the box.

## Parameters

The function accepts a single optional `options` object with the following properties:

| Parameter     | Type                                 | Description                                                   | Default       |
| ------------- | ------------------------------------ | ------------------------------------------------------------- | ------------- |
| `insensitive` | `boolean`                            | Whether the sorting should be case-insensitive.               | `false`       |
| `order`       | `'asc'` \| `'desc'`                  | Sorting order. Can be `'asc'` or `'desc'`.                    | `'asc'`       |
| `key`         | `'keyof T'` \| `'(obj: T) => value'` | Key or accessor function to extract sortable value from item. | `'undefined'` |

## Contributing

Contributions are welcome! If you encounter issues or have ideas to enhance the library, feel free to submit an issue or pull request.
