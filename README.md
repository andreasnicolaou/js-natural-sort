# js-natural-sort

`js-natural-sort` is a JavaScript package that provides a natural sorting function for strings and numbers, handling various types of data such as dates, IPs, hexadecimal numbers, and regular strings. It offers a more intuitive sorting order compared to default lexicographical sorting.

## Installation

You can install the package via npm:

```bash
npm install js-natural-sort
```

## Usage

```typescript
import { naturalSort } from 'js-natural-sort';

const arr = ['10.0401', 10.022, 10.042, '10.021999'].sort(naturalSort());
console.log(arr); // ['10.021999', 10.022, '10.0401', 10.042]
```

## Parameters

| Parameter     | Type                | Description                                     | Default |
| ------------- | ------------------- | ----------------------------------------------- | ------- |
| `insensitive` | `boolean`           | Whether the sorting should be case-insensitive. | `false` |
| `order`       | `'asc'` \| `'desc'` | Sorting order. Can be `'asc'` or `'desc'`.      | `'asc'` |

## Contributing

Contributions are welcome! If you encounter issues or have ideas to enhance the library, feel free to submit an issue or pull request.
