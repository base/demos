import type { Connector } from '../createConfig.js';
import { BaseError } from './base.js';
export type ProviderNotFoundErrorType = ProviderNotFoundError & {
    name: 'ProviderNotFoundError';
};
export declare class ProviderNotFoundError extends BaseError {
    name: string;
    constructor();
}
export type SwitchChainNotSupportedErrorType = SwitchChainNotSupportedError & {
    name: 'SwitchChainNotSupportedError';
};
export declare class SwitchChainNotSupportedError extends BaseError {
    name: string;
    constructor({ connector }: {
        connector: Connector;
    });
}
//# sourceMappingURL=connector.d.ts.map