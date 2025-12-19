/**
 * A tiny way to make `Promise` more convenient to use without any dependencies.
 *
 * Create a new Future which wraps a new `Promise`.
 *
 * @example
 * ```ts
 * const future = new Future<number>();
 * asyncFunc(() => {
 *     future.resolve(0);
 * });
 * return future.promise;
 * ```
 */
export class Future<T> {
    /**
     * Resolve the created Promise.
     */
    readonly resolve!: Parameters<ConstructorParameters<typeof Promise<T>>[0]>[0];

    /**
     * Reject the created Promise.
     */
    readonly reject!: Parameters<ConstructorParameters<typeof Promise<T>>[0]>[1];

    /**
     * The Promise created by the Future.
     */
    readonly promise: Promise<T>;

    constructor() {
        // If the environment supports `Promise.withResolvers`, just use it.
        if (typeof Promise.withResolvers === 'function') {
            const { promise, resolve, reject } = Promise.withResolvers<T>();
            this.promise = promise;
            this.resolve = resolve;
            this.reject = reject;
        } else {
            this.promise = new Promise<T>((resolve, reject) => {
                (this as { resolve: typeof resolve; }).resolve = resolve;
                (this as { reject: typeof reject; }).reject = reject;
            });
        }
    }
}