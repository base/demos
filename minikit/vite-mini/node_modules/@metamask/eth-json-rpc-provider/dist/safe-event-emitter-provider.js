"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _SafeEventEmitterProvider_engine;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeEventEmitterProvider = void 0;
const safe_event_emitter_1 = __importDefault(require("@metamask/safe-event-emitter"));
/**
 * An Ethereum provider.
 *
 * This provider loosely follows conventions that pre-date EIP-1193.
 * It is not compliant with any Ethereum provider standard.
 */
class SafeEventEmitterProvider extends safe_event_emitter_1.default {
    /**
     * Construct a SafeEventEmitterProvider from a JSON-RPC engine.
     *
     * @param options - Options.
     * @param options.engine - The JSON-RPC engine used to process requests.
     */
    constructor({ engine }) {
        super();
        _SafeEventEmitterProvider_engine.set(this, void 0);
        /**
         * Send a provider request asynchronously.
         *
         * @param req - The request to send.
         * @param callback - A function that is called upon the success or failure of the request.
         */
        this.sendAsync = (req, callback) => {
            __classPrivateFieldGet(this, _SafeEventEmitterProvider_engine, "f").handle(req, callback);
        };
        /**
         * Send a provider request asynchronously.
         *
         * This method serves the same purpose as `sendAsync`. It only exists for
         * legacy reasons.
         *
         * @deprecated Use `sendAsync` instead.
         * @param req - The request to send.
         * @param callback - A function that is called upon the success or failure of the request.
         */
        this.send = (req, callback) => {
            if (typeof callback !== 'function') {
                throw new Error('Must provide callback to "send" method.');
            }
            __classPrivateFieldGet(this, _SafeEventEmitterProvider_engine, "f").handle(req, callback);
        };
        __classPrivateFieldSet(this, _SafeEventEmitterProvider_engine, engine, "f");
        if (engine.on) {
            engine.on('notification', (message) => {
                this.emit('data', null, message);
            });
        }
    }
}
exports.SafeEventEmitterProvider = SafeEventEmitterProvider;
_SafeEventEmitterProvider_engine = new WeakMap();
//# sourceMappingURL=safe-event-emitter-provider.js.map