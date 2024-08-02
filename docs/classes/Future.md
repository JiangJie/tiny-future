[**tiny-future**](../README.md) • **Docs**

***

[tiny-future](../README.md) / Future

# Class: Future\<T\>

A tiny way to make `Promise` more convenient to use without any dependencies.

Create a new Future which wraps a new `Promise`.

## Example

```ts
const future = new Future<number>();
asyncFunc(() => {
    future.resolve(0);
});
return future.promise;
```

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Constructors

### new Future()

```ts
new Future<T>(): Future<T>
```

#### Returns

[`Future`](Future.md)\<`T`\>

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `promise` | `readonly` | `Promise`\<`T`\> | The Promise created by the Future. | [future.ts:31](https://github.com/JiangJie/tiny-future/blob/HEAD/src/future.ts#L31) |
| `reject` | `readonly` | (`reason`?: `any`) => `void` | Reject the created Promise. | [future.ts:26](https://github.com/JiangJie/tiny-future/blob/HEAD/src/future.ts#L26) |
| `resolve` | `readonly` | (`value`: `T` \| `PromiseLike`\<`T`\>) => `void` | Resolve the created Promise. | [future.ts:21](https://github.com/JiangJie/tiny-future/blob/HEAD/src/future.ts#L21) |
