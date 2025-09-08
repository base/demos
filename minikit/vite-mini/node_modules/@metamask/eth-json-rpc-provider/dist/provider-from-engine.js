"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerFromEngine = void 0;
const safe_event_emitter_provider_1 = require("./safe-event-emitter-provider");
/**
 * Construct an Ethereum provider from the given JSON-RPC engine.
 *
 * @param engine - The JSON-RPC engine to construct a provider from.
 * @returns An Ethereum provider.
 */
function providerFromEngine(engine) {
    return new safe_event_emitter_provider_1.SafeEventEmitterProvider({ engine });
}
exports.providerFromEngine = providerFromEngine;
//# sourceMappingURL=provider-from-engine.js.map