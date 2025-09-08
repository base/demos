"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapError = exports.getErrorMessage = exports.isErrorWithStack = exports.isErrorWithMessage = exports.isErrorWithCode = void 0;
const pony_cause_1 = require("pony-cause");
const misc_1 = require("./misc.cjs");
/**
 * Type guard for determining whether the given value is an instance of Error.
 * For errors generated via `fs.promises`, `error instanceof Error` won't work,
 * so we have to come up with another way of testing.
 *
 * @param error - The object to check.
 * @returns A boolean.
 */
function isError(error) {
    return (error instanceof Error ||
        ((0, misc_1.isObject)(error) && error.constructor.name === 'Error'));
}
/**
 * Type guard for determining whether the given value is an error object with a
 * `code` property such as the type of error that Node throws for filesystem
 * operations, etc.
 *
 * @param error - The object to check.
 * @returns A boolean.
 */
function isErrorWithCode(error) {
    return typeof error === 'object' && error !== null && 'code' in error;
}
exports.isErrorWithCode = isErrorWithCode;
/**
 * Type guard for determining whether the given value is an error object with a
 * `message` property, such as an instance of Error.
 *
 * @param error - The object to check.
 * @returns A boolean.
 */
function isErrorWithMessage(error) {
    return typeof error === 'object' && error !== null && 'message' in error;
}
exports.isErrorWithMessage = isErrorWithMessage;
/**
 * Type guard for determining whether the given value is an error object with a
 * `stack` property, such as an instance of Error.
 *
 * @param error - The object to check.
 * @returns A boolean.
 */
function isErrorWithStack(error) {
    return typeof error === 'object' && error !== null && 'stack' in error;
}
exports.isErrorWithStack = isErrorWithStack;
/**
 * Attempts to obtain the message from a possible error object, defaulting to an
 * empty string if it is impossible to do so.
 *
 * @param error - The possible error to get the message from.
 * @returns The message if `error` is an object with a `message` property;
 * the string version of `error` if it is not `undefined` or `null`; otherwise
 * an empty string.
 */
function getErrorMessage(error) {
    if (isErrorWithMessage(error) && typeof error.message === 'string') {
        return error.message;
    }
    if ((0, misc_1.isNullOrUndefined)(error)) {
        return '';
    }
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
/**
 * Builds a new error object, linking it to the original error via the `cause`
 * property if it is an Error.
 *
 * This function is useful to reframe error messages in general, but is
 * _critical_ when interacting with any of Node's filesystem functions as
 * provided via `fs.promises`, because these do not produce stack traces in the
 * case of an I/O error (see <https://github.com/nodejs/node/issues/30944>).
 *
 * @param originalError - The error to be wrapped (something throwable).
 * @param message - The desired message of the new error.
 * @returns A new error object.
 */
function wrapError(originalError, message) {
    if (isError(originalError)) {
        let error;
        if (Error.length === 2) {
            // for some reason `tsserver` is not complaining that the
            // Error constructor doesn't support a second argument in the editor,
            // but `tsc` does. Error causes are not supported by our current tsc target (ES2020, we need ES2022 to make this work)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error = new Error(message, { cause: originalError });
        }
        else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            error = new pony_cause_1.ErrorWithCause(message, { cause: originalError });
        }
        if (isErrorWithCode(originalError)) {
            error.code = originalError.code;
        }
        return error;
    }
    if (message.length > 0) {
        return new Error(`${String(originalError)}: ${message}`);
    }
    return new Error(String(originalError));
}
exports.wrapError = wrapError;
//# sourceMappingURL=errors.cjs.map