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
- ESM, CommonJS, and AMD build support

## Installation

You can install the package via npm:

```bash
npm install @andreasnicolaou/js-natural-sort
```

## Usage

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

## Parameters

The function accepts a single optional `options` object with the following properties:

| Parameter     | Type                | Description                                     | Default |
| ------------- | ------------------- | ----------------------------------------------- | ------- |
| `insensitive` | `boolean`           | Whether the sorting should be case-insensitive. | `false` |
| `order`       | `'asc'` \| `'desc'` | Sorting order. Can be `'asc'` or `'desc'`.      | `'asc'` |

## Contributing

Contributions are welcome! If you encounter issues or have ideas to enhance the library, feel free to submit an issue or pull request.
