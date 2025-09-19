# js-natural-sort

`js-natural-sort` is a JavaScript package that provides a natural sorting function for strings and numbers, handling various types of data such as dates, IPs, hexadecimal numbers, and regular strings. It offers a more intuitive sorting order compared to default lexicographical sorting.

![TypeScript](https://img.shields.io/badge/TS-TypeScript-3178c6?logo=typescript&logoColor=white)
![GitHub contributors](https://img.shields.io/github/contributors/andreasnicolaou/js-natural-sort)
![GitHub License](https://img.shields.io/github/license/andreasnicolaou/js-natural-sort)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/andreasnicolaou/js-natural-sort/build.yaml)
![GitHub package.json version](https://img.shields.io/github/package-json/v/andreasnicolaou/js-natural-sort)
[![Known Vulnerabilities](https://snyk.io/test/github/andreasnicolaou/js-natural-sort/badge.svg)](https://snyk.io/test/github/andreasnicolaou/js-natural-sort)
![Bundle Size](https://deno.bundlejs.com/badge?q=@andreasnicolaou/js-natural-sort&treeshake=[*])

![ESLint](https://img.shields.io/badge/linter-eslint-4B32C3.svg?logo=eslint)
![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)
![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
[![codecov](https://codecov.io/gh/andreasnicolaou/js-natural-sort/graph/badge.svg?token=D6W66RJDLT)](https://codecov.io/gh/andreasnicolaou/js-natural-sort)

![NPM Downloads](https://img.shields.io/npm/dm/%40andreasnicolaou%2Fjs-natural-sort)

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

## Installation

You can install the package via npm:

```bash
npm install @andreasnicolaou/js-natural-sort
```

```bash
yarn add @andreasnicolaou/js-natural-sort
```

```bash
pnpm add @andreasnicolaou/js-natural-sort
```

### CDN Usage

For direct browser usage without a build step:

```html
<!-- unpkg CDN (latest version, unminified) -->
<script src="https://unpkg.com/@andreasnicolaou/js-natural-sort/dist/index.umd.js"></script>

<!-- unpkg CDN (latest version, minified) -->
<script src="https://unpkg.com/@andreasnicolaou/js-natural-sort/dist/index.umd.min.js"></script>

<!-- jsDelivr CDN (unminified) -->
<script src="https://cdn.jsdelivr.net/npm/@andreasnicolaou/js-natural-sort/dist/index.umd.js"></script>

<!-- jsDelivr CDN (minified) -->
<script src="https://cdn.jsdelivr.net/npm/@andreasnicolaou/js-natural-sort/dist/index.umd.min.js"></script>
```

#### ES Modules (Recommended)

```js
import { naturalSort } from '@andreasnicolaou/js-natural-sort';

const arr = ['10', '2', '1'].sort(naturalSort());
console.log(arr); // ['1', '2', '10']
```

#### CommonJS

```js
const { naturalSort } = require('@andreasnicolaou/js-natural-sort');

const arr = ['10', '2', '1'].sort(naturalSort());
console.log(arr); // ['1', '2', '10']
```

#### Browser (UMD via CDN)

```html
<script src="https://unpkg.com/@andreasnicolaou/js-natural-sort/dist/index.umd.min.js"></script>
<script>
  // global: naturalSort
  const arr = ['10', '2', '1'].sort(naturalSort());
  console.log(arr); // ['1', '2', '10']
</script>
```

> **Note:** When using the UMD build in the browser, the global variable is named `naturalSort`.

#### Browser (ES Modules via CDN)

```html
<script type="module">
  import { naturalSort } from 'https://cdn.jsdelivr.net/npm/@andreasnicolaou/js-natural-sort/dist/index.js';
  const arr = ['10', '2', '1'].sort(naturalSort());
  console.log(arr); // ['1', '2', '10']
</script>
```

#### TypeScript

Type definitions are included out of the box:

```ts
import { naturalSort } from '@andreasnicolaou/js-natural-sort';

const arr: string[] = ['10', '2', '1'].sort(naturalSort());
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

#### Legacy Builds

Legacy outputs (`dist/index.esm.js`, `dist/index.cjs.js`, `dist/index.amd.js`) are still published for compatibility, but it is recommended to use the new outputs (`dist/index.js`, `dist/index.cjs`, UMD, and type definitions) for all new projects.

> **Note:** The legacy AMD build (`dist/index.amd.js`) exposes the global variable as `natural-sort` (with a dash), not `naturalSort`. This is for backward compatibility.

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
