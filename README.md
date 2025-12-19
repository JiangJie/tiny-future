# tiny-future

[![NPM version](https://img.shields.io/npm/v/tiny-future.svg)](https://npmjs.org/package/tiny-future)
[![NPM downloads](https://badgen.net/npm/dm/tiny-future)](https://npmjs.org/package/tiny-future)
[![JSR Version](https://jsr.io/badges/@happy-js/tiny-future)](https://jsr.io/@happy-js/tiny-future)
[![JSR Score](https://jsr.io/badges/@happy-js/tiny-future/score)](https://jsr.io/@happy-js/tiny-future/score)
[![Build Status](https://github.com/jiangjie/tiny-future/actions/workflows/test.yml/badge.svg)](https://github.com/jiangjie/tiny-future/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/JiangJie/tiny-future/graph/badge.svg)](https://codecov.io/gh/JiangJie/tiny-future)

A zero-dependency Future/Promise wrapper to resolve or reject a Promise outside its executor.

Inspired by C# `TaskCompletionSource`.

## Features

- Zero dependencies
- TypeScript first with full type support
- Works with `Promise.withResolvers` (ES2024) with automatic fallback
- Supports ESM, CommonJS, and Deno/JSR

## Installation

```sh
# npm
npm install tiny-future

# pnpm
pnpm add tiny-future

# yarn
yarn add tiny-future

# JSR (Deno)
deno add @happy-js/tiny-future

# JSR (other runtimes)
npx jsr add @happy-js/tiny-future
```

## Usage

```ts
import { Future } from 'tiny-future';

function sleep(ms: number): Promise<number> {
    const future = new Future<number>();

    setTimeout(() => {
        // resolve/reject from anywhere, not just inside the executor
        future.resolve(ms);
    }, ms);

    return future.promise;
}

await sleep(1000);
```

### Comparison with standard Promise

With `Future`, you can resolve or reject from anywhere:

```ts
// Using Future
const future = new Future<string>();
someAsyncOperation((result) => {
    future.resolve(result);
});
return future.promise;
```

With standard `Promise`, resolve/reject must be inside the executor:

```ts
// Using Promise
return new Promise((resolve) => {
    someAsyncOperation((result) => {
        resolve(result);
    });
});
```

### Error handling

```ts
const future = new Future<void>();

future.promise.catch((err) => {
    console.error('Error:', err.message);
});

future.reject(new Error('something went wrong'));
```

## API

### `Future<T>`

| Property | Type | Description |
|----------|------|-------------|
| `promise` | `Promise<T>` | The underlying Promise instance |
| `resolve` | `(value: T \| PromiseLike<T>) => void` | Resolves the Promise |
| `reject` | `(reason?: unknown) => void` | Rejects the Promise |

## Documentation

[API Documentation](https://jiangjie.github.io/tiny-future/)

## License

MIT
