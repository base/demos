import { type ChainNamespace } from '@reown/appkit-common';
export declare const CUSTOM_DEEPLINK_WALLETS: {
    PHANTOM: {
        id: string;
        url: string;
    };
    SOLFLARE: {
        id: string;
        url: string;
    };
    COINBASE: {
        id: string;
        url: string;
    };
};
export declare const MobileWalletUtil: {
    /**
     * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
     *
     * @param {string} id - The id of the wallet.
     * @param {ChainNamespace} namespace - The namespace of the chain.
     */
    handleMobileDeeplinkRedirect(id: string, namespace: ChainNamespace): void;
};
