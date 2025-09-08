import { getCoinbaseInjectedProvider } from './util/provider.js';
import { CoinbaseWalletProvider } from './CoinbaseWalletProvider.js';
export function createCoinbaseWalletProvider(options) {
    var _a;
    const params = {
        metadata: options.metadata,
        preference: options.preference,
    };
    return (_a = getCoinbaseInjectedProvider(params)) !== null && _a !== void 0 ? _a : new CoinbaseWalletProvider(params);
}
//# sourceMappingURL=createCoinbaseWalletProvider.js.map