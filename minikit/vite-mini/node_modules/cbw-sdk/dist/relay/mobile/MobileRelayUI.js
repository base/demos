"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileRelayUI = void 0;
const RedirectDialog_1 = require("../walletlink/ui/components/RedirectDialog/RedirectDialog");
// TODO: Implement & present in-page wallet picker instead of navigating to www.coinbase.com/connect-dapp
class MobileRelayUI {
    constructor(options) {
        this.attached = false;
        this.darkMode = false;
        this.redirectDialog = new RedirectDialog_1.RedirectDialog();
        this.darkMode = options.darkMode;
    }
    attach() {
        if (this.attached) {
            throw new Error('Coinbase Wallet SDK UI is already attached');
        }
        this.redirectDialog.attach();
        this.attached = true;
    }
    setConnected(_connected) { } // no-op
    redirectToCoinbaseWallet(walletLinkUrl) {
        const url = new URL('https://go.cb-w.com/walletlink');
        url.searchParams.append('redirect_url', window.location.href);
        if (walletLinkUrl) {
            url.searchParams.append('wl_url', walletLinkUrl);
        }
        const anchorTag = document.createElement('a');
        anchorTag.target = 'cbw-opener';
        anchorTag.href = url.href;
        anchorTag.rel = 'noreferrer noopener';
        anchorTag.click();
    }
    openCoinbaseWalletDeeplink(walletLinkUrl) {
        this.redirectDialog.present({
            title: 'Redirecting to Coinbase Wallet...',
            buttonText: 'Open',
            darkMode: this.darkMode,
            onButtonClick: () => {
                this.redirectToCoinbaseWallet(walletLinkUrl);
            },
        });
        setTimeout(() => {
            this.redirectToCoinbaseWallet(walletLinkUrl);
        }, 99);
    }
    showConnecting(_options) {
        // it uses the return callback to clear the dialog
        return () => {
            this.redirectDialog.clear();
        };
    }
    hideRequestEthereumAccounts() {
        this.redirectDialog.clear();
    }
    // -- Methods below are not needed for mobile
    requestEthereumAccounts() { } // no-op
    addEthereumChain() { } // no-op
    watchAsset() { } // no-op
    selectProvider() { } // no-op
    switchEthereumChain() { } // no-op
    signEthereumMessage() { } // no-op
    signEthereumTransaction() { } // no-op
    submitEthereumTransaction() { } // no-op
    ethereumAddressFromSignedMessage() { } // no-op
    reloadUI() { } // no-op
    setStandalone() { } // no-op
    setConnectDisabled() { } // no-op
    inlineAccountsResponse() {
        return false;
    }
    inlineAddEthereumChain() {
        return false;
    }
    inlineWatchAsset() {
        return false;
    }
    inlineSwitchEthereumChain() {
        return false;
    }
    isStandalone() {
        return false;
    }
}
exports.MobileRelayUI = MobileRelayUI;
