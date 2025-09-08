"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumProviderError = exports.JsonRpcError = void 0;
const utils_1 = require("@metamask/utils");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const utils_2 = require("./utils.cjs");
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors
 * per EIP-1474.
 *
 * Permits any integer error code.
 */
class JsonRpcError extends Error {
    constructor(code, message, data) {
        if (!Number.isInteger(code)) {
            throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== 'string') {
            throw new Error('"message" must be a non-empty string.');
        }
        if ((0, utils_2.dataHasCause)(data)) {
            // @ts-expect-error - Error class does accept options argument depending on runtime, but types are mapping to oldest supported
            super(message, { cause: data.cause });
            // Browser backwards-compatibility fallback
            if (!(0, utils_1.hasProperty)(this, 'cause')) {
                Object.assign(this, { cause: data.cause });
            }
        }
        else {
            super(message);
        }
        if (data !== undefined) {
            this.data = data;
        }
        this.code = code;
    }
    /**
     * Get the error as JSON-serializable object.
     *
     * @returns A plain object with all public class properties.
     */
    serialize() {
        const serialized = {
            code: this.code,
            message: this.message,
        };
        if (this.data !== undefined) {
            // `this.data` is not guaranteed to be a plain object, but this simplifies
            // the type guard below. We can safely cast it because we know it's a
            // JSON-serializable value.
            serialized.data = this.data;
            if ((0, utils_1.isPlainObject)(this.data)) {
                serialized.data.cause = (0, utils_2.serializeCause)(this.data.cause);
            }
        }
        if (this.stack) {
            serialized.stack = this.stack;
        }
        return serialized;
    }
    /**
     * Get a string representation of the serialized error, omitting any circular
     * references.
     *
     * @returns A string representation of the serialized error.
     */
    toString() {
        return (0, fast_safe_stringify_1.default)(this.serialize(), stringifyReplacer, 2);
    }
}
exports.JsonRpcError = JsonRpcError;
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */
class EthereumProviderError extends JsonRpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     *
     * @param code - The JSON-RPC error code. Must be an integer in the
     * `1000 <= n <= 4999` range.
     * @param message - The JSON-RPC error message.
     * @param data - Optional data to include in the error.
     */
    constructor(code, message, data) {
        if (!isValidEthProviderCode(code)) {
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
    }
}
exports.EthereumProviderError = EthereumProviderError;
/**
 * Check if the given code is a valid JSON-RPC error code.
 *
 * @param code - The code to check.
 * @returns Whether the code is valid.
 */
function isValidEthProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
/**
 * A JSON replacer function that omits circular references.
 *
 * @param _ - The key being replaced.
 * @param value - The value being replaced.
 * @returns The value to use in place of the original value.
 */
function stringifyReplacer(_, value) {
    if (value === '[Circular]') {
        return undefined;
    }
    return value;
}
//# sourceMappingURL=classes.cjs.map