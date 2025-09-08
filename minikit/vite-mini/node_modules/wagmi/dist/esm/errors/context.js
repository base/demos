import { BaseError } from './base.js';
export class WagmiProviderNotFoundError extends BaseError {
    constructor() {
        super('`useConfig` must be used within `WagmiProvider`.', {
            docsPath: '/api/WagmiProvider',
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'WagmiProviderNotFoundError'
        });
    }
}
//# sourceMappingURL=context.js.map