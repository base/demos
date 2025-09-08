"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataHasCause = exports.serializeCause = exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
const utils_1 = require("@metamask/utils");
const error_constants_1 = require("./error-constants.cjs");
const FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;
const FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';
const FALLBACK_ERROR = {
    code: FALLBACK_ERROR_CODE,
    message: getMessageFromCode(FALLBACK_ERROR_CODE),
};
exports.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 *
 * @param code - The error code.
 * @param fallbackMessage - The fallback message to use if the code has no
 * corresponding message.
 * @returns The message for the given code, or the fallback message if the code
 * has no corresponding message.
 */
function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
    if (isValidCode(code)) {
        const codeString = code.toString();
        if ((0, utils_1.hasProperty)(error_constants_1.errorValues, codeString)) {
            return error_constants_1.errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
            return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
    }
    return fallbackMessage;
}
exports.getMessageFromCode = getMessageFromCode;
/**
 * Returns whether the given code is valid.
 * A code is valid if it is an integer.
 *
 * @param code - The error code.
 * @returns Whether the given code is valid.
 */
function isValidCode(code) {
    return Number.isInteger(code);
}
exports.isValidCode = isValidCode;
/**
 * Serializes the given error to an Ethereum JSON RPC-compatible error object.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.cause property.
 *
 * @param error - The error to serialize.
 * @param options - Options bag.
 * @param options.fallbackError - The error to return if the given error is
 * not compatible. Should be a JSON-serializable value.
 * @param options.shouldIncludeStack - Whether to include the error's stack
 * on the returned object.
 * @param options.shouldPreserveMessage - Whether to preserve the error's
 * message if the fallback error is used.
 * @returns The serialized error.
 */
function serializeError(error, { fallbackError = FALLBACK_ERROR, shouldIncludeStack = true, shouldPreserveMessage = true, } = {}) {
    if (!(0, utils_1.isJsonRpcError)(fallbackError)) {
        throw new Error('Must provide fallback error with integer number code and string message.');
    }
    const serialized = buildError(error, fallbackError, shouldPreserveMessage);
    if (!shouldIncludeStack) {
        delete serialized.stack;
    }
    return serialized;
}
exports.serializeError = serializeError;
/**
 * Construct a JSON-serializable object given an error and a JSON-serializable `fallbackError`
 *
 * @param error - The error in question.
 * @param fallbackError - A JSON-serializable fallback error.
 * @param shouldPreserveMessage - Whether to preserve the error's message if the fallback
 * error is used.
 * @returns A JSON-serializable error object.
 */
function buildError(error, fallbackError, shouldPreserveMessage) {
    // If an error specifies a `serialize` function, we call it and return the result.
    if (error &&
        typeof error === 'object' &&
        'serialize' in error &&
        typeof error.serialize === 'function') {
        return error.serialize();
    }
    if ((0, utils_1.isJsonRpcError)(error)) {
        return error;
    }
    const originalMessage = getOriginalMessage(error);
    // If the error does not match the JsonRpcError type, use the fallback error, but try to include the original error as `cause`.
    const cause = serializeCause(error);
    const fallbackWithCause = {
        ...fallbackError,
        ...(shouldPreserveMessage &&
            originalMessage && { message: originalMessage }),
        data: { cause },
    };
    return fallbackWithCause;
}
/**
 * Attempts to extract the original `message` property from an error value of uncertain shape.
 *
 * @param error - The error in question.
 * @returns The original message, if it exists and is a non-empty string.
 */
function getOriginalMessage(error) {
    if ((0, utils_1.isObject)(error) &&
        (0, utils_1.hasProperty)(error, 'message') &&
        typeof error.message === 'string' &&
        error.message.length > 0) {
        return error.message;
    }
    return undefined;
}
/**
 * Check if the given code is a valid JSON-RPC server error code.
 *
 * @param code - The error code.
 * @returns Whether the given code is a valid JSON-RPC server error code.
 */
function isJsonRpcServerError(code) {
    return code >= -32099 && code <= -32000;
}
/**
 * Serializes an unknown error to be used as the `cause` in a fallback error.
 *
 * @param error - The unknown error.
 * @returns A JSON-serializable object containing as much information about the original error as possible.
 */
function serializeCause(error) {
    if (Array.isArray(error)) {
        return error.map((entry) => {
            if ((0, utils_1.isValidJson)(entry)) {
                return entry;
            }
            else if ((0, utils_1.isObject)(entry)) {
                return serializeObject(entry);
            }
            return null;
        });
    }
    else if ((0, utils_1.isObject)(error)) {
        return serializeObject(error);
    }
    if ((0, utils_1.isValidJson)(error)) {
        return error;
    }
    return null;
}
exports.serializeCause = serializeCause;
/**
 * Extracts all JSON-serializable properties from an object.
 *
 * @param object - The object in question.
 * @returns An object containing all the JSON-serializable properties.
 */
function serializeObject(object) {
    return Object.getOwnPropertyNames(object).reduce((acc, key) => {
        const value = object[key];
        if ((0, utils_1.isValidJson)(value)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
/**
 * Returns true if supplied error data has a usable `cause` property; false otherwise.
 *
 * @param data - Optional data to validate.
 * @returns Whether cause property is present and an object.
 */
function dataHasCause(data) {
    return (0, utils_1.isObject)(data) && (0, utils_1.hasProperty)(data, 'cause') && (0, utils_1.isObject)(data.cause);
}
exports.dataHasCause = dataHasCause;
//# sourceMappingURL=utils.cjs.map