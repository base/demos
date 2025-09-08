import type { GetTransactionReceiptReturnType } from '../actions/getTransactionReceipt.js';
import { type GetTransactionReceiptParameters } from '../actions/getTransactionReceipt.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetTransactionReceiptOptions<config extends Config, chainId extends config['chains'][number]['id']> = Compute<ExactPartial<GetTransactionReceiptParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getTransactionReceiptQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetTransactionReceiptOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["getTransactionReceipt", {
            hash?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<(import("../types/chain.js").SelectChains<config, chainId> extends infer T_1 extends readonly import("viem").Chain[] ? { [key_1 in keyof T_1]: import("viem").ExtractChainFormatterReturnType<import("../types/utils.js").IsNarrowable<T_1[key_1], import("viem").Chain> extends true ? T_1[key_1] : undefined, "transactionReceipt", import("viem").TransactionReceipt> & {
        chainId: T_1[key_1]["id"];
    }; } : never)[number] extends infer T ? { [key in keyof T]: T[key]; } : never>;
    readonly queryKey: readonly ["getTransactionReceipt", {
        hash?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetTransactionReceiptQueryFnData<config extends Config, chainId extends config['chains'][number]['id']> = GetTransactionReceiptReturnType<config, chainId>;
export type GetTransactionReceiptData<config extends Config, chainId extends config['chains'][number]['id']> = GetTransactionReceiptQueryFnData<config, chainId>;
export declare function getTransactionReceiptQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options: GetTransactionReceiptOptions<config, chainId>): readonly ["getTransactionReceipt", {
    hash?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetTransactionReceiptQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getTransactionReceiptQueryKey<config, chainId>>;
//# sourceMappingURL=getTransactionReceipt.d.ts.map