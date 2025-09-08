// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
import { standardErrors } from '../../../core/error/errors.js';
import { ScopedLocalStorage } from '../../../core/storage/ScopedLocalStorage.js';
import { bigIntStringFromBigInt, hexStringFromBuffer, randomBytesHex } from '../../../core/type/util.js';
import { WalletLinkConnection, } from './connection/WalletLinkConnection.js';
import { LOCAL_STORAGE_ADDRESSES_KEY } from './constants.js';
import { RelayEventManager } from './RelayEventManager.js';
import { WalletLinkSession } from './type/WalletLinkSession.js';
import { isErrorResponse } from './type/Web3Response.js';
import { isMobileWeb } from './ui/components/util.js';
import { WalletLinkRelayUI } from './ui/WalletLinkRelayUI.js';
import { WLMobileRelayUI } from './ui/WLMobileRelayUI.js';
export class WalletLinkRelay {
    constructor(options) {
        this.chainCallbackParams = { chainId: '', jsonRpcUrl: '' }; // to implement distinctUntilChanged
        this.isMobileWeb = isMobileWeb();
        this.linkedUpdated = (linked) => {
            this.isLinked = linked;
            const cachedAddresses = this.storage.getItem(LOCAL_STORAGE_ADDRESSES_KEY);
            if (linked) {
                // Only set linked session variable one way
                this._session.linked = linked;
            }
            this.isUnlinkedErrorState = false;
            if (cachedAddresses) {
                const addresses = cachedAddresses.split(' ');
                const wasConnectedViaStandalone = this.storage.getItem('IsStandaloneSigning') === 'true';
                if (addresses[0] !== '' && !linked && this._session.linked && !wasConnectedViaStandalone) {
                    this.isUnlinkedErrorState = true;
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
                this.chainCallback(jsonRpcUrl, Number.parseInt(chainId, 10));
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
                    this.invokeCallback(id, {
                        method: 'requestEthereumAccounts',
                        result: [selectedAddress],
                    });
                });
                WalletLinkRelay.accountRequestCallbackIds.clear();
            }
        };
        this.resetAndReload = this.resetAndReload.bind(this);
        this.linkAPIUrl = options.linkAPIUrl;
        this.storage = options.storage;
        this.metadata = options.metadata;
        this.accountsCallback = options.accountsCallback;
        this.chainCallback = options.chainCallback;
        const { session, ui, connection } = this.subscribe();
        this._session = session;
        this.connection = connection;
        this.relayEventManager = new RelayEventManager();
        this.ui = ui;
        this.ui.attach();
    }
    subscribe() {
        const session = WalletLinkSession.load(this.storage) || WalletLinkSession.create(this.storage);
        const { linkAPIUrl } = this;
        const connection = new WalletLinkConnection({
            session,
            linkAPIUrl,
            listener: this,
        });
        const ui = this.isMobileWeb ? new WLMobileRelayUI() : new WalletLinkRelayUI();
        connection.connect();
        return { session, ui, connection };
    }
    resetAndReload() {
        this.connection
            .destroy()
            .then(() => {
            /**
             * Only clear storage if the session id we have in memory matches the one on disk
             * Otherwise, in the case where we have 2 tabs, another tab might have cleared
             * storage already.  In that case if we clear storage again, the user will be in
             * a state where the first tab allows the user to connect but the session that
             * was used isn't persisted.  This leaves the user in a state where they aren't
             * connected to the mobile app.
             */
            const storedSession = WalletLinkSession.load(this.storage);
            if ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) === this._session.id) {
                ScopedLocalStorage.clearAll();
            }
            document.location.reload();
        })
            .catch((_) => { });
    }
    signEthereumTransaction(params) {
        return this.sendRequest({
            method: 'signEthereumTransaction',
            params: {
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                weiValue: bigIntStringFromBigInt(params.weiValue),
                data: hexStringFromBuffer(params.data, true),
                nonce: params.nonce,
                gasPriceInWei: params.gasPriceInWei ? bigIntStringFromBigInt(params.gasPriceInWei) : null,
                maxFeePerGas: params.gasPriceInWei ? bigIntStringFromBigInt(params.gasPriceInWei) : null,
                maxPriorityFeePerGas: params.gasPriceInWei
                    ? bigIntStringFromBigInt(params.gasPriceInWei)
                    : null,
                gasLimit: params.gasLimit ? bigIntStringFromBigInt(params.gasLimit) : null,
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
                weiValue: bigIntStringFromBigInt(params.weiValue),
                data: hexStringFromBuffer(params.data, true),
                nonce: params.nonce,
                gasPriceInWei: params.gasPriceInWei ? bigIntStringFromBigInt(params.gasPriceInWei) : null,
                maxFeePerGas: params.maxFeePerGas ? bigIntStringFromBigInt(params.maxFeePerGas) : null,
                maxPriorityFeePerGas: params.maxPriorityFeePerGas
                    ? bigIntStringFromBigInt(params.maxPriorityFeePerGas)
                    : null,
                gasLimit: params.gasLimit ? bigIntStringFromBigInt(params.gasLimit) : null,
                chainId: params.chainId,
                shouldSubmit: true,
            },
        });
    }
    submitEthereumTransaction(signedTransaction, chainId) {
        return this.sendRequest({
            method: 'submitEthereumTransaction',
            params: {
                signedTransaction: hexStringFromBuffer(signedTransaction, true),
                chainId,
            },
        });
    }
    getWalletLinkSession() {
        return this._session;
    }
    sendRequest(request) {
        let hideSnackbarItem = null;
        const id = randomBytesHex(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        return new Promise((resolve, reject) => {
            {
                hideSnackbarItem = this.ui.showConnecting({
                    isUnlinkedErrorState: this.isUnlinkedErrorState,
                    onCancel: cancel,
                    onResetConnection: this.resetAndReload,
                });
            }
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if (isErrorResponse(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            this.publishWeb3RequestEvent(id, request);
        });
    }
    publishWeb3RequestEvent(id, request) {
        const message = { type: 'WEB3_REQUEST', id, request };
        this.publishEvent('Web3Request', message, true)
            .then((_) => { })
            .catch((err) => {
            this.handleWeb3ResponseMessage(message.id, {
                method: request.method,
                errorMessage: err.message,
            });
        });
        if (this.isMobileWeb) {
            this.openCoinbaseWalletDeeplink(request.method);
        }
    }
    // copied from MobileRelay
    openCoinbaseWalletDeeplink(method) {
        if (!(this.ui instanceof WLMobileRelayUI))
            return;
        // For mobile relay requests, open the Coinbase Wallet app
        switch (method) {
            case 'requestEthereumAccounts': // requestEthereumAccounts is handled via popup
            case 'switchEthereumChain': // switchEthereumChain doesn't need to open the app
                return;
            default:
                window.addEventListener('blur', () => {
                    window.addEventListener('focus', () => {
                        this.connection.checkUnseenEvents();
                    }, { once: true });
                }, { once: true });
                this.ui.openCoinbaseWalletDeeplink();
                break;
        }
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
    handleWeb3ResponseMessage(id, response) {
        if (response.method === 'requestEthereumAccounts') {
            WalletLinkRelay.accountRequestCallbackIds.forEach((id) => this.invokeCallback(id, response));
            WalletLinkRelay.accountRequestCallbackIds.clear();
            return;
        }
        this.invokeCallback(id, response);
    }
    handleErrorResponse(id, method, error) {
        var _a;
        const errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unspecified error message.';
        this.handleWeb3ResponseMessage(id, {
            method,
            errorMessage,
        });
    }
    invokeCallback(id, response) {
        const callback = this.relayEventManager.callbacks.get(id);
        if (callback) {
            callback(response);
            this.relayEventManager.callbacks.delete(id);
        }
    }
    requestEthereumAccounts() {
        const { appName, appLogoUrl } = this.metadata;
        const request = {
            method: 'requestEthereumAccounts',
            params: {
                appName,
                appLogoUrl,
            },
        };
        const hideSnackbarItem = null;
        const id = randomBytesHex(8);
        return new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                // @ts-ignore
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if (isErrorResponse(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            WalletLinkRelay.accountRequestCallbackIds.add(id);
            this.publishWeb3RequestEvent(id, request);
        });
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
        const id = randomBytesHex(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload,
            });
        }
        return new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if (isErrorResponse(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            this.publishWeb3RequestEvent(id, request);
        });
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
        const id = randomBytesHex(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload,
            });
        }
        return new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if (isErrorResponse(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            this.publishWeb3RequestEvent(id, request);
        });
    }
    switchEthereumChain(chainId, address) {
        const request = {
            method: 'switchEthereumChain',
            params: Object.assign({ chainId }, { address }),
        };
        let hideSnackbarItem = null;
        const id = randomBytesHex(8);
        const cancel = (error) => {
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload,
            });
        }
        return new Promise((resolve, reject) => {
            this.relayEventManager.callbacks.set(id, (response) => {
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if (isErrorResponse(response) && response.errorCode) {
                    return reject(standardErrors.provider.custom({
                        code: response.errorCode,
                        message: `Unrecognized chain ID. Try adding the chain using addEthereumChain first.`,
                    }));
                }
                if (isErrorResponse(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            this.publishWeb3RequestEvent(id, request);
        });
    }
}
WalletLinkRelay.accountRequestCallbackIds = new Set();
//# sourceMappingURL=WalletLinkRelay.js.map