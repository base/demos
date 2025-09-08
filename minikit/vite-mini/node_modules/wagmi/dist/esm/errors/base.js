import { BaseError as CoreError } from '@wagmi/core';
import { getVersion } from '../utils/getVersion.js';
export class BaseError extends CoreError {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'WagmiError'
        });
    }
    get docsBaseUrl() {
        return 'https://wagmi.sh/react';
    }
    get version() {
        return getVersion();
    }
}
//# sourceMappingURL=base.js.map