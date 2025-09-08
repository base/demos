// TODO: error should not depend on walletlink. revisit this.
import { VERSION } from '../../sdk-info.js';
import { isErrorResponse } from '../../sign/walletlink/relay/type/Web3Response.js';
import { standardErrorCodes } from './constants.js';
import { serialize } from './utils.js';
/**
 * Serializes an error to a format that is compatible with the Ethereum JSON RPC error format.
 * See https://docs.cloud.coinbase.com/wallet-sdk/docs/errors
 * for more information.
 */
export function serializeError(error) {
    const serialized = serialize(getErrorObject(error), {
        shouldIncludeStack: true,
    });
    const docUrl = new URL('https://docs.cloud.coinbase.com/wallet-sdk/docs/errors');
    docUrl.searchParams.set('version', VERSION);
    docUrl.searchParams.set('code', serialized.code.toString());
    docUrl.searchParams.set('message', serialized.message);
    return Object.assign(Object.assign({}, serialized), { docUrl: docUrl.href });
}
/**
 * Converts an error to a serializable object.
 */
function getErrorObject(error) {
    var _a;
    if (typeof error === 'string') {
        return {
            message: error,
            code: standardErrorCodes.rpc.internal,
        };
    }
    if (isErrorResponse(error)) {
        const message = error.errorMessage;
        const code = (_a = error.errorCode) !== null && _a !== void 0 ? _a : (message.match(/(denied|rejected)/i)
            ? standardErrorCodes.provider.userRejectedRequest
            : undefined);
        return Object.assign(Object.assign({}, error), { message,
            code, data: { method: error.method } });
    }
    return error;
}
//# sourceMappingURL=serialize.js.map