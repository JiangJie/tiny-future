import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Future } from '../src/future.ts';

describe('Future', () => {
    function runTests() {
        it('Future.promise is a Promise', () => {
            const future = new Future<number>();

            expect(future.promise).toBeInstanceOf(Promise);
        });

        it('Resolve', async () => {
            const future = new Future<number>();

            const done = future.promise.then((value) => {
                expect(value).toBe(0);
            });

            setTimeout(() => {
                future.resolve(0);
            }, 10);

            await done;
        });

        it('Reject', async () => {
            const future = new Future<number>();

            const done = future.promise.catch((reason) => {
                expect(reason).toBe(-1);
            });

            setTimeout(() => {
                future.reject(-1);
            }, 10);

            await done;
        });
    }

    describe('with Promise.withResolvers', () => {
        runTests();
    });

    describe('without Promise.withResolvers (fallback)', () => {
        const originalWithResolvers = Promise.withResolvers;

        beforeAll(() => {
            // @ts-expect-error: just for test
            delete Promise.withResolvers;
        });

        afterAll(() => {
            Promise.withResolvers = originalWithResolvers;
        });

        runTests();
    });
});
