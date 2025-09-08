import { LogoType } from './assets/wallet-logo.js';
import { AppMetadata, Preference, ProviderInterface } from './core/provider/interface.js';
type CoinbaseWalletSDKOptions = Partial<AppMetadata>;
/**
 * CoinbaseWalletSDK
 *
 * @deprecated CoinbaseWalletSDK is deprecated and will likely be removed in a future major version release.
 * It's recommended to use `createCoinbaseWalletSDK` instead.
 */
export declare class CoinbaseWalletSDK {
    private metadata;
    constructor(metadata: Readonly<CoinbaseWalletSDKOptions>);
    makeWeb3Provider(preference?: Preference): ProviderInterface;
    /**
     * Official Coinbase Wallet logo for developers to use on their frontend
     * @param type Type of wallet logo: "standard" | "circle" | "text" | "textWithLogo" | "textLight" | "textWithLogoLight"
     * @param width Width of the logo (Optional)
     * @returns SVG Data URI
     */
    getCoinbaseWalletLogo(type: LogoType, width?: number): string;
}
export {};
//# sourceMappingURL=CoinbaseWalletSDK.d.ts.map