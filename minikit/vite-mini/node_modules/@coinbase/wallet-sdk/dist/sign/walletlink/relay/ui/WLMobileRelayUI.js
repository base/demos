import { CBW_MOBILE_DEEPLINK_URL } from '../../../../core/constants.js';
import { RedirectDialog } from './components/RedirectDialog/RedirectDialog.js';
import { getLocation } from './components/util.js';
export class WLMobileRelayUI {
    constructor() {
        this.attached = false;
        this.redirectDialog = new RedirectDialog();
    }
    attach() {
        if (this.attached) {
            throw new Error('Coinbase Wallet SDK UI is already attached');
        }
        this.redirectDialog.attach();
        this.attached = true;
    }
    redirectToCoinbaseWallet(walletLinkUrl) {
        const url = new URL(CBW_MOBILE_DEEPLINK_URL);
        url.searchParams.append('redirect_url', getLocation().href);
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
        // redirect to coinbase wallet immediately to avoid Safari/Chrome popup(deeplink) blocking
        this.redirectToCoinbaseWallet(walletLinkUrl);
        setTimeout(() => {
            this.redirectDialog.present({
                title: 'Redirecting to Coinbase Wallet...',
                buttonText: 'Open',
                onButtonClick: () => {
                    this.redirectToCoinbaseWallet(walletLinkUrl);
                },
            });
        }, 99);
    }
    showConnecting(_options) {
        // it uses the return callback to clear the dialog
        return () => {
            this.redirectDialog.clear();
        };
    }
}
//# sourceMappingURL=WLMobileRelayUI.js.map