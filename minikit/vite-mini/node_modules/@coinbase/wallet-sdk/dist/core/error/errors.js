import { standardErrorCodes } from './constants.js';
import { getMessageFromCode } from './utils.js';
export const standardErrors = {
    rpc: {
        parse: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.parse, arg),
        invalidRequest: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.invalidRequest, arg),
        invalidParams: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.invalidParams, arg),
        methodNotFound: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.methodNotFound, arg),
        internal: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.internal, arg),
        server: (opts) => {
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Ethereum RPC Server errors must provide single object argument.');
            }
            const { code } = opts;
            if (!Number.isInteger(code) || code > -32005 || code < -32099) {
                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            }
            return getEthJsonRpcError(code, opts);
        },
        invalidInput: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.invalidInput, arg),
        resourceNotFound: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.resourceNotFound, arg),
        resourceUnavailable: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.resourceUnavailable, arg),
        transactionRejected: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.transactionRejected, arg),
        methodNotSupported: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.methodNotSupported, arg),
        limitExceeded: (arg) => getEthJsonRpcError(standardErrorCodes.rpc.limitExceeded, arg),
    },
    provider: {
        userRejectedRequest: (arg) => {
            return getEthProviderError(standardErrorCodes.provider.userRejectedRequest, arg);
        },
        unauthorized: (arg) => {
            return getEthProviderError(standardErrorCodes.provider.unauthorized, arg);
        },
        unsupportedMethod: (arg) => {
            return getEthProviderError(standardErrorCodes.provider.unsupportedMethod, arg);
        },
        disconnected: (arg) => {
            return getEthProviderError(standardErrorCodes.provider.disconnected, arg);
        },
        chainDisconnected: (arg) => {
            return getEthProviderError(standardErrorCodes.provider.chainDisconnected, arg);
        },
        unsupportedChain: (arg) => {
            return getEthProviderError(standardErrorCodes.provider.unsupportedChain, arg);
        },
        custom: (opts) => {
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Ethereum Provider custom errors must provide single object argument.');
            }
            const { code, message, data } = opts;
            if (!message || typeof message !== 'string') {
                throw new Error('"message" must be a nonempty string');
            }
            return new EthereumProviderError(code, message, data);
        },
    },
};
// Internal
function getEthJsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new EthereumRpcError(code, message || getMessageFromCode(code), data);
}
function getEthProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new EthereumProviderError(code, message || getMessageFromCode(code), data);
}
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === 'string') {
            return [arg];
        }
        if (typeof arg === 'object' && !Array.isArray(arg)) {
            const { message, data } = arg;
            if (message && typeof message !== 'string') {
                throw new Error('Must specify string message.');
            }
            return [message || undefined, data];
        }
    }
    return [];
}
class EthereumRpcError extends Error {
    constructor(code, message, data) {
        if (!Number.isInteger(code)) {
            throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== 'string') {
            throw new Error('"message" must be a nonempty string.');
        }
        super(message);
        this.code = code;
        if (data !== undefined) {
            this.data = data;
        }
    }
}
class EthereumProviderError extends EthereumRpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(code, message, data) {
        if (!isValidEthProviderCode(code)) {
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
    }
}
class ActionableInsufficientBalanceError extends EthereumRpcError {
}
function isValidEthProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
export function isActionableHttpRequestError(errorObject) {
    return (typeof errorObject === 'object' &&
        errorObject !== null &&
        'code' in errorObject &&
        'data' in errorObject &&
        errorObject.code === -32090 &&
        typeof errorObject.data === 'object' &&
        errorObject.data !== null &&
        'type' in errorObject.data &&
        errorObject.data.type === 'INSUFFICIENT_FUNDS');
}
export function isViemError(error) {
    // Check if object and has code, message, and details
    return typeof error === 'object' && error !== null && 'details' in error;
}
export function viemHttpErrorToProviderError(error) {
    try {
        const details = JSON.parse(error.details);
        return new EthereumRpcError(details.code, details.message, details.data);
    }
    catch (_) {
        return null;
    }
}
//# sourceMappingURL=errors.js.map