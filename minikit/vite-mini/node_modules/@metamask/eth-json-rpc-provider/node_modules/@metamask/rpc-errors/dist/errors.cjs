"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerErrors = exports.rpcErrors = void 0;
const classes_1 = require("./classes.cjs");
const error_constants_1 = require("./error-constants.cjs");
const utils_1 = require("./utils.cjs");
exports.rpcErrors = {
    /**
     * Get a JSON RPC 2.0 Parse (-32700) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    parse: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg),
    /**
     * Get a JSON RPC 2.0 Invalid Request (-32600) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    invalidRequest: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg),
    /**
     * Get a JSON RPC 2.0 Invalid Params (-32602) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    invalidParams: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg),
    /**
     * Get a JSON RPC 2.0 Method Not Found (-32601) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    methodNotFound: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg),
    /**
     * Get a JSON RPC 2.0 Internal (-32603) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    internal: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg),
    /**
     * Get a JSON RPC 2.0 Server error.
     * Permits integer error codes in the [ -32099 <= -32005 ] range.
     * Codes -32000 through -32004 are reserved by EIP-1474.
     *
     * @param opts - The error options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    server: (opts) => {
        if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
            throw new Error('Ethereum RPC Server errors must provide single object argument.');
        }
        const { code } = opts;
        if (!Number.isInteger(code) || code > -32005 || code < -32099) {
            throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
        }
        return getJsonRpcError(code, opts);
    },
    /**
     * Get an Ethereum JSON RPC Invalid Input (-32000) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    invalidInput: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg),
    /**
     * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    resourceNotFound: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg),
    /**
     * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    resourceUnavailable: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg),
    /**
     * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    transactionRejected: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg),
    /**
     * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    methodNotSupported: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg),
    /**
     * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link JsonRpcError} class.
     */
    limitExceeded: (arg) => getJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg),
};
exports.providerErrors = {
    /**
     * Get an Ethereum Provider User Rejected Request (4001) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link EthereumProviderError} class.
     */
    userRejectedRequest: (arg) => {
        return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);
    },
    /**
     * Get an Ethereum Provider Unauthorized (4100) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link EthereumProviderError} class.
     */
    unauthorized: (arg) => {
        return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);
    },
    /**
     * Get an Ethereum Provider Unsupported Method (4200) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link EthereumProviderError} class.
     */
    unsupportedMethod: (arg) => {
        return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);
    },
    /**
     * Get an Ethereum Provider Not Connected (4900) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link EthereumProviderError} class.
     */
    disconnected: (arg) => {
        return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);
    },
    /**
     * Get an Ethereum Provider Chain Not Connected (4901) error.
     *
     * @param arg - The error message or options bag.
     * @returns An instance of the {@link EthereumProviderError} class.
     */
    chainDisconnected: (arg) => {
        return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);
    },
    /**
     * Get a custom Ethereum Provider error.
     *
     * @param opts - The error options bag.
     * @returns An instance of the {@link EthereumProviderError} class.
     */
    custom: (opts) => {
        if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
            throw new Error('Ethereum Provider custom errors must provide single object argument.');
        }
        const { code, message, data } = opts;
        if (!message || typeof message !== 'string') {
            throw new Error('"message" must be a nonempty string');
        }
        return new classes_1.EthereumProviderError(code, message, data);
    },
};
/**
 * Get a generic JSON-RPC error class instance.
 *
 * @param code - The error code.
 * @param arg - The error message or options bag.
 * @returns An instance of the {@link JsonRpcError} class.
 */
function getJsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new classes_1.JsonRpcError(code, message ?? (0, utils_1.getMessageFromCode)(code), data);
}
/**
 * Get an Ethereum Provider error class instance.
 *
 * @param code - The error code.
 * @param arg - The error message or options bag.
 * @returns An instance of the {@link EthereumProviderError} class.
 */
function getEthProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new classes_1.EthereumProviderError(code, message ?? (0, utils_1.getMessageFromCode)(code), data);
}
/**
 * Get an error message and optional data from an options bag.
 *
 * @param arg - The error message or options bag.
 * @returns A tuple containing the error message and optional data.
 */
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === 'string') {
            return [arg];
        }
        else if (typeof arg === 'object' && !Array.isArray(arg)) {
            const { message, data } = arg;
            if (message && typeof message !== 'string') {
                throw new Error('Must specify string message.');
            }
            return [message ?? undefined, data];
        }
    }
    return [];
}
//# sourceMappingURL=errors.cjs.map