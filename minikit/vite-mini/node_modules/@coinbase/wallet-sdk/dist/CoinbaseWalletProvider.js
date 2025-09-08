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
import { Communicator } from './core/communicator/Communicator.js';
import { CB_WALLET_RPC_URL } from './core/constants.js';
import { standardErrorCodes } from './core/error/constants.js';
import { standardErrors } from './core/error/errors.js';
import { serializeError } from './core/error/serialize.js';
import { ProviderEventEmitter, } from './core/provider/interface.js';
import { ScopedLocalStorage } from './core/storage/ScopedLocalStorage.js';
import { logEnableFunctionCalled, logRequestError, logRequestResponded, logRequestStarted, logSignerLoadedFromStorage, } from './core/telemetry/events/provider.js';
import { logSignerSelectionRequested, logSignerSelectionResponded, } from './core/telemetry/events/signer-selection.js';
import { hexStringFromNumber } from './core/type/util.js';
import { correlationIds } from './store/correlation-ids/store.js';
import { store } from './store/store.js';
import { checkErrorForInvalidRequestArgs, fetchRPCRequest } from './util/provider.js';
import { createSigner, fetchSignerType, loadSignerType, signerToSignerType, storeSignerType, } from './sign/util.js';
export class CoinbaseWalletProvider extends ProviderEventEmitter {
    constructor(_a) {
        var { metadata } = _a, _b = _a.preference, { keysUrl } = _b, preference = __rest(_b, ["keysUrl"]);
        super();
        this.signer = null;
        this.isCoinbaseWallet = true;
        this.metadata = metadata;
        this.preference = preference;
        this.communicator = new Communicator({
            url: keysUrl,
            metadata,
            preference,
        });
        const signerType = loadSignerType();
        if (signerType) {
            this.signer = this.initSigner(signerType);
            logSignerLoadedFromStorage({ signerType });
        }
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
                signerType: signerToSignerType(this.signer),
                correlationId,
            });
            return result;
        }
        catch (error) {
            logRequestError({
                method: args.method,
                correlationId,
                signerType: signerToSignerType(this.signer),
                errorMessage: error instanceof Error ? error.message : '',
            });
            throw error;
        }
        finally {
            correlationIds.delete(args);
        }
    }
    async _request(args) {
        try {
            checkErrorForInvalidRequestArgs(args);
            if (!this.signer) {
                switch (args.method) {
                    case 'eth_requestAccounts': {
                        let signerType;
                        const subAccountsConfig = store.subAccountsConfig.get();
                        if (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.enableAutoSubAccounts) {
                            signerType = 'scw';
                        }
                        else {
                            signerType = await this.requestSignerSelection(args);
                        }
                        const signer = this.initSigner(signerType);
                        if (signerType === 'scw' && (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.enableAutoSubAccounts)) {
                            await signer.handshake({ method: 'handshake' });
                            // eth_requestAccounts gets translated to wallet_connect at SCWSigner level
                            await signer.request(args);
                        }
                        else {
                            await signer.handshake(args);
                        }
                        this.signer = signer;
                        storeSignerType(signerType);
                        break;
                    }
                    case 'wallet_connect': {
                        const signer = this.initSigner('scw');
                        await signer.handshake({ method: 'handshake' }); // exchange session keys
                        const result = await signer.request(args); // send diffie-hellman encrypted request
                        this.signer = signer;
                        return result;
                    }
                    case 'wallet_sendCalls':
                    case 'wallet_sign': {
                        const ephemeralSigner = this.initSigner('scw');
                        await ephemeralSigner.handshake({ method: 'handshake' }); // exchange session keys
                        const result = await ephemeralSigner.request(args); // send diffie-hellman encrypted request
                        await ephemeralSigner.cleanup(); // clean up (rotate) the ephemeral session keys
                        return result;
                    }
                    case 'wallet_getCallsStatus': {
                        const result = await fetchRPCRequest(args, CB_WALLET_RPC_URL);
                        return result;
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
            if (code === standardErrorCodes.provider.unauthorized)
                this.disconnect();
            return Promise.reject(serializeError(error));
        }
    }
    /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */
    async enable() {
        console.warn(`.enable() has been deprecated. Please use .request({ method: "eth_requestAccounts" }) instead.`);
        logEnableFunctionCalled();
        return await this.request({
            method: 'eth_requestAccounts',
        });
    }
    async disconnect() {
        var _a;
        await ((_a = this.signer) === null || _a === void 0 ? void 0 : _a.cleanup());
        this.signer = null;
        ScopedLocalStorage.clearAll();
        correlationIds.clear();
        this.emit('disconnect', standardErrors.provider.disconnected('User initiated disconnection'));
    }
    async requestSignerSelection(handshakeRequest) {
        logSignerSelectionRequested();
        const signerType = await fetchSignerType({
            communicator: this.communicator,
            preference: this.preference,
            metadata: this.metadata,
            handshakeRequest,
            callback: this.emit.bind(this),
        });
        logSignerSelectionResponded(signerType);
        return signerType;
    }
    initSigner(signerType) {
        return createSigner({
            signerType,
            metadata: this.metadata,
            communicator: this.communicator,
            callback: this.emit.bind(this),
        });
    }
}
//# sourceMappingURL=CoinbaseWalletProvider.js.map