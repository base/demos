"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinbaseWalletSDK = void 0;
const wallet_logo_1 = require("./assets/wallet-logo");
const constants_1 = require("./core/constants");
const util_1 = require("./core/util");
const ScopedLocalStorage_1 = require("./lib/ScopedLocalStorage");
const CoinbaseWalletProvider_1 = require("./provider/CoinbaseWalletProvider");
const MobileRelay_1 = require("./relay/mobile/MobileRelay");
const MobileRelayUI_1 = require("./relay/mobile/MobileRelayUI");
const RelayEventManager_1 = require("./relay/RelayEventManager");
const WalletLinkRelayUI_1 = require("./relay/walletlink/ui/WalletLinkRelayUI");
const WalletLinkRelay_1 = require("./relay/walletlink/WalletLinkRelay");
const version_1 = require("./version");
class CoinbaseWalletSDK {
    /**
     * Constructor
     * @param options Coinbase Wallet SDK constructor options
     */
    constructor(options) {
        var _a, _b, _c;
        this._appName = '';
        this._appLogoUrl = null;
        this._relay = null;
        this._relayEventManager = null;
        const linkAPIUrl = options.linkAPIUrl || constants_1.LINK_API_URL;
        if (typeof options.overrideIsMetaMask === 'undefined') {
            this._overrideIsMetaMask = false;
        }
        else {
            this._overrideIsMetaMask = options.overrideIsMetaMask;
        }
        this._overrideIsCoinbaseWallet = (_a = options.overrideIsCoinbaseWallet) !== null && _a !== void 0 ? _a : true;
        this._overrideIsCoinbaseBrowser = (_b = options.overrideIsCoinbaseBrowser) !== null && _b !== void 0 ? _b : false;
        this._diagnosticLogger = options.diagnosticLogger;
        this._reloadOnDisconnect = (_c = options.reloadOnDisconnect) !== null && _c !== void 0 ? _c : true;
        const url = new URL(linkAPIUrl);
        const origin = `${url.protocol}//${url.host}`;
        this._storage = new ScopedLocalStorage_1.ScopedLocalStorage(`-walletlink:${origin}`); // needs migration to preserve local states
        this._storage.setItem('version', CoinbaseWalletSDK.VERSION);
        if (this.walletExtension || this.coinbaseBrowser) {
            return;
        }
        this._relayEventManager = new RelayEventManager_1.RelayEventManager();
        const isMobile = (0, util_1.isMobileWeb)();
        const uiConstructor = options.uiConstructor ||
            ((opts) => (isMobile ? new MobileRelayUI_1.MobileRelayUI(opts) : new WalletLinkRelayUI_1.WalletLinkRelayUI(opts)));
        const relayOption = {
            linkAPIUrl,
            version: version_1.LIB_VERSION,
            darkMode: !!options.darkMode,
            headlessMode: !!options.headlessMode,
            uiConstructor,
            storage: this._storage,
            relayEventManager: this._relayEventManager,
            diagnosticLogger: this._diagnosticLogger,
            reloadOnDisconnect: this._reloadOnDisconnect,
            enableMobileWalletLink: options.enableMobileWalletLink,
        };
        this._relay = isMobile ? new MobileRelay_1.MobileRelay(relayOption) : new WalletLinkRelay_1.WalletLinkRelay(relayOption);
        this.setAppInfo(options.appName, options.appLogoUrl);
        if (options.headlessMode)
            return;
        this._relay.attachUI();
    }
    /**
     * Create a Web3 Provider object
     * @param jsonRpcUrl Ethereum JSON RPC URL (Default: "")
     * @param chainId Ethereum Chain ID (Default: 1)
     * @returns A Web3 Provider
     */
    makeWeb3Provider(jsonRpcUrl = '', chainId = 1) {
        const extension = this.walletExtension;
        if (extension) {
            if (!this.isCipherProvider(extension)) {
                extension.setProviderInfo(jsonRpcUrl, chainId);
            }
            if (this._reloadOnDisconnect === false &&
                typeof extension.disableReloadOnDisconnect === 'function')
                extension.disableReloadOnDisconnect();
            return extension;
        }
        const dappBrowser = this.coinbaseBrowser;
        if (dappBrowser) {
            return dappBrowser;
        }
        const relay = this._relay;
        if (!relay || !this._relayEventManager || !this._storage) {
            throw new Error('Relay not initialized, should never happen');
        }
        if (!jsonRpcUrl)
            relay.setConnectDisabled(true);
        return new CoinbaseWalletProvider_1.CoinbaseWalletProvider({
            relayProvider: () => Promise.resolve(relay),
            relayEventManager: this._relayEventManager,
            storage: this._storage,
            jsonRpcUrl,
            chainId,
            qrUrl: this.getQrUrl(),
            diagnosticLogger: this._diagnosticLogger,
            overrideIsMetaMask: this._overrideIsMetaMask,
            overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
            overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser,
        });
    }
    /**
     * Set application information
     * @param appName Application name
     * @param appLogoUrl Application logo image URL
     */
    setAppInfo(appName, appLogoUrl) {
        var _a;
        this._appName = appName || 'DApp';
        this._appLogoUrl = appLogoUrl || (0, util_1.getFavicon)();
        const extension = this.walletExtension;
        if (extension) {
            if (!this.isCipherProvider(extension)) {
                extension.setAppInfo(this._appName, this._appLogoUrl);
            }
        }
        else {
            (_a = this._relay) === null || _a === void 0 ? void 0 : _a.setAppInfo(this._appName, this._appLogoUrl);
        }
    }
    /**
     * Disconnect. After disconnecting, this will reload the web page to ensure
     * all potential stale state is cleared.
     */
    disconnect() {
        var _a;
        const extension = this === null || this === void 0 ? void 0 : this.walletExtension;
        if (extension) {
            void extension.close();
        }
        else {
            (_a = this._relay) === null || _a === void 0 ? void 0 : _a.resetAndReload();
        }
    }
    /**
     * Return QR URL for mobile wallet connection, will return null if extension is installed
     */
    getQrUrl() {
        var _a, _b;
        return (_b = (_a = this._relay) === null || _a === void 0 ? void 0 : _a.getQRCodeUrl()) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Official Coinbase Wallet logo for developers to use on their frontend
     * @param type Type of wallet logo: "standard" | "circle" | "text" | "textWithLogo" | "textLight" | "textWithLogoLight"
     * @param width Width of the logo (Optional)
     * @returns SVG Data URI
     */
    getCoinbaseWalletLogo(type, width = 240) {
        return (0, wallet_logo_1.walletLogo)(type, width);
    }
    get walletExtension() {
        var _a;
        return (_a = window.coinbaseWalletExtension) !== null && _a !== void 0 ? _a : window.walletLinkExtension;
    }
    get coinbaseBrowser() {
        var _a, _b;
        try {
            // Coinbase DApp browser does not inject into iframes so grab provider from top frame if it exists
            const ethereum = (_a = window.ethereum) !== null && _a !== void 0 ? _a : (_b = window.top) === null || _b === void 0 ? void 0 : _b.ethereum;
            if (!ethereum) {
                return undefined;
            }
            if ('isCoinbaseBrowser' in ethereum && ethereum.isCoinbaseBrowser) {
                return ethereum;
            }
            return undefined;
        }
        catch (e) {
            return undefined;
        }
    }
    isCipherProvider(provider) {
        // @ts-expect-error isCipher walletlink property
        return typeof provider.isCipher === 'boolean' && provider.isCipher;
    }
}
exports.CoinbaseWalletSDK = CoinbaseWalletSDK;
CoinbaseWalletSDK.VERSION = version_1.LIB_VERSION;
