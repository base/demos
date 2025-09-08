import { createPublicClient, defineChain, http } from 'viem';
import { createBundlerClient } from 'viem/account-abstraction';
import { ChainClients } from './store.js';
export function createClients(chains) {
    chains.forEach((c) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!c.rpcUrl) {
            return;
        }
        const viemchain = defineChain({
            id: c.id,
            rpcUrls: {
                default: {
                    http: [c.rpcUrl],
                },
            },
            name: (_b = (_a = c.nativeCurrency) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
            nativeCurrency: {
                name: (_d = (_c = c.nativeCurrency) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '',
                symbol: (_f = (_e = c.nativeCurrency) === null || _e === void 0 ? void 0 : _e.symbol) !== null && _f !== void 0 ? _f : '',
                decimals: (_h = (_g = c.nativeCurrency) === null || _g === void 0 ? void 0 : _g.decimal) !== null && _h !== void 0 ? _h : 18,
            },
        });
        const client = createPublicClient({
            chain: viemchain,
            transport: http(c.rpcUrl),
        });
        const bundlerClient = createBundlerClient({
            client,
            transport: http(c.rpcUrl),
        });
        ChainClients.setState({
            [c.id]: {
                client,
                bundlerClient,
            },
        });
    });
}
export function getClient(chainId) {
    var _a;
    return (_a = ChainClients.getState()[chainId]) === null || _a === void 0 ? void 0 : _a.client;
}
export function getBundlerClient(chainId) {
    var _a;
    return (_a = ChainClients.getState()[chainId]) === null || _a === void 0 ? void 0 : _a.bundlerClient;
}
//# sourceMappingURL=utils.js.map