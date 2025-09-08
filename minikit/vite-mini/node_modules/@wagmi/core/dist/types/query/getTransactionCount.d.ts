import { type GetTransactionCountParameters, type GetTransactionCountReturnType } from '../actions/getTransactionCount.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, PartialBy } from '../types/utils.js';
export type GetTransactionCountOptions<config extends Config> = Compute<PartialBy<GetTransactionCountParameters<config>, 'address'> & ScopeKeyParameter>;
export declare function getTransactionCountQueryOptions<config extends Config>(config: config, options?: GetTransactionCountOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["transactionCount", {
            address?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<number>;
    readonly queryKey: readonly ["transactionCount", {
        address?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetTransactionCountQueryFnData = Compute<GetTransactionCountReturnType>;
export type GetTransactionCountData = GetTransactionCountQueryFnData;
export declare function getTransactionCountQueryKey<config extends Config>(options?: GetTransactionCountOptions<config>): readonly ["transactionCount", {
    address?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetTransactionCountQueryKey<config extends Config> = ReturnType<typeof getTransactionCountQueryKey<config>>;
//# sourceMappingURL=getTransactionCount.d.ts.map