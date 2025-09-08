import { BaseError } from './base.js';
export class ProviderNotFoundError extends BaseError {
    constructor() {
        super('Provider not found.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ProviderNotFoundError'
        });
    }
}
export class SwitchChainNotSupportedError extends BaseError {
    constructor({ connector }) {
        super(`"${connector.name}" does not support programmatic chain switching.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SwitchChainNotSupportedError'
        });
    }
}
//# sourceMappingURL=connector.js.map