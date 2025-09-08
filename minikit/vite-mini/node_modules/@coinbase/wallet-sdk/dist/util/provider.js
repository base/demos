import { NAME, VERSION } from '../sdk-info.js';
import { standardErrors } from '../core/error/errors.js';
export async function fetchRPCRequest(request, rpcUrl) {
    const requestBody = Object.assign(Object.assign({}, request), { jsonrpc: '2.0', id: crypto.randomUUID() });
    const res = await window.fetch(rpcUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'X-Cbw-Sdk-Version': VERSION,
            'X-Cbw-Sdk-Platform': NAME,
        },
    });
    const { result, error } = await res.json();
    if (error)
        throw error;
    return result;
}
function getCoinbaseInjectedLegacyProvider() {
    const window = globalThis;
    return window.coinbaseWalletExtension;
}
function getInjectedEthereum() {
    var _a, _b;
    try {
        const window = globalThis;
        return (_a = window.ethereum) !== null && _a !== void 0 ? _a : (_b = window.top) === null || _b === void 0 ? void 0 : _b.ethereum;
    }
    catch (_c) {
        return undefined;
    }
}
export function getCoinbaseInjectedProvider({ metadata, preference, }) {
    var _a, _b;
    const { appName, appLogoUrl, appChainIds } = metadata;
    if (preference.options !== 'smartWalletOnly') {
        const extension = getCoinbaseInjectedLegacyProvider();
        if (extension) {
            (_a = extension.setAppInfo) === null || _a === void 0 ? void 0 : _a.call(extension, appName, appLogoUrl, appChainIds, preference);
            return extension;
        }
    }
    const ethereum = getInjectedEthereum();
    if (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isCoinbaseBrowser) {
        (_b = ethereum.setAppInfo) === null || _b === void 0 ? void 0 : _b.call(ethereum, appName, appLogoUrl, appChainIds, preference);
        return ethereum;
    }
    return undefined;
}
/**
 * Validates the arguments for an invalid request and returns an error if any validation fails.
 * Valid request args are defined here: https://eips.ethereum.org/EIPS/eip-1193#request
 * @param args The request arguments to validate.
 * @returns An error object if the arguments are invalid, otherwise undefined.
 */
export function checkErrorForInvalidRequestArgs(args) {
    if (!args || typeof args !== 'object' || Array.isArray(args)) {
        throw standardErrors.rpc.invalidParams({
            message: 'Expected a single, non-array, object argument.',
            data: args,
        });
    }
    const { method, params } = args;
    if (typeof method !== 'string' || method.length === 0) {
        throw standardErrors.rpc.invalidParams({
            message: "'args.method' must be a non-empty string.",
            data: args,
        });
    }
    if (params !== undefined &&
        !Array.isArray(params) &&
        (typeof params !== 'object' || params === null)) {
        throw standardErrors.rpc.invalidParams({
            message: "'args.params' must be an object or array if provided.",
            data: args,
        });
    }
    switch (method) {
        case 'eth_sign':
        case 'eth_signTypedData_v2':
        case 'eth_subscribe':
        case 'eth_unsubscribe':
            throw standardErrors.provider.unsupportedMethod();
    }
}
//# sourceMappingURL=provider.js.map