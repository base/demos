import { BaseError as CoreError } from '@wagmi/core';
export type BaseErrorType = BaseError & {
    name: 'WagmiError';
};
export declare class BaseError extends CoreError {
    name: string;
    get docsBaseUrl(): string;
    get version(): string;
}
//# sourceMappingURL=base.d.ts.map