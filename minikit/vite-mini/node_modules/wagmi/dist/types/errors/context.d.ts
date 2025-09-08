import { BaseError } from './base.js';
export type WagmiProviderNotFoundErrorType = WagmiProviderNotFoundError & {
    name: 'WagmiProviderNotFoundError';
};
export declare class WagmiProviderNotFoundError extends BaseError {
    name: string;
    constructor();
}
//# sourceMappingURL=context.d.ts.map