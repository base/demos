var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Communicator } from '../../../core/communicator/Communicator.js';
import { CB_WALLET_RPC_URL } from '../../../core/constants.js';
import { standardErrorCodes } from '../../../core/error/constants.js';
import { standardErrors } from '../../../core/error/errors.js';
import { serializeError } from '../../../core/error/serialize.js';
import { ProviderEventEmitter, } from '../../../core/provider/interface.js';
import { logRequestError, logRequestResponded, logRequestStarted, } from '../../../core/telemetry/events/provider.js';
import { hexStringFromNumber } from '../../../core/type/util.js';
import { Signer } from '../../../sign/base-account/Signer.js';
import { initSubAccountConfig } from '../../../sign/base-account/utils.js';
import { correlationIds } from '../../../store/correlation-ids/store.js';
import { store } from '../../../store/store.js';
import { checkErrorForInvalidRequestArgs, fetchRPCRequest } from '../../../util/provider.js';
export class BaseAccountProvider extends ProviderEventEmitter {
    constructor(_a) {
        var { metadata } = _a, _b = _a.preference, { walletUrl } = _b, preference = __rest(_b, ["walletUrl"]);
        super();
        this.isBaseAccount = true;
        this.communicator = new Communicator({
            url: walletUrl,
            metadata,
            preference,
        });
        this.signer = new Signer({
            metadata,
            communicator: this.communicator,
            callback: this.emit.bind(this),
        });
    }
    async request(args) {
        // correlation id across the entire request lifecycle
        const correlationId = crypto.randomUUID();
        correlationIds.set(args, correlationId);
        logRequestStarted({ method: args.method, correlationId });
        try {
            const result = await this._request(args);
            logRequestResponded({
                method: args.method,
                correlationId,
            });
            return result;
        }
        catch (error) {
            logRequestError({
                method: args.method,
                correlationId,
                errorMessage: error instanceof Error ? error.message : '',
            });
            throw error;
        }
        finally {
            correlationIds.delete(args);
        }
    }
    async _request(args) {
        var _a, _b;
        try {
            checkErrorForInvalidRequestArgs(args);
            if (!this.signer.isConnected) {
                switch (args.method) {
                    case 'eth_requestAccounts': {
                        await this.signer.handshake({ method: 'handshake' });
                        // We are translating eth_requestAccounts to wallet_connect always
                        await initSubAccountConfig();
                        await this.signer.request({
                            method: 'wallet_connect',
                            params: [
                                {
                                    version: '1',
                                    capabilities: Object.assign({}, ((_b = (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.capabilities) !== null && _b !== void 0 ? _b : {})),
                                },
                            ],
                        });
                        // wallet_connect will retrieve and save the account info in the store
                        // continue to requesting it again at L130 for emitting the connect event +
                        // returning the accounts
                        break;
                    }
                    case 'wallet_connect': {
                        await this.signer.handshake({ method: 'handshake' }); // exchange session keys
                        const result = await this.signer.request(args); // send diffie-hellman encrypted request
                        return result;
                    }
                    case 'wallet_sendCalls':
                    case 'wallet_sign': {
                        try {
                            await this.signer.handshake({ method: 'handshake' }); // exchange session keys
                            const result = await this.signer.request(args); // send diffie-hellman encrypted request
                            return result;
                        }
                        finally {
                            await this.signer.cleanup(); // clean up (rotate) the ephemeral session keys
                        }
                    }
                    case 'wallet_getCallsStatus': {
                        const result = await fetchRPCRequest(args, CB_WALLET_RPC_URL);
                        return result;
                    }
                    case 'eth_accounts': {
                        return [];
                    }
                    case 'net_version': {
                        const result = 1; // default value
                        return result;
                    }
                    case 'eth_chainId': {
                        const result = hexStringFromNumber(1); // default value
                        return result;
                    }
                    default: {
                        throw standardErrors.provider.unauthorized("Must call 'eth_requestAccounts' before other methods");
                    }
                }
            }
            const result = await this.signer.request(args);
            return result;
        }
        catch (error) {
            const { code } = error;
            if (code === standardErrorCodes.provider.unauthorized) {
                await this.disconnect();
            }
            return Promise.reject(serializeError(error));
        }
    }
    async disconnect() {
        await this.signer.cleanup();
        correlationIds.clear();
        this.emit('disconnect', standardErrors.provider.disconnected('User initiated disconnection'));
    }
}
//# sourceMappingURL=BaseAccountProvider.js.map