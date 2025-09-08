import { type EIP1193Provider, type ProviderConnectInfo } from 'viem';
import type { Compute } from '../types/utils.js';
export type InjectedParameters = {
    /**
     * Some injected providers do not support programmatic disconnect.
     * This flag simulates the disconnect behavior by keeping track of connection status in storage.
     * @default true
     */
    shimDisconnect?: boolean | undefined;
    /**
     * [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target
     */
    target?: TargetId | Target | (() => Target | undefined) | undefined;
    unstable_shimAsyncInject?: boolean | number | undefined;
};
export declare function injected(parameters?: InjectedParameters): import("./createConnector.js").CreateConnectorFn<{
    on: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
    removeListener: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
    request: import("viem").EIP1193RequestFn<import("viem").EIP1474Methods>;
    isApexWallet?: true | undefined;
    isAvalanche?: true | undefined;
    isBackpack?: true | undefined;
    isBifrost?: true | undefined;
    isBitKeep?: true | undefined;
    isBitski?: true | undefined;
    isBlockWallet?: true | undefined;
    isBraveWallet?: true | undefined;
    isCoinbaseWallet?: true | undefined;
    isDawn?: true | undefined;
    isEnkrypt?: true | undefined;
    isExodus?: true | undefined;
    isFrame?: true | undefined;
    isFrontier?: true | undefined;
    isGamestop?: true | undefined;
    isHyperPay?: true | undefined;
    isImToken?: true | undefined;
    isKuCoinWallet?: true | undefined;
    isMathWallet?: true | undefined;
    isMetaMask?: true | undefined;
    isOkxWallet?: true | undefined;
    isOKExWallet?: true | undefined;
    isOneInchAndroidWallet?: true | undefined;
    isOneInchIOSWallet?: true | undefined;
    isOpera?: true | undefined;
    isPhantom?: true | undefined;
    isPortal?: true | undefined;
    isRabby?: true | undefined;
    isRainbow?: true | undefined;
    isStatus?: true | undefined;
    isTally?: true | undefined;
    isTokenPocket?: true | undefined;
    isTokenary?: true | undefined;
    isTrust?: true | undefined;
    isTrustWallet?: true | undefined;
    isUniswapWallet?: true | undefined;
    isXDEFI?: true | undefined;
    isZerion?: true | undefined;
    providers?: WalletProvider[] | undefined
    /** Only exists in MetaMask as of 2022/04/03 */
     | undefined;
    _events?: {
        connect?: (() => void) | undefined;
    } | undefined
    /** Only exists in MetaMask as of 2022/04/03 */
     | undefined;
    _state?: {
        accounts?: string[];
        initialized?: boolean;
        isConnected?: boolean;
        isPermanentlyDisconnected?: boolean;
        isUnlocked?: boolean;
    } | undefined | undefined;
} | undefined, {
    onConnect(connectInfo: ProviderConnectInfo): void;
}, {
    [x: `${string}.disconnected`]: true;
    "injected.connected": true;
}>;
export declare namespace injected {
    var type: "injected";
}
type Target = {
    icon?: string | undefined;
    id: string;
    name: string;
    provider: WalletProviderFlags | WalletProvider | ((window?: Window | undefined) => WalletProvider | undefined);
};
/** @deprecated */
type TargetId = Compute<WalletProviderFlags> extends `is${infer name}` ? name extends `${infer char}${infer rest}` ? `${Lowercase<char>}${rest}` : never : never;
/**
 * @deprecated As of 2024/10/16, we are no longer accepting new provider flags as EIP-6963 should be used instead.
 */
type WalletProviderFlags = 'isApexWallet' | 'isAvalanche' | 'isBackpack' | 'isBifrost' | 'isBitKeep' | 'isBitski' | 'isBlockWallet' | 'isBraveWallet' | 'isCoinbaseWallet' | 'isDawn' | 'isEnkrypt' | 'isExodus' | 'isFrame' | 'isFrontier' | 'isGamestop' | 'isHyperPay' | 'isImToken' | 'isKuCoinWallet' | 'isMathWallet' | 'isMetaMask' | 'isOkxWallet' | 'isOKExWallet' | 'isOneInchAndroidWallet' | 'isOneInchIOSWallet' | 'isOpera' | 'isPhantom' | 'isPortal' | 'isRabby' | 'isRainbow' | 'isStatus' | 'isTally' | 'isTokenPocket' | 'isTokenary' | 'isTrust' | 'isTrustWallet' | 'isUniswapWallet' | 'isXDEFI' | 'isZerion';
type WalletProvider = Compute<EIP1193Provider & {
    [key in WalletProviderFlags]?: true | undefined;
} & {
    providers?: WalletProvider[] | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _events?: {
        connect?: (() => void) | undefined;
    } | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?: {
        accounts?: string[];
        initialized?: boolean;
        isConnected?: boolean;
        isPermanentlyDisconnected?: boolean;
        isUnlocked?: boolean;
    } | undefined;
}>;
type Window = {
    coinbaseWalletExtension?: WalletProvider | undefined;
    ethereum?: WalletProvider | undefined;
    phantom?: {
        ethereum: WalletProvider;
    } | undefined;
};
export {};
//# sourceMappingURL=injected.d.ts.map