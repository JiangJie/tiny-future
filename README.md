# Future

[![NPM version](https://img.shields.io/npm/v/tiny-future.svg)](https://npmjs.org/package/tiny-future)
[![NPM downloads](https://badgen.net/npm/dm/tiny-future)](https://npmjs.org/package/tiny-future)
[![JSR Version](https://jsr.io/badges/@happy-js/tiny-future)](https://jsr.io/@happy-js/tiny-future)
[![JSR Score](https://jsr.io/badges/@happy-js/tiny-future/score)](https://jsr.io/@happy-js/tiny-future/score)
[![Build Status](https://github.com/jiangjie/tiny-future/actions/workflows/test.yml/badge.svg)](https://github.com/jiangjie/tiny-future/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/JiangJie/tiny-future/graph/badge.svg)](https://codecov.io/gh/JiangJie/tiny-future)

---

`Future` uses less than 10 lines of code to change the usage of `Promise`.

Allow `Promise` to call `resolve/reject` anywhere, just like `C#` `TaskCompletionSource`, without being restricted to the `executor` that creates `Promise`.

> [!NOTE]
> `Future` uses `Promise.withResolvers` to create `Promise`, if `Promise.withResolvers` is not available, `Future` will fall back to a regular `Promise`.

---

## Installation

```sh
# via pnpm
pnpm add tiny-future
# or via yarn
yarn add tiny-future
# or just from npm
npm install --save tiny-future
# via JSR
jsr add @happy-js/tiny-future
# for deno
deno add @happy-js/tiny-future
# for bun
bunx jsr add @happy-js/tiny-future
```

## Example

```ts
import { Future } from 'tiny-future';

function sleep(ms: number):Promise<number> {
    const future = new Future<number>();

    setTimeout(() => {
        // future.resolve/future.reject at anywhere
        future.resolve(0);
    }, ms);

    return future.promise;
}

await sleep(1000);
```

If you have used `C#` `TaskCompletionSource`, then you should be familiar with the usage of `Future`.

Compare to the usual way of creating `Promise`.

```ts
function sleep(ms: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // resolve/reject must in the executor closure
            resolve(ms);
        }, ms);
    });
}

await sleep(1000);
```

## [Docs](docs/README.md)