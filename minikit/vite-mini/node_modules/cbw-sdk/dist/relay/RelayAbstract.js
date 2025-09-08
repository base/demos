"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayAbstract = exports.APP_VERSION_KEY = exports.LOCAL_STORAGE_ADDRESSES_KEY = exports.WALLET_USER_NAME_KEY = void 0;
const error_1 = require("../core/error");
exports.WALLET_USER_NAME_KEY = 'walletUsername';
exports.LOCAL_STORAGE_ADDRESSES_KEY = 'Addresses';
exports.APP_VERSION_KEY = 'AppVersion';
class RelayAbstract {
    async makeEthereumJSONRPCRequest(request, jsonRpcUrl) {
        if (!jsonRpcUrl)
            throw new Error('Error: No jsonRpcUrl provided');
        return window
            .fetch(jsonRpcUrl, {
            method: 'POST',
            body: JSON.stringify(request),
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((json) => {
            if (!json) {
                throw error_1.standardErrors.rpc.parse({});
            }
            const response = json;
            const { error } = response;
            if (error) {
                throw (0, error_1.serializeError)(error, request.method);
            }
            return response;
        });
    }
}
exports.RelayAbstract = RelayAbstract;
