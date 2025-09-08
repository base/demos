/**
 * Serializes an error to a format that is compatible with the Ethereum JSON RPC error format.
 * See https://docs.cloud.coinbase.com/wallet-sdk/docs/errors
 * for more information.
 */
export declare function serializeError(error: unknown): {
    docUrl: string;
    code: number;
    message: string;
    data?: unknown;
    stack?: string;
};
//# sourceMappingURL=serialize.d.ts.map