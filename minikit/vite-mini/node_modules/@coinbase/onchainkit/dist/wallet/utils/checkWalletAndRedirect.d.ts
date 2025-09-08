/**
 * Phantom wallet uses dual injection:
 * - window.phantom object
 * - window.ethereum.isPhantom flag (when active)
 * This interface adds type safety for the non-standard window.phantom property.
 */
export interface WindowWithPhantom extends Window {
    phantom?: {
        ethereum?: {
            isPhantom?: boolean;
        };
    };
}
export declare function isWalletInstalled(walletType: string): boolean;
/**
 * Wallet installation URLs
 * Note: MetaMask and Coinbase Wallet are not included here as they have built-in
 * redirection mechanisms in their connectors.
 */
export declare const WALLET_INSTALL_URLS: Record<string, string>;
export declare function redirectToWalletInstall(walletType: string): boolean;
/**
 * Check if the wallet is installed, and redirect to installation page if not
 */
export declare function checkWalletAndRedirect(walletType: string): boolean;
//# sourceMappingURL=checkWalletAndRedirect.d.ts.map