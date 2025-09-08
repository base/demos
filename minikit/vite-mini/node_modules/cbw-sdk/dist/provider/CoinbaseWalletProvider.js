"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Address linting issues
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinbaseWalletProvider = void 0;
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
const bn_js_1 = __importDefault(require("bn.js"));
const eventemitter3_1 = require("eventemitter3");
const error_1 = require("../core/error");
const util_1 = require("../core/util");
const MobileRelay_1 = require("../relay/mobile/MobileRelay");
const RelayAbstract_1 = require("../relay/RelayAbstract");
const Session_1 = require("../relay/Session");
const Web3Response_1 = require("../relay/walletlink/type/Web3Response");
const eth_eip712_util_1 = __importDefault(require("../vendor-js/eth-eip712-util"));
const DiagnosticLogger_1 = require("./DiagnosticLogger");
const FilterPolyfill_1 = require("./FilterPolyfill");
const SubscriptionManager_1 = require("./SubscriptionManager");
const DEFAULT_CHAIN_ID_KEY = 'DefaultChainId';
const DEFAULT_JSON_RPC_URL = 'DefaultJsonRpcUrl';
class CoinbaseWalletProvider extends eventemitter3_1.EventEmitter {
    constructor(options) {
        var _a, _b;
        super();
        this._filterPolyfill = new FilterPolyfill_1.FilterPolyfill(this);
        this._subscriptionManager = new SubscriptionManager_1.SubscriptionManager(this);
        this._relay = null;
        this._addresses = [];
        this.hasMadeFirstChainChangedEmission = false;
        this.setProviderInfo = this.setProviderInfo.bind(this);
        this.updateProviderInfo = this.updateProviderInfo.bind(this);
        this.getChainId = this.getChainId.bind(this);
        this.setAppInfo = this.setAppInfo.bind(this);
        this.enable = this.enable.bind(this);
        this.close = this.close.bind(this);
        this.send = this.send.bind(this);
        this.sendAsync = this.sendAsync.bind(this);
        this.request = this.request.bind(this);
        this._setAddresses = this._setAddresses.bind(this);
        this.scanQRCode = this.scanQRCode.bind(this);
        this.genericRequest = this.genericRequest.bind(this);
        this._chainIdFromOpts = options.chainId;
        this._jsonRpcUrlFromOpts = options.jsonRpcUrl;
        this._overrideIsMetaMask = options.overrideIsMetaMask;
        this._relayProvider = options.relayProvider;
        this._storage = options.storage;
        this._relayEventManager = options.relayEventManager;
        this.diagnostic = options.diagnosticLogger;
        this.reloadOnDisconnect = true;
        this.isCoinbaseWallet = (_a = options.overrideIsCoinbaseWallet) !== null && _a !== void 0 ? _a : true;
        this.isCoinbaseBrowser = (_b = options.overrideIsCoinbaseBrowser) !== null && _b !== void 0 ? _b : false;
        this.qrUrl = options.qrUrl;
        const chainId = this.getChainId();
        const chainIdStr = (0, util_1.prepend0x)(chainId.toString(16));
        // indicate that we've connected, for EIP-1193 compliance
        this.emit('connect', { chainIdStr });
        const cachedAddresses = this._storage.getItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);
        if (cachedAddresses) {
            const addresses = cachedAddresses.split(' ');
            if (addresses[0] !== '') {
                this._addresses = addresses.map((address) => (0, util_1.ensureAddressString)(address));
                this.emit('accountsChanged', addresses);
            }
        }
        this._subscriptionManager.events.on('notification', (notification) => {
            this.emit('message', {
                type: notification.method,
                data: notification.params,
            });
        });
        if (this._isAuthorized()) {
            void this.initializeRelay();
        }
        window.addEventListener('message', (event) => {
            var _a;
            // Used to verify the source and window are correct before proceeding
            if (event.origin !== location.origin || event.source !== window) {
                return;
            }
            if (event.data.type !== 'walletLinkMessage')
                return; // compatibility with CBW extension
            if (event.data.data.action === 'dappChainSwitched') {
                const _chainId = event.data.data.chainId;
                const jsonRpcUrl = (_a = event.data.data.jsonRpcUrl) !== null && _a !== void 0 ? _a : this.jsonRpcUrl;
                this.updateProviderInfo(jsonRpcUrl, Number(_chainId));
            }
        });
    }
    /** @deprecated Use `.request({ method: 'eth_accounts' })` instead. */
    get selectedAddress() {
        return this._addresses[0] || undefined;
    }
    /** @deprecated Use the chain ID. If you still need the network ID, use `.request({ method: 'net_version' })`. */
    get networkVersion() {
        return this.getChainId().toString(10);
    }
    /** @deprecated Use `.request({ method: 'eth_chainId' })` instead. */
    get chainId() {
        return (0, util_1.prepend0x)(this.getChainId().toString(16));
    }
    get isWalletLink() {
        // backward compatibility
        return true;
    }
    /**
     * Some DApps (i.e. Alpha Homora) seem to require the window.ethereum object return
     * true for this method.
     */
    get isMetaMask() {
        return this._overrideIsMetaMask;
    }
    get host() {
        return this.jsonRpcUrl;
    }
    get connected() {
        return true;
    }
    isConnected() {
        return true;
    }
    get jsonRpcUrl() {
        var _a;
        return (_a = this._storage.getItem(DEFAULT_JSON_RPC_URL)) !== null && _a !== void 0 ? _a : this._jsonRpcUrlFromOpts;
    }
    set jsonRpcUrl(value) {
        this._storage.setItem(DEFAULT_JSON_RPC_URL, value);
    }
    disableReloadOnDisconnect() {
        this.reloadOnDisconnect = false;
    }
    setProviderInfo(jsonRpcUrl, chainId) {
        if (!this.isCoinbaseBrowser) {
            this._chainIdFromOpts = chainId;
            this._jsonRpcUrlFromOpts = jsonRpcUrl;
        }
        this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
    }
    updateProviderInfo(jsonRpcUrl, chainId) {
        this.jsonRpcUrl = jsonRpcUrl;
        // emit chainChanged event if necessary
        const originalChainId = this.getChainId();
        this._storage.setItem(DEFAULT_CHAIN_ID_KEY, chainId.toString(10));
        const chainChanged = (0, util_1.ensureIntNumber)(chainId) !== originalChainId;
        if (chainChanged || !this.hasMadeFirstChainChangedEmission) {
            this.emit('chainChanged', this.getChainId());
            this.hasMadeFirstChainChangedEmission = true;
        }
    }
    async watchAsset(type, address, symbol, decimals, image, chainId) {
        const relay = await this.initializeRelay();
        const result = await relay.watchAsset(type, address, symbol, decimals, image, chainId === null || chainId === void 0 ? void 0 : chainId.toString()).promise;
        if ((0, Web3Response_1.isErrorResponse)(result))
            return false;
        return !!result.result;
    }
    async addEthereumChain(chainId, rpcUrls, blockExplorerUrls, chainName, iconUrls, nativeCurrency) {
        var _a, _b;
        if ((0, util_1.ensureIntNumber)(chainId) === this.getChainId()) {
            return false;
        }
        const relay = await this.initializeRelay();
        const isWhitelistedNetworkOrStandalone = relay.inlineAddEthereumChain(chainId.toString());
        if (!this._isAuthorized() && !isWhitelistedNetworkOrStandalone) {
            await relay.requestEthereumAccounts().promise;
        }
        const res = await relay.addEthereumChain(chainId.toString(), rpcUrls, iconUrls, blockExplorerUrls, chainName, nativeCurrency).promise;
        if ((0, Web3Response_1.isErrorResponse)(res))
            return false;
        if (((_a = res.result) === null || _a === void 0 ? void 0 : _a.isApproved) === true) {
            this.updateProviderInfo(rpcUrls[0], chainId);
        }
        return ((_b = res.result) === null || _b === void 0 ? void 0 : _b.isApproved) === true;
    }
    async switchEthereumChain(chainId) {
        const relay = await this.initializeRelay();
        const res = await relay.switchEthereumChain(chainId.toString(10), this.selectedAddress || undefined).promise;
        // backward compatibility
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            if (!res.errorCode)
                return;
            if (res.errorCode === error_1.standardErrorCodes.provider.unsupportedChain) {
                throw error_1.standardErrors.provider.unsupportedChain();
            }
            else {
                throw error_1.standardErrors.provider.custom({
                    message: res.errorMessage,
                    code: res.errorCode,
                });
            }
        }
        const switchResponse = res.result;
        if (switchResponse.isApproved && switchResponse.rpcUrl.length > 0) {
            this.updateProviderInfo(switchResponse.rpcUrl, chainId);
        }
    }
    setAppInfo(appName, appLogoUrl) {
        void this.initializeRelay().then((relay) => relay.setAppInfo(appName, appLogoUrl));
    }
    /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */
    async enable() {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
            method: 'provider::enable',
            addresses_length: this._addresses.length,
            sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined,
        });
        if (this._isAuthorized()) {
            return [...this._addresses];
        }
        return await this.send('eth_requestAccounts');
    }
    async close() {
        const relay = await this.initializeRelay();
        relay.resetAndReload();
    }
    send(requestOrMethod, callbackOrParams) {
        // send<T>(method, params): Promise<T>
        try {
            const result = this._send(requestOrMethod, callbackOrParams);
            if (result instanceof Promise) {
                return result.catch((error) => {
                    throw (0, error_1.serializeError)(error, requestOrMethod);
                });
            }
        }
        catch (error) {
            throw (0, error_1.serializeError)(error, requestOrMethod);
        }
    }
    _send(requestOrMethod, callbackOrParams) {
        if (typeof requestOrMethod === 'string') {
            const method = requestOrMethod;
            const params = Array.isArray(callbackOrParams)
                ? callbackOrParams
                : callbackOrParams !== undefined
                    ? [callbackOrParams]
                    : [];
            const request = {
                jsonrpc: '2.0',
                id: 0,
                method,
                params,
            };
            return this._sendRequestAsync(request).then((res) => res.result);
        }
        // send(JSONRPCRequest | JSONRPCRequest[], callback): void
        if (typeof callbackOrParams === 'function') {
            const request = requestOrMethod;
            const callback = callbackOrParams;
            return this._sendAsync(request, callback);
        }
        // send(JSONRPCRequest[]): JSONRPCResponse[]
        if (Array.isArray(requestOrMethod)) {
            const requests = requestOrMethod;
            return requests.map((r) => this._sendRequest(r));
        }
        // send(JSONRPCRequest): JSONRPCResponse
        const req = requestOrMethod;
        return this._sendRequest(req);
    }
    async sendAsync(request, callback) {
        try {
            return this._sendAsync(request, callback).catch((error) => {
                throw (0, error_1.serializeError)(error, request);
            });
        }
        catch (error) {
            return Promise.reject((0, error_1.serializeError)(error, request));
        }
    }
    async _sendAsync(request, callback) {
        if (typeof callback !== 'function') {
            throw new Error('callback is required');
        }
        // send(JSONRPCRequest[], callback): void
        if (Array.isArray(request)) {
            const arrayCb = callback;
            this._sendMultipleRequestsAsync(request)
                .then((responses) => arrayCb(null, responses))
                .catch((err) => arrayCb(err, null));
            return;
        }
        // send(JSONRPCRequest, callback): void
        const cb = callback;
        return this._sendRequestAsync(request)
            .then((response) => cb(null, response))
            .catch((err) => cb(err, null));
    }
    async request(args) {
        try {
            return this._request(args).catch((error) => {
                throw (0, error_1.serializeError)(error, args.method);
            });
        }
        catch (error) {
            return Promise.reject((0, error_1.serializeError)(error, args.method));
        }
    }
    async _request(args) {
        if (!args || typeof args !== 'object' || Array.isArray(args)) {
            throw error_1.standardErrors.rpc.invalidRequest({
                message: 'Expected a single, non-array, object argument.',
                data: args,
            });
        }
        const { method, params } = args;
        if (typeof method !== 'string' || method.length === 0) {
            throw error_1.standardErrors.rpc.invalidRequest({
                message: "'args.method' must be a non-empty string.",
                data: args,
            });
        }
        if (params !== undefined &&
            !Array.isArray(params) &&
            (typeof params !== 'object' || params === null)) {
            throw error_1.standardErrors.rpc.invalidRequest({
                message: "'args.params' must be an object or array if provided.",
                data: args,
            });
        }
        const newParams = params === undefined ? [] : params;
        // Coinbase Wallet Requests
        const id = this._relayEventManager.makeRequestId();
        const result = await this._sendRequestAsync({
            method,
            params: newParams,
            jsonrpc: '2.0',
            id,
        });
        return result.result;
    }
    async scanQRCode(match) {
        const relay = await this.initializeRelay();
        const res = await relay.scanQRCode((0, util_1.ensureRegExpString)(match)).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw (0, error_1.serializeError)(res.errorMessage, 'scanQRCode');
        }
        else if (typeof res.result !== 'string') {
            throw (0, error_1.serializeError)('result was not a string', 'scanQRCode');
        }
        return res.result;
    }
    async genericRequest(data, action) {
        const relay = await this.initializeRelay();
        const res = await relay.genericRequest(data, action).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw (0, error_1.serializeError)(res.errorMessage, 'generic');
        }
        else if (typeof res.result !== 'string') {
            throw (0, error_1.serializeError)('result was not a string', 'generic');
        }
        return res.result;
    }
    /**
     * @beta
     * This method is currently in beta. While it is available for use, please note that it is still under testing and may undergo significant changes.
     *
     * @remarks
     * IMPORTANT: Signature validation is not performed by this method. Users of this method are advised to perform their own signature validation.
     * Common web3 frontend libraries such as ethers.js and viem provide the `verifyMessage` utility function that can be used for signature validation.
     *
     * It combines `eth_requestAccounts` and "Sign-In with Ethereum" (EIP-4361) into a single call.
     * The returned account and signed message can be used to authenticate the user.
     *
     * @param {Object} params - An object with the following properties:
     * - `nonce` {string}: A unique string to prevent replay attacks.
     * - `statement` {string}: An optional human-readable ASCII assertion that the user will sign.
     * - `resources` {string[]}: An optional list of information the user wishes to have resolved as part of authentication by the relying party.
     *
     * @returns {Promise<ConnectAndSignInResponse>} A promise that resolves to an object with the following properties:
     * - `accounts` {string[]}: The Ethereum accounts of the user.
     * - `message` {string}: The overall message that the user signed. Hex encoded.
     * - `signature` {string}: The signature of the message, signed with the user's private key. Hex encoded.
     */
    async connectAndSignIn(params) {
        // NOTE: It was intentionally built by following the pattern of the existing eth_requestAccounts method
        // to maintain consistency and avoid introducing a new pattern.
        // We acknowledge the need for a better design, and it is planned to address and improve it in a future refactor.
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
            method: 'provider::connectAndSignIn',
            sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined,
        });
        let res;
        try {
            const relay = await this.initializeRelay();
            if (!(relay instanceof MobileRelay_1.MobileRelay)) {
                throw new Error('connectAndSignIn is only supported on mobile');
            }
            res = await relay.connectAndSignIn(params).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
        }
        catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied account authorization');
            }
            throw err;
        }
        if (!res.result) {
            throw new Error('accounts received is empty');
        }
        const { accounts } = res.result;
        this._setAddresses(accounts);
        if (!this.isCoinbaseBrowser) {
            await this.switchEthereumChain(this.getChainId());
        }
        return res.result;
    }
    async selectProvider(providerOptions) {
        const relay = await this.initializeRelay();
        const res = await relay.selectProvider(providerOptions).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw (0, error_1.serializeError)(res.errorMessage, 'selectProvider');
        }
        else if (typeof res.result !== 'string') {
            throw (0, error_1.serializeError)('result was not a string', 'selectProvider');
        }
        return res.result;
    }
    supportsSubscriptions() {
        return false;
    }
    subscribe() {
        throw new Error('Subscriptions are not supported');
    }
    unsubscribe() {
        throw new Error('Subscriptions are not supported');
    }
    disconnect() {
        return true;
    }
    _sendRequest(request) {
        const response = {
            jsonrpc: '2.0',
            id: request.id,
        };
        const { method } = request;
        response.result = this._handleSynchronousMethods(request);
        if (response.result === undefined) {
            throw new Error(`Coinbase Wallet does not support calling ${method} synchronously without ` +
                `a callback. Please provide a callback parameter to call ${method} ` +
                `asynchronously.`);
        }
        return response;
    }
    _setAddresses(addresses, _) {
        if (!Array.isArray(addresses)) {
            throw new Error('addresses is not an array');
        }
        const newAddresses = addresses.map((address) => (0, util_1.ensureAddressString)(address));
        if (JSON.stringify(newAddresses) === JSON.stringify(this._addresses)) {
            return;
        }
        this._addresses = newAddresses;
        this.emit('accountsChanged', this._addresses);
        this._storage.setItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY, newAddresses.join(' '));
    }
    _sendRequestAsync(request) {
        return new Promise((resolve, reject) => {
            try {
                const syncResult = this._handleSynchronousMethods(request);
                if (syncResult !== undefined) {
                    return resolve({
                        jsonrpc: '2.0',
                        id: request.id,
                        result: syncResult,
                    });
                }
                const filterPromise = this._handleAsynchronousFilterMethods(request);
                if (filterPromise !== undefined) {
                    filterPromise
                        .then((res) => resolve(Object.assign(Object.assign({}, res), { id: request.id })))
                        .catch((err) => reject(err));
                    return;
                }
                const subscriptionPromise = this._handleSubscriptionMethods(request);
                if (subscriptionPromise !== undefined) {
                    subscriptionPromise
                        .then((res) => resolve({
                        jsonrpc: '2.0',
                        id: request.id,
                        result: res.result,
                    }))
                        .catch((err) => reject(err));
                    return;
                }
            }
            catch (err) {
                return reject(err);
            }
            this._handleAsynchronousMethods(request)
                .then((res) => res && resolve(Object.assign(Object.assign({}, res), { id: request.id })))
                .catch((err) => reject(err));
        });
    }
    _sendMultipleRequestsAsync(requests) {
        return Promise.all(requests.map((r) => this._sendRequestAsync(r)));
    }
    _handleSynchronousMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch (method) {
            case 'eth_accounts':
                return this._eth_accounts();
            case 'eth_coinbase':
                return this._eth_coinbase();
            case 'eth_uninstallFilter':
                return this._eth_uninstallFilter(params);
            case 'net_version':
                return this._net_version();
            case 'eth_chainId':
                return this._eth_chainId();
            default:
                return undefined;
        }
    }
    async _handleAsynchronousMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch (method) {
            case 'eth_requestAccounts':
                return this._eth_requestAccounts();
            case 'eth_sign':
                return this._eth_sign(params);
            case 'eth_ecRecover':
                return this._eth_ecRecover(params);
            case 'personal_sign':
                return this._personal_sign(params);
            case 'personal_ecRecover':
                return this._personal_ecRecover(params);
            case 'eth_signTransaction':
                return this._eth_signTransaction(params);
            case 'eth_sendRawTransaction':
                return this._eth_sendRawTransaction(params);
            case 'eth_sendTransaction':
                return this._eth_sendTransaction(params);
            case 'eth_signTypedData_v1':
                return this._eth_signTypedData_v1(params);
            case 'eth_signTypedData_v2':
                return this._throwUnsupportedMethodError();
            case 'eth_signTypedData_v3':
                return this._eth_signTypedData_v3(params);
            case 'eth_signTypedData_v4':
            case 'eth_signTypedData':
                return this._eth_signTypedData_v4(params);
            case 'cbWallet_arbitrary':
                return this._cbwallet_arbitrary(params);
            case 'wallet_addEthereumChain':
                return this._wallet_addEthereumChain(params);
            case 'wallet_switchEthereumChain':
                return this._wallet_switchEthereumChain(params);
            case 'wallet_watchAsset':
                return this._wallet_watchAsset(params);
        }
        const relay = await this.initializeRelay();
        return relay.makeEthereumJSONRPCRequest(request, this.jsonRpcUrl).catch((err) => {
            var _a;
            if (err.code === error_1.standardErrorCodes.rpc.methodNotFound ||
                err.code === error_1.standardErrorCodes.rpc.methodNotSupported) {
                (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.METHOD_NOT_IMPLEMENTED, {
                    method: request.method,
                    sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined,
                });
            }
            throw err;
        });
    }
    _handleAsynchronousFilterMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch (method) {
            case 'eth_newFilter':
                return this._eth_newFilter(params);
            case 'eth_newBlockFilter':
                return this._eth_newBlockFilter();
            case 'eth_newPendingTransactionFilter':
                return this._eth_newPendingTransactionFilter();
            case 'eth_getFilterChanges':
                return this._eth_getFilterChanges(params);
            case 'eth_getFilterLogs':
                return this._eth_getFilterLogs(params);
        }
        return undefined;
    }
    _handleSubscriptionMethods(request) {
        switch (request.method) {
            case 'eth_subscribe':
            case 'eth_unsubscribe':
                return this._subscriptionManager.handleRequest(request);
        }
        return undefined;
    }
    _isKnownAddress(addressString) {
        try {
            const addressStr = (0, util_1.ensureAddressString)(addressString);
            const lowercaseAddresses = this._addresses.map((address) => (0, util_1.ensureAddressString)(address));
            return lowercaseAddresses.includes(addressStr);
        }
        catch (_a) {
            // noop
        }
        return false;
    }
    _ensureKnownAddress(addressString) {
        var _a;
        if (!this._isKnownAddress(addressString)) {
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED);
            throw new Error('Unknown Ethereum address');
        }
    }
    _prepareTransactionParams(tx) {
        const fromAddress = tx.from ? (0, util_1.ensureAddressString)(tx.from) : this.selectedAddress;
        if (!fromAddress) {
            throw new Error('Ethereum address is unavailable');
        }
        this._ensureKnownAddress(fromAddress);
        const toAddress = tx.to ? (0, util_1.ensureAddressString)(tx.to) : null;
        const weiValue = tx.value != null ? (0, util_1.ensureBN)(tx.value) : new bn_js_1.default(0);
        const data = tx.data ? (0, util_1.ensureBuffer)(tx.data) : Buffer.alloc(0);
        const nonce = tx.nonce != null ? (0, util_1.ensureIntNumber)(tx.nonce) : null;
        const gasPriceInWei = tx.gasPrice != null ? (0, util_1.ensureBN)(tx.gasPrice) : null;
        const maxFeePerGas = tx.maxFeePerGas != null ? (0, util_1.ensureBN)(tx.maxFeePerGas) : null;
        const maxPriorityFeePerGas = tx.maxPriorityFeePerGas != null ? (0, util_1.ensureBN)(tx.maxPriorityFeePerGas) : null;
        const gasLimit = tx.gas != null ? (0, util_1.ensureBN)(tx.gas) : null;
        const chainId = tx.chainId ? (0, util_1.ensureIntNumber)(tx.chainId) : this.getChainId();
        return {
            fromAddress,
            toAddress,
            weiValue,
            data,
            nonce,
            gasPriceInWei,
            maxFeePerGas,
            maxPriorityFeePerGas,
            gasLimit,
            chainId,
        };
    }
    _isAuthorized() {
        return this._addresses.length > 0;
    }
    _requireAuthorization() {
        if (!this._isAuthorized()) {
            throw error_1.standardErrors.provider.unauthorized({});
        }
    }
    _throwUnsupportedMethodError() {
        throw error_1.standardErrors.provider.unsupportedMethod({});
    }
    async _signEthereumMessage(message, address, addPrefix, typedDataJson) {
        this._ensureKnownAddress(address);
        try {
            const relay = await this.initializeRelay();
            const res = await relay.signEthereumMessage(message, address, addPrefix, typedDataJson)
                .promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
            return { jsonrpc: '2.0', id: 0, result: res.result };
        }
        catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied message signature');
            }
            throw err;
        }
    }
    async _ethereumAddressFromSignedMessage(message, signature, addPrefix) {
        const relay = await this.initializeRelay();
        const res = await relay.ethereumAddressFromSignedMessage(message, signature, addPrefix).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
        }
        return { jsonrpc: '2.0', id: 0, result: res.result };
    }
    _eth_accounts() {
        return [...this._addresses];
    }
    _eth_coinbase() {
        return this.selectedAddress || null;
    }
    _net_version() {
        return this.getChainId().toString(10);
    }
    _eth_chainId() {
        return (0, util_1.hexStringFromIntNumber)(this.getChainId());
    }
    getChainId() {
        const chainIdStr = this._storage.getItem(DEFAULT_CHAIN_ID_KEY);
        if (!chainIdStr) {
            return (0, util_1.ensureIntNumber)(this._chainIdFromOpts);
        }
        const chainId = parseInt(chainIdStr, 10);
        return (0, util_1.ensureIntNumber)(chainId);
    }
    async _eth_requestAccounts() {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
            method: 'provider::_eth_requestAccounts',
            addresses_length: this._addresses.length,
            sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined,
        });
        if (this._isAuthorized()) {
            return Promise.resolve({
                jsonrpc: '2.0',
                id: 0,
                result: this._addresses,
            });
        }
        let res;
        try {
            const relay = await this.initializeRelay();
            res = await relay.requestEthereumAccounts().promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
        }
        catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied account authorization');
            }
            throw err;
        }
        if (!res.result) {
            throw new Error('accounts received is empty');
        }
        this._setAddresses(res.result);
        if (!this.isCoinbaseBrowser) {
            await this.switchEthereumChain(this.getChainId());
        }
        return { jsonrpc: '2.0', id: 0, result: this._addresses };
    }
    _eth_sign(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const message = (0, util_1.ensureBuffer)(params[1]);
        return this._signEthereumMessage(message, address, false);
    }
    _eth_ecRecover(params) {
        const message = (0, util_1.ensureBuffer)(params[0]);
        const signature = (0, util_1.ensureBuffer)(params[1]);
        return this._ethereumAddressFromSignedMessage(message, signature, false);
    }
    _personal_sign(params) {
        this._requireAuthorization();
        const message = (0, util_1.ensureBuffer)(params[0]);
        const address = (0, util_1.ensureAddressString)(params[1]);
        return this._signEthereumMessage(message, address, true);
    }
    _personal_ecRecover(params) {
        const message = (0, util_1.ensureBuffer)(params[0]);
        const signature = (0, util_1.ensureBuffer)(params[1]);
        return this._ethereumAddressFromSignedMessage(message, signature, true);
    }
    async _eth_signTransaction(params) {
        this._requireAuthorization();
        const tx = this._prepareTransactionParams(params[0] || {});
        try {
            const relay = await this.initializeRelay();
            const res = await relay.signEthereumTransaction(tx).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
            return { jsonrpc: '2.0', id: 0, result: res.result };
        }
        catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied transaction signature');
            }
            throw err;
        }
    }
    async _eth_sendRawTransaction(params) {
        const signedTransaction = (0, util_1.ensureBuffer)(params[0]);
        const relay = await this.initializeRelay();
        const res = await relay.submitEthereumTransaction(signedTransaction, this.getChainId()).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
        }
        return { jsonrpc: '2.0', id: 0, result: res.result };
    }
    async _eth_sendTransaction(params) {
        this._requireAuthorization();
        const tx = this._prepareTransactionParams(params[0] || {});
        try {
            const relay = await this.initializeRelay();
            const res = await relay.signAndSubmitEthereumTransaction(tx).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
            return { jsonrpc: '2.0', id: 0, result: res.result };
        }
        catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied transaction signature');
            }
            throw err;
        }
    }
    async _eth_signTypedData_v1(params) {
        this._requireAuthorization();
        const typedData = (0, util_1.ensureParsedJSONObject)(params[0]);
        const address = (0, util_1.ensureAddressString)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedDataLegacy({ data: typedData });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
    }
    async _eth_signTypedData_v3(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const typedData = (0, util_1.ensureParsedJSONObject)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedData_v3({ data: typedData });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
    }
    async _eth_signTypedData_v4(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const typedData = (0, util_1.ensureParsedJSONObject)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedData_v4({ data: typedData });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
    }
    /** @deprecated */
    async _cbwallet_arbitrary(params) {
        const action = params[0];
        const data = params[1];
        if (typeof data !== 'string') {
            throw new Error('parameter must be a string');
        }
        if (typeof action !== 'object' || action === null) {
            throw new Error('parameter must be an object');
        }
        const result = await this.genericRequest(action, data);
        return { jsonrpc: '2.0', id: 0, result };
    }
    async _wallet_addEthereumChain(params) {
        var _a, _b, _c, _d;
        const request = params[0];
        if (((_a = request.rpcUrls) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return {
                jsonrpc: '2.0',
                id: 0,
                error: { code: 2, message: `please pass in at least 1 rpcUrl` },
            };
        }
        if (!request.chainName || request.chainName.trim() === '') {
            throw error_1.standardErrors.rpc.invalidParams('chainName is a required field');
        }
        if (!request.nativeCurrency) {
            throw error_1.standardErrors.rpc.invalidParams('nativeCurrency is a required field');
        }
        const chainIdNumber = parseInt(request.chainId, 16);
        const success = await this.addEthereumChain(chainIdNumber, (_b = request.rpcUrls) !== null && _b !== void 0 ? _b : [], (_c = request.blockExplorerUrls) !== null && _c !== void 0 ? _c : [], request.chainName, (_d = request.iconUrls) !== null && _d !== void 0 ? _d : [], request.nativeCurrency);
        if (success) {
            return { jsonrpc: '2.0', id: 0, result: null };
        }
        return {
            jsonrpc: '2.0',
            id: 0,
            error: { code: 2, message: `unable to add ethereum chain` },
        };
    }
    async _wallet_switchEthereumChain(params) {
        const request = params[0];
        await this.switchEthereumChain(parseInt(request.chainId, 16));
        return { jsonrpc: '2.0', id: 0, result: null };
    }
    async _wallet_watchAsset(params) {
        const request = (Array.isArray(params) ? params[0] : params);
        if (!request.type) {
            throw error_1.standardErrors.rpc.invalidParams('Type is required');
        }
        if ((request === null || request === void 0 ? void 0 : request.type) !== 'ERC20') {
            throw error_1.standardErrors.rpc.invalidParams(`Asset of type '${request.type}' is not supported`);
        }
        if (!(request === null || request === void 0 ? void 0 : request.options)) {
            throw error_1.standardErrors.rpc.invalidParams('Options are required');
        }
        if (!(request === null || request === void 0 ? void 0 : request.options.address)) {
            throw error_1.standardErrors.rpc.invalidParams('Address is required');
        }
        const chainId = this.getChainId();
        const { address, symbol, image, decimals } = request.options;
        const res = await this.watchAsset(request.type, address, symbol, decimals, image, chainId);
        return { jsonrpc: '2.0', id: 0, result: res };
    }
    _eth_uninstallFilter(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.uninstallFilter(filterId);
    }
    async _eth_newFilter(params) {
        const param = params[0];
        const filterId = await this._filterPolyfill.newFilter(param);
        return { jsonrpc: '2.0', id: 0, result: filterId };
    }
    async _eth_newBlockFilter() {
        const filterId = await this._filterPolyfill.newBlockFilter();
        return { jsonrpc: '2.0', id: 0, result: filterId };
    }
    async _eth_newPendingTransactionFilter() {
        const filterId = await this._filterPolyfill.newPendingTransactionFilter();
        return { jsonrpc: '2.0', id: 0, result: filterId };
    }
    _eth_getFilterChanges(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.getFilterChanges(filterId);
    }
    _eth_getFilterLogs(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.getFilterLogs(filterId);
    }
    initializeRelay() {
        if (this._relay) {
            return Promise.resolve(this._relay);
        }
        return this._relayProvider().then((relay) => {
            relay.setAccountsCallback((accounts, isDisconnect) => this._setAddresses(accounts, isDisconnect));
            relay.setChainCallback((chainId, jsonRpcUrl) => {
                this.updateProviderInfo(jsonRpcUrl, parseInt(chainId, 10));
            });
            relay.setDappDefaultChainCallback(this._chainIdFromOpts);
            this._relay = relay;
            return relay;
        });
    }
}
exports.CoinbaseWalletProvider = CoinbaseWalletProvider;
