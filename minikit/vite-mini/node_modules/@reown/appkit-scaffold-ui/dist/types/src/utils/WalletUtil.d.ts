import type { ConnectMethod, Connector, Features, WcWallet } from '@reown/appkit-controllers';
interface AppKitWallet extends WcWallet {
    installed: boolean;
}
export declare const WalletUtil: {
    filterOutDuplicatesByRDNS(wallets: WcWallet[]): WcWallet[];
    filterOutDuplicatesByIds(wallets: WcWallet[]): WcWallet[];
    filterOutDuplicateWallets(wallets: WcWallet[]): WcWallet[];
    markWalletsAsInstalled(wallets: WcWallet[]): AppKitWallet[];
    getConnectOrderMethod(_features: Features | undefined, _connectors: Connector[]): ConnectMethod[];
    isExcluded(wallet: WcWallet): boolean;
};
export {};
