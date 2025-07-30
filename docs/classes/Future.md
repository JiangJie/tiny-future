[**tiny-future**](../README.md)

***

[tiny-future](../README.md) / Future

# Class: Future\<T\>

Defined in: [src/future.ts:15](https://github.com/JiangJie/tiny-future/blob/6414fce6ede755349b5853aa14c6acdf88467617/src/future.ts#L15)

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

### Constructor

```ts
new Future<T>(): Future<T>;
```

Defined in: [src/future.ts:31](https://github.com/JiangJie/tiny-future/blob/6414fce6ede755349b5853aa14c6acdf88467617/src/future.ts#L31)

#### Returns

`Future`\<`T`\>

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="promise"></a> `promise` | `readonly` | `Promise`\<`T`\> | The Promise created by the Future. | [src/future.ts:29](https://github.com/JiangJie/tiny-future/blob/6414fce6ede755349b5853aa14c6acdf88467617/src/future.ts#L29) |
| <a id="reject"></a> `reject` | `readonly` | (`reason?`) => `void` | Reject the created Promise. | [src/future.ts:24](https://github.com/JiangJie/tiny-future/blob/6414fce6ede755349b5853aa14c6acdf88467617/src/future.ts#L24) |
| <a id="resolve"></a> `resolve` | `readonly` | (`value`) => `void` | Resolve the created Promise. | [src/future.ts:19](https://github.com/JiangJie/tiny-future/blob/6414fce6ede755349b5853aa14c6acdf88467617/src/future.ts#L19) |
