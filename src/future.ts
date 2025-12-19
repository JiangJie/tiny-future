/**
 * A tiny way to make `Promise` more convenient to use without any dependencies.
 *
 * Create a new Future which wraps a new `Promise`, allowing you to resolve or reject it from outside the executor.
 *
 * Inspired by C# `TaskCompletionSource`.
 *
 * @typeParam T - The type of the value that the Promise will resolve to.
 *
 * @example Basic usage
 * ```ts
 * const future = new Future<number>();
 * asyncFunc(() => {
 *     future.resolve(0);
 * });
 * return future.promise;
 * ```
 *
 * @example With async/await
 * ```ts
 * const future = new Future<string>();
 * setTimeout(() => future.resolve('done'), 1000);
 * const result = await future.promise;
 * console.log(result); // 'done'
 * ```
 *
 * @example Error handling
 * ```ts
 * const future = new Future<void>();
 * future.reject(new Error('something went wrong'));
 * await future.promise.catch(err => console.error(err));
 * ```
 */
export class Future<T> {
    /**
     * Resolves the Promise created by the Future.
     *
     * @param value - The value to resolve the Promise with, or a Promise that resolves to the value.
     *
     * @example
     * ```ts
     * const future = new Future<string>();
     * future.resolve('success');
     * // or with a Promise
     * future.resolve(Promise.resolve('success'));
     * ```
     */
    resolve!: (value: T | PromiseLike<T>) => void;

    /**
     * Rejects the Promise created by the Future.
     *
     * @param reason - The reason for rejecting the Promise. Typically an Error object.
     *
     * @example
     * ```ts
     * const future = new Future<string>();
     * future.reject(new Error('something went wrong'));
     * ```
     */
    reject!: (reason?: unknown) => void;

    /**
     * The Promise instance created by the Future.
     *
     * Use this to await the result or attach `.then()` / `.catch()` handlers.
     *
     * @example
     * ```ts
     * const future = new Future<number>();
     * future.promise.then(value => console.log(value));
     * future.resolve(42); // logs: 42
     * ```
     */
    promise: Promise<T>;

    /**
     * Creates a new Future instance.
     *
     * Uses `Promise.withResolvers()` if available (ES2024+), otherwise falls back to manual implementation
     * for compatibility with older environments.
     */
    constructor() {
        // If the environment supports `Promise.withResolvers`, just use it.
        if (typeof Promise.withResolvers === 'function') {
            const { promise, resolve, reject } = Promise.withResolvers<T>();
            this.promise = promise;
            this.resolve = resolve;
            this.reject = reject;
        } else {
            // Fallback for older environments
            this.promise = new Promise<T>((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
    }
}
