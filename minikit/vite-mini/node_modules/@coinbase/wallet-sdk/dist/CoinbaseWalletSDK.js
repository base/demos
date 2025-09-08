import { loadTelemetryScript } from './core/telemetry/initCCA.js';
import { getFavicon } from './core/type/util.js';
import { store } from './store/store.js';
import { checkCrossOriginOpenerPolicy } from './util/checkCrossOriginOpenerPolicy.js';
import { getCoinbaseInjectedProvider } from './util/provider.js';
import { validatePreferences } from './util/validatePreferences.js';
import { CoinbaseWalletProvider } from './CoinbaseWalletProvider.js';
import { walletLogo } from './assets/wallet-logo.js';
/**
 * CoinbaseWalletSDK
 *
 * @deprecated CoinbaseWalletSDK is deprecated and will likely be removed in a future major version release.
 * It's recommended to use `createCoinbaseWalletSDK` instead.
 */
export class CoinbaseWalletSDK {
    constructor(metadata) {
        void store.persist.rehydrate();
        this.metadata = {
            appName: metadata.appName || 'Dapp',
            appLogoUrl: metadata.appLogoUrl || getFavicon(),
            appChainIds: metadata.appChainIds || [],
        };
        store.config.set({
            metadata: this.metadata,
        });
        void checkCrossOriginOpenerPolicy();
    }
    makeWeb3Provider(preference = {
        options: 'all',
    }) {
        var _a;
        validatePreferences(preference);
        if (preference.telemetry !== false) {
            void loadTelemetryScript();
        }
        store.config.set({
            preference,
        });
        const params = { metadata: this.metadata, preference };
        return (_a = getCoinbaseInjectedProvider(params)) !== null && _a !== void 0 ? _a : new CoinbaseWalletProvider(params);
    }
    /**
     * Official Coinbase Wallet logo for developers to use on their frontend
     * @param type Type of wallet logo: "standard" | "circle" | "text" | "textWithLogo" | "textLight" | "textWithLogoLight"
     * @param width Width of the logo (Optional)
     * @returns SVG Data URI
     */
    getCoinbaseWalletLogo(type, width = 240) {
        return walletLogo(type, width);
    }
}
//# sourceMappingURL=CoinbaseWalletSDK.js.map