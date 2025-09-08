import { type GetBlockTransactionCountParameters, type GetBlockTransactionCountReturnType } from '../actions/getBlockTransactionCount.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { ExactPartial, UnionCompute } from '../types/utils.js';
export type GetBlockTransactionCountOptions<config extends Config, chainId extends config['chains'][number]['id']> = UnionCompute<ExactPartial<GetBlockTransactionCountParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getBlockTransactionCountQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetBlockTransactionCountOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["blockTransactionCount", GetBlockTransactionCountOptions<config, chainId>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<number>;
    readonly queryKey: readonly ["blockTransactionCount", GetBlockTransactionCountOptions<config, config["chains"][number]["id"]>];
};
export type GetBlockTransactionCountQueryFnData = GetBlockTransactionCountReturnType;
export type GetBlockTransactionCountData = GetBlockTransactionCountQueryFnData;
export declare function getBlockTransactionCountQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options?: GetBlockTransactionCountOptions<config, chainId>): readonly ["blockTransactionCount", GetBlockTransactionCountOptions<config, chainId>];
export type GetBlockTransactionCountQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getBlockTransactionCountQueryKey<config, chainId>>;
//# sourceMappingURL=getBlockTransactionCount.d.ts.map