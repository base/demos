import type { Compute, OneOf } from '../types/utils.js';
export type ErrorType<name extends string = 'Error'> = Error & {
    name: name;
};
type BaseErrorOptions = Compute<OneOf<{
    details?: string | undefined;
} | {
    cause: BaseError | Error;
}> & {
    docsPath?: string | undefined;
    docsSlug?: string | undefined;
    metaMessages?: string[] | undefined;
}>;
export type BaseErrorType = BaseError & {
    name: 'WagmiCoreError';
};
export declare class BaseError extends Error {
    #private;
    details: string;
    docsPath?: string | undefined;
    metaMessages?: string[] | undefined;
    shortMessage: string;
    name: string;
    get docsBaseUrl(): string;
    get version(): string;
    constructor(shortMessage: string, options?: BaseErrorOptions);
    walk(fn?: (err: unknown) => boolean): unknown;
}
export {};
//# sourceMappingURL=base.d.ts.map