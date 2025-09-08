"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolanaWalletProvider = exports.SolanaConnection = void 0;
const web3_js_1 = require("@solana/web3.js");
Object.defineProperty(exports, "SolanaConnection", { enumerable: true, get: function () { return web3_js_1.Connection; } });
const createSolanaWalletProvider = (request) => ({
    request,
    signMessage: (msg) => request({ method: 'signMessage', params: { message: msg } }),
    signTransaction: (transaction) => request({ method: 'signTransaction', params: { transaction } }),
    signAndSendTransaction: (input) => request({
        method: 'signAndSendTransaction',
        params: input,
    }),
});
exports.createSolanaWalletProvider = createSolanaWalletProvider;
