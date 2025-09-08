"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileRelay = void 0;
const util_1 = require("../../core/util");
const WalletLinkRelay_1 = require("../walletlink/WalletLinkRelay");
const MobileRelayUI_1 = require("./MobileRelayUI");
class MobileRelay extends WalletLinkRelay_1.WalletLinkRelay {
    constructor(options) {
        var _a;
        super(options);
        this._enableMobileWalletLink = (_a = options.enableMobileWalletLink) !== null && _a !== void 0 ? _a : false;
    }
    // override
    requestEthereumAccounts() {
        if (this._enableMobileWalletLink) {
            return super.requestEthereumAccounts();
        }
        // TODO: Implement & present in-page wallet picker instead of navigating to www.coinbase.com/connect-dapp
        return {
            promise: new Promise(() => {
                const location = (0, util_1.getLocation)();
                location.href = `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(location.href)}`;
            }),
            cancel: () => { },
        };
    }
    // override
    publishWeb3RequestEvent(id, request) {
        super.publishWeb3RequestEvent(id, request);
        if (!(this._enableMobileWalletLink && this.ui instanceof MobileRelayUI_1.MobileRelayUI))
            return;
        let navigatedToCBW = false;
        // For mobile relay requests, open the Coinbase Wallet app
        switch (request.method) {
            case 'requestEthereumAccounts':
            case 'connectAndSignIn':
                navigatedToCBW = true;
                this.ui.openCoinbaseWalletDeeplink(this.getQRCodeUrl());
                break;
            case 'switchEthereumChain':
                // switchEthereumChain doesn't need to open the app
                return;
            default:
                navigatedToCBW = true;
                this.ui.openCoinbaseWalletDeeplink();
                break;
        }
        // If the user navigated to the Coinbase Wallet app, then we need to check
        // for unseen events once the user returns to the browser
        if (navigatedToCBW) {
            window.addEventListener('blur', () => {
                window.addEventListener('focus', () => {
                    this.connection.checkUnseenEvents();
                }, { once: true });
            }, { once: true });
        }
    }
    // override
    handleWeb3ResponseMessage(message) {
        super.handleWeb3ResponseMessage(message);
    }
    connectAndSignIn(params) {
        if (!this._enableMobileWalletLink) {
            throw new Error('connectAndSignIn is supported only when enableMobileWalletLink is on');
        }
        return this.sendRequest({
            method: 'connectAndSignIn',
            params: {
                appName: this.appName,
                appLogoUrl: this.appLogoUrl,
                domain: window.location.hostname,
                aud: window.location.href,
                version: '1',
                type: 'eip4361',
                nonce: params.nonce,
                iat: new Date().toISOString(),
                chainId: `eip155:${this.dappDefaultChain}`,
                statement: params.statement,
                resources: params.resources,
            },
        });
    }
}
exports.MobileRelay = MobileRelay;
