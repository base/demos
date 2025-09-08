"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeferredPromise = void 0;
/**
 * Create a defered Promise.
 *
 * If the Promise is rejected prior to a handler being added, this can result in an
 * `UnhandledPromiseRejection` error. Optionally this can be suppressed with the
 * `suppressUnhandledRejection` flag, as it's common to belatedly handle deferred Promises, or to
 * ignore them if they're no longer relevant (e.g. related to a cancelled request).
 *
 * However, be very careful that you have handled the Promise if you do this. Suppressing these
 * errors is dangerous, they exist for good reason. An unhandled rejection can hide errors, making
 * debugging extremely difficult. They should only be suppressed if you're confident that the
 * Promise is always handled correctly, in both the success and failure cases.
 *
 * @param args - The arguments.
 * @param args.suppressUnhandledRejection - This option adds an empty error handler
 * to the Promise to suppress the UnhandledPromiseRejection error. This can be
 * useful if the deferred Promise is sometimes intentionally not used.
 * @returns A deferred Promise.
 * @template Result - The result type of the Promise.
 */
function createDeferredPromise({ suppressUnhandledRejection = false, } = {}) {
    let resolve;
    let reject;
    const promise = new Promise((innerResolve, innerReject) => {
        resolve = innerResolve;
        reject = innerReject;
    });
    if (suppressUnhandledRejection) {
        promise.catch((_error) => {
            // This handler is used to suppress the UnhandledPromiseRejection error
        });
    }
    // @ts-expect-error We know that these are assigned, but TypeScript doesn't
    return { promise, resolve, reject };
}
exports.createDeferredPromise = createDeferredPromise;
//# sourceMappingURL=promise.cjs.map