import { assert } from '@std/assert';
import { Future } from '../src/future.ts';

Deno.test('Future', async (t) => {
    async function doTest() {
        await t.step('Future.promise is a Promise', () => {
            const future = new Future<number>();

            assert(future.promise instanceof Promise);
        });

        await t.step('Resolve', async () => {
            const future = new Future<number>();

            const done = future.promise.then((value) => {
                assert(value === 0);
            });

            setTimeout(() => {
                future.resolve(0);
            }, 10);

            await done;
        });

        await t.step('Reject', async () => {
            const future = new Future<number>();

            const done = future.promise.catch((reason) => {
                assert(reason === -1);
            });

            setTimeout(() => {
                future.reject(-1);
            }, 10);

            await done;
        });
    }

    // `Promise.withResolvers` is a function.
    await doTest();

    // Disable `Promise.withResolvers`, then test again.
    delete Promise.withResolvers;
    await doTest();
});