/* eslint-disable @typescript-eslint/no-explicit-any */

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
    readonly resolve!: (value: T | PromiseLike<T>) => void;

    /**
     * Reject the created Promise.
     */
    readonly reject!: (reason?: any) => void;

    /**
     * The Promise created by the Future.
     */
    readonly promise: Promise<T> = new Promise<T>((resolve, reject) => {
        (this as any).resolve = resolve;
        (this as any).reject = reject;
    });
}