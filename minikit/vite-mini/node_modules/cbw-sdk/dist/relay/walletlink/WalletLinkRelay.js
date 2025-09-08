"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLinkRelay = void 0;
const error_1 = require("../../core/error");
const type_1 = require("../../core/type");
const util_1 = require("../../core/util");
const DiagnosticLogger_1 = require("../../provider/DiagnosticLogger");
const RelayAbstract_1 = require("../RelayAbstract");
const Session_1 = require("../Session");
const WalletLinkConnection_1 = require("./connection/WalletLinkConnection");
const Web3Response_1 = require("./type/Web3Response");
const WalletLinkRelayUI_1 = require("./ui/WalletLinkRelayUI");
class WalletLinkRelay extends RelayAbstract_1.RelayAbstract {
    constructor(options) {
        var _a;
        super();
        this.accountsCallback = null;
        this.chainCallbackParams = { chainId: '', jsonRpcUrl: '' }; // to implement distinctUntilChanged
        this.chainCallback = null;
        this.dappDefaultChain = 1;
        this.appName = '';
        this.appLogoUrl = null;
        this.linkedUpdated = (linked) => {
            var _a;
            this.isLinked = linked;
            const cachedAddresses = this.storage.getItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);
            if (linked) {
                // Only set linked session variable one way
                this.session.linked = linked;
            }
            this.isUnlinkedErrorState = false;
            if (cachedAddresses) {
                const addresses = cachedAddresses.split(' ');
                const wasConnectedViaStandalone = this.storage.getItem('IsStandaloneSigning') === 'true';
                if (addresses[0] !== '' && !linked && this.session.linked && !wasConnectedViaStandalone) {
                    this.isUnlinkedErrorState = true;
                    const sessionIdHash = this.getSessionIdHash();
                    (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.UNLINKED_ERROR_STATE, {
                        sessionIdHash,
                    });
                }
            }
        };
        this.metadataUpdated = (key, value) => {
            this.storage.setItem(key, value);
        };
        this.chainUpdated = (chainId, jsonRpcUrl) => {
            if (this.chainCallbackParams.chainId === chainId &&
                this.chainCallbackParams.jsonRpcUrl === jsonRpcUrl) {
                return;
            }
            this.chainCallbackParams = {
                chainId,
                jsonRpcUrl,
            };
            if (this.chainCallback) {
                this.chainCallback(chainId, jsonRpcUrl);
            }
        };
        this.accountUpdated = (selectedAddress) => {
            if (this.accountsCallback) {
                this.accountsCallback([selectedAddress]);
            }
            if (WalletLinkRelay.accountRequestCallbackIds.size > 0) {
                // We get the ethereum address from the metadata.  If for whatever
                // reason we don't get a response via an explicit web3 message
                // we can still fulfill the eip1102 request.
                Array.from(WalletLinkRelay.accountRequestCallbackIds.values()).forEach((id) => {
                    const message = {
                        type: 'WEB3_RESPONSE',
                        id,
                        response: {
                            method: 'requestEthereumAccounts',
                            result: [selectedAddress],
                        },
                    };
                    this.invokeCallback(Object.assign(Object.assign({}, message), { id }));
                });
                WalletLinkRelay.accountRequestCallbackIds.clear();
            }
        };
        this.connectedUpdated = (connected) => {
            this.ui.setConnected(connected);
        };
        this.resetAndReload = this.resetAndReload.bind(this);
        this.linkAPIUrl = options.linkAPIUrl;
        this.storage = options.storage;
        this.options = options;
        const { session, ui, connection } = this.subscribe();
        this._session = session;
        this.connection = connection;
        this.relayEventManager = options.relayEventManager;
        this.diagnostic = options.diagnosticLogger;
        this._reloadOnDisconnect = (_a = options.reloadOnDisconnect) !== null && _a !== void 0 ? _a : true;
        this.ui = ui;
    }
    subscribe() {
        const session = Session_1.Session.load(this.storage) || new Session_1.Session(this.storage).save();
        const { linkAPIUrl, diagnostic } = this;
        const connection = new WalletLinkConnection_1.WalletLinkConnection({
            session,
            linkAPIUrl,
            diagnostic,
            listener: this,
        });
        const { version, darkMode } = this.options;
        const ui = this.options.uiConstructor({
            linkAPIUrl,
            version,
            darkMode,
            session,
        });
        connection.connect();
        return { session, ui, connection };
    }
    attachUI() {
        this.ui.attach();
    }
    resetAndReload() {
        Promise.race([
            this.connection.setSessionMetadata('__destroyed', '1'),
            new Promise((resolve) => setTimeout(() => resolve(null), 1000)),
        ])
            .then(() => {
            var _a, _b;
            const isStandalone = this.ui.isStandalone();
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.SESSION_STATE_CHANGE, {
                method: 'relay::resetAndReload',
                sessionMetadataChange: '__destroyed, 1',
                sessionIdHash: this.getSessionIdHash(),
            });
            this.connection.destroy();
            /**
             * Only clear storage if the session id we have in memory matches the one on disk
             * Otherwise, in the case where we have 2 tabs, another tab might have cleared
             * storage already.  In that case if we clear storage again, the user will be in
             * a state where the first tab allows the user to connect but the session that
             * was used isn't persisted.  This leaves the user in a state where they aren't
             * connected to the mobile app.
             */
            const storedSession = Session_1.Session.load(this.storage);
            if ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) === this._session.id) {
                this.storage.clear();
            }
            else if (storedSession) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.SKIPPED_CLEARING_SESSION, {
                    sessionIdHash: this.getSessionIdHash(),
                    storedSessionIdHash: Session_1.Session.hash(storedSession.id),
                });
            }
            if (this._reloadOnDisconnect) {
                this.ui.reloadUI();
                return;
            }
            if (this.accountsCallback) {
                this.accountsCallback([], true);
            }
            const { session, ui, connection } = this.subscribe();
            this._session = session;
            this.connection = connection;
            this.ui = ui;
            if (isStandalone && this.ui.setStandalone)
                this.ui.setStandalone(true);
            if (!this.options.headlessMode)
                this.attachUI();
        })
            .catch((err) => {
            var _a;
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.FAILURE, {
                method: 'relay::resetAndReload',
                message: `failed to reset and reload with ${err}`,
                sessionIdHash: this.getSessionIdHash(),
            });
        });
    }
    setAppInfo(appName, appLogoUrl) {
        this.appName = appName;
        this.appLogoUrl = appLogoUrl;
    }
    getStorageItem(key) {
        return this.storage.getItem(key);
    }
    get session() {
        return this._session;
    }
    setStorageItem(key, value) {
        this.storage.setItem(key, value);
    }
    signEthereumMessage(message, address, addPrefix, typedDataJson) {
        return this.sendRequest({
            method: 'signEthereumMessage',
            params: {
                message: (0, util_1.hexStringFromBuffer)(message, true),
                address,
                addPrefix,
                typedDataJson: typedDataJson || null,
            },
        });
    }
    ethereumAddressFromSignedMessage(message, signature, addPrefix) {
        return this.sendRequest({
            method: 'ethereumAddressFromSignedMessage',
            params: {
                message: (0, util_1.hexStringFromBuffer)(message, true),
                signature: (0, util_1.hexStringFromBuffer)(signature, true),
                addPrefix,
            },
        });
    }
    signEthereumTransaction(params) {
        return this.sendRequest({
            method: 'signEthereumTransaction',
            params: {
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
                data: (0, util_1.hexStringFromBuffer)(params.data, true),
                nonce: params.nonce,
                gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                maxFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                maxPriorityFeePerGas: params.gasPriceInWei
                    ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei)
                    : null,
                gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
                chainId: params.chainId,
                shouldSubmit: false,
            },
        });
    }
    signAndSubmitEthereumTransaction(params) {
        return this.sendRequest({
            method: 'signEthereumTransaction',
            params: {
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
                data: (0, util_1.hexStringFromBuffer)(params.data, true),
                nonce: params.nonce,
                gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                maxFeePerGas: params.maxFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxFeePerGas) : null,
                maxPriorityFeePerGas: params.maxPriorityFeePerGas
                    ? (0, util_1.bigIntStringFromBN)(params.maxPriorityFeePerGas)
                    : null,
                gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
                chainId: params.chainId,
                shouldSubmit: true,
            },
        });
    }
    submitEthereumTransaction(signedTransaction, chainId) {
        return this.sendRequest({
            method: 'submitEthereumTransaction',
            params: {
                signedTransaction: (0, util_1.hexStringFromBuffer)(signedTransaction, true),
                chainId,
            },
        });
    }
    scanQRCode(regExp) {
        return this.sendRequest({
            method: 'scanQRCode',
            params: {
                regExp,
            },
        });
    }
    getQRCodeUrl() {
        return (0, util_1.createQrUrl)(this._session.id, this._session.secret, this.linkAPIUrl, false, this.options.version, this.dappDefaultChain);
    }
    genericRequest(data, action) {
        return this.sendRequest({
            method: 'generic',
            params: {
                action,
                data,
            },
        });
    }
    sendGenericMessage(request) {
        return this.sendRequest(request);
    }
    sendRequest(request) {
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        const promise = new Promise((resolve, reject) => {
            if (!this.ui.isStandalone()) {
                hideSnackbarItem = this.ui.showConnecting({
                    isUnlinkedErrorState: this.isUnlinkedErrorState,
                    onCancel: cancel,
                    onResetConnection: this.resetAndReload, // eslint-disable-line @typescript-eslint/unbound-method
                });
            }
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            if (this.ui.isStandalone()) {
                this.sendRequestStandalone(id, request);
            }
            else {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return { promise, cancel };
    }
    setConnectDisabled(disabled) {
        this.ui.setConnectDisabled(disabled);
    }
    setAccountsCallback(accountsCallback) {
        this.accountsCallback = accountsCallback;
    }
    setChainCallback(chainCallback) {
        this.chainCallback = chainCallback;
    }
    setDappDefaultChainCallback(chainId) {
        this.dappDefaultChain = chainId;
        if (this.ui instanceof WalletLinkRelayUI_1.WalletLinkRelayUI) {
            this.ui.setChainId(chainId);
        }
    }
    publishWeb3RequestEvent(id, request) {
        var _a;
        const message = { type: 'WEB3_REQUEST', id, request };
        const storedSession = Session_1.Session.load(this.storage);
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_REQUEST, {
            eventId: message.id,
            method: `relay::${request.method}`,
            sessionIdHash: this.getSessionIdHash(),
            storedSessionIdHash: storedSession ? Session_1.Session.hash(storedSession.id) : '',
            isSessionMismatched: ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) !== this._session.id).toString(),
        });
        this.publishEvent('Web3Request', message, true)
            .then((_) => {
            var _a;
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_REQUEST_PUBLISHED, {
                eventId: message.id,
                method: `relay::${request.method}`,
                sessionIdHash: this.getSessionIdHash(),
                storedSessionIdHash: storedSession ? Session_1.Session.hash(storedSession.id) : '',
                isSessionMismatched: ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) !== this._session.id).toString(),
            });
        })
            .catch((err) => {
            this.handleWeb3ResponseMessage({
                type: 'WEB3_RESPONSE',
                id: message.id,
                response: {
                    method: request.method,
                    errorMessage: err.message,
                },
            });
        });
    }
    publishWeb3RequestCanceledEvent(id) {
        const message = {
            type: 'WEB3_REQUEST_CANCELED',
            id,
        };
        this.publishEvent('Web3RequestCanceled', message, false).then();
    }
    publishEvent(event, message, callWebhook) {
        return this.connection.publishEvent(event, message, callWebhook);
    }
    handleWeb3ResponseMessage(message) {
        var _a;
        const { response } = message;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_RESPONSE, {
            eventId: message.id,
            method: `relay::${response.method}`,
            sessionIdHash: this.getSessionIdHash(),
        });
        if (response.method === 'requestEthereumAccounts') {
            WalletLinkRelay.accountRequestCallbackIds.forEach((id) => this.invokeCallback(Object.assign(Object.assign({}, message), { id })));
            WalletLinkRelay.accountRequestCallbackIds.clear();
            return;
        }
        this.invokeCallback(message);
    }
    handleErrorResponse(id, method, error, errorCode) {
        var _a;
        const errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : (0, error_1.getMessageFromCode)(errorCode);
        this.handleWeb3ResponseMessage({
            type: 'WEB3_RESPONSE',
            id,
            response: {
                method,
                errorMessage,
                errorCode,
            },
        });
    }
    invokeCallback(message) {
        const callback = this.relayEventManager.callbacks.get(message.id);
        if (callback) {
            callback(message.response);
            this.relayEventManager.callbacks.delete(message.id);
        }
    }
    requestEthereumAccounts() {
        const request = {
            method: 'requestEthereumAccounts',
            params: {
                appName: this.appName,
                appLogoUrl: this.appLogoUrl || null,
            },
        };
        const hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        const promise = new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                this.ui.hideRequestEthereumAccounts();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            if (this.ui.inlineAccountsResponse()) {
                const onAccounts = (accounts) => {
                    this.handleWeb3ResponseMessage({
                        type: 'WEB3_RESPONSE',
                        id,
                        response: { method: 'requestEthereumAccounts', result: accounts },
                    });
                };
                this.ui.requestEthereumAccounts({
                    onCancel: cancel,
                    onAccounts,
                });
            }
            else {
                // Error if user closes TryExtensionLinkDialog without connecting
                const err = error_1.standardErrors.provider.userRejectedRequest('User denied account authorization');
                this.ui.requestEthereumAccounts({
                    onCancel: () => cancel(err),
                });
            }
            WalletLinkRelay.accountRequestCallbackIds.add(id);
            if (!this.ui.inlineAccountsResponse() && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return { promise, cancel };
    }
    selectProvider(providerOptions) {
        const request = {
            method: 'selectProvider',
            params: {
                providerOptions,
            },
        };
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
        };
        const promise = new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (_error) => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: { method: 'selectProvider', result: type_1.ProviderType.Unselected },
                });
            };
            const approve = (selectedProviderKey) => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: { method: 'selectProvider', result: selectedProviderKey },
                });
            };
            if (this.ui.selectProvider)
                this.ui.selectProvider({
                    onApprove: approve,
                    onCancel: _cancel,
                    providerOptions,
                });
        });
        return { cancel, promise };
    }
    watchAsset(type, address, symbol, decimals, image, chainId) {
        const request = {
            method: 'watchAsset',
            params: {
                type,
                options: {
                    address,
                    symbol,
                    decimals,
                    image,
                },
                chainId,
            },
        };
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        if (!this.ui.inlineWatchAsset()) {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload, // eslint-disable-line @typescript-eslint/unbound-method
            });
        }
        const promise = new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (_error) => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'watchAsset',
                        result: false,
                    },
                });
            };
            const approve = () => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'watchAsset',
                        result: true,
                    },
                });
            };
            if (this.ui.inlineWatchAsset()) {
                this.ui.watchAsset({
                    onApprove: approve,
                    onCancel: _cancel,
                    type,
                    address,
                    symbol,
                    decimals,
                    image,
                    chainId,
                });
            }
            if (!this.ui.inlineWatchAsset() && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return { cancel, promise };
    }
    addEthereumChain(chainId, rpcUrls, iconUrls, blockExplorerUrls, chainName, nativeCurrency) {
        const request = {
            method: 'addEthereumChain',
            params: {
                chainId,
                rpcUrls,
                blockExplorerUrls,
                chainName,
                iconUrls,
                nativeCurrency,
            },
        };
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        if (!this.ui.inlineAddEthereumChain(chainId)) {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload, // eslint-disable-line @typescript-eslint/unbound-method
            });
        }
        const promise = new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (_error) => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'addEthereumChain',
                        result: {
                            isApproved: false,
                            rpcUrl: '',
                        },
                    },
                });
            };
            const approve = (rpcUrl) => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'addEthereumChain',
                        result: {
                            isApproved: true,
                            rpcUrl,
                        },
                    },
                });
            };
            if (this.ui.inlineAddEthereumChain(chainId)) {
                this.ui.addEthereumChain({
                    onCancel: _cancel,
                    onApprove: approve,
                    chainId: request.params.chainId,
                    rpcUrls: request.params.rpcUrls,
                    blockExplorerUrls: request.params.blockExplorerUrls,
                    chainName: request.params.chainName,
                    iconUrls: request.params.iconUrls,
                    nativeCurrency: request.params.nativeCurrency,
                });
            }
            if (!this.ui.inlineAddEthereumChain(chainId) && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return { promise, cancel };
    }
    switchEthereumChain(chainId, address) {
        const request = {
            method: 'switchEthereumChain',
            params: Object.assign({ chainId }, { address }),
        };
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
        };
        const promise = new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                if ((0, Web3Response_1.isErrorResponse)(response) && response.errorCode) {
                    return reject(error_1.standardErrors.provider.custom({
                        code: response.errorCode,
                        message: `Unrecognized chain ID. Try adding the chain using addEthereumChain first.`,
                    }));
                }
                else if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (error) => {
                var _a;
                if (error) {
                    // backward compatibility
                    const errorCode = (_a = (0, error_1.getErrorCode)(error)) !== null && _a !== void 0 ? _a : error_1.standardErrorCodes.provider.unsupportedChain;
                    this.handleErrorResponse(id, 'switchEthereumChain', error instanceof Error ? error : error_1.standardErrors.provider.unsupportedChain(chainId), errorCode);
                }
                else {
                    this.handleWeb3ResponseMessage({
                        type: 'WEB3_RESPONSE',
                        id,
                        response: {
                            method: 'switchEthereumChain',
                            result: {
                                isApproved: false,
                                rpcUrl: '',
                            },
                        },
                    });
                }
            };
            const approve = (rpcUrl) => {
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'switchEthereumChain',
                        result: {
                            isApproved: true,
                            rpcUrl,
                        },
                    },
                });
            };
            this.ui.switchEthereumChain({
                onCancel: _cancel,
                onApprove: approve,
                chainId: request.params.chainId,
                address: request.params.address,
            });
            if (!this.ui.inlineSwitchEthereumChain() && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return { promise, cancel };
    }
    inlineAddEthereumChain(chainId) {
        return this.ui.inlineAddEthereumChain(chainId);
    }
    getSessionIdHash() {
        return Session_1.Session.hash(this._session.id);
    }
    sendRequestStandalone(id, request) {
        const _cancel = (error) => {
            this.handleErrorResponse(id, request.method, error);
        };
        const onSuccess = (response) => {
            this.handleWeb3ResponseMessage({
                type: 'WEB3_RESPONSE',
                id,
                response,
            });
        };
        switch (request.method) {
            case 'signEthereumMessage':
                this.ui.signEthereumMessage({
                    request,
                    onSuccess,
                    onCancel: _cancel,
                });
                break;
            case 'signEthereumTransaction':
                this.ui.signEthereumTransaction({
                    request,
                    onSuccess,
                    onCancel: _cancel,
                });
                break;
            case 'submitEthereumTransaction':
                this.ui.submitEthereumTransaction({
                    request,
                    onSuccess,
                    onCancel: _cancel,
                });
                break;
            case 'ethereumAddressFromSignedMessage':
                this.ui.ethereumAddressFromSignedMessage({
                    request,
                    onSuccess,
                });
                break;
            default:
                _cancel();
                break;
        }
    }
}
exports.WalletLinkRelay = WalletLinkRelay;
WalletLinkRelay.accountRequestCallbackIds = new Set();
