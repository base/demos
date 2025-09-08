"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.story = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.story = (0, defineChain_js_1.defineChain)({
    id: 1514,
    name: 'Story',
    nativeCurrency: {
        decimals: 18,
        name: 'IP Token',
        symbol: 'IP',
    },
    rpcUrls: {
        default: { http: ['https://mainnet.storyrpc.io'] },
    },
    testnet: false,
});
//# sourceMappingURL=story.js.map