import { AppMetadata, Preference } from './core/provider/interface.js';
import { CoinbaseWalletProvider } from './CoinbaseWalletProvider.js';
export type CreateProviderOptions = {
    metadata: AppMetadata;
    preference: Preference;
};
export declare function createCoinbaseWalletProvider(options: CreateProviderOptions): import("./core/provider/interface.js").ProviderInterface | CoinbaseWalletProvider;
//# sourceMappingURL=createCoinbaseWalletProvider.d.ts.map