"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerFromMiddleware = void 0;
const json_rpc_engine_1 = require("@metamask/json-rpc-engine");
const provider_from_engine_1 = require("./provider-from-engine");
/**
 * Construct an Ethereum provider from the given middleware.
 *
 * @param middleware - The middleware to construct a provider from.
 * @returns An Ethereum provider.
 */
function providerFromMiddleware(middleware) {
    const engine = new json_rpc_engine_1.JsonRpcEngine();
    engine.push(middleware);
    const provider = (0, provider_from_engine_1.providerFromEngine)(engine);
    return provider;
}
exports.providerFromMiddleware = providerFromMiddleware;
//# sourceMappingURL=provider-from-middleware.js.map