import { type GetFeeHistoryParameters, type GetFeeHistoryReturnType } from '../actions/getFeeHistory.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, PartialBy } from '../types/utils.js';
export type GetFeeHistoryOptions<config extends Config, chainId extends config['chains'][number]['id']> = Compute<PartialBy<GetFeeHistoryParameters<config, chainId>, 'blockCount' | 'rewardPercentiles'> & ScopeKeyParameter>;
export declare function getFeeHistoryQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetFeeHistoryOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["feeHistory", {
            blockCount?: number | undefined;
            rewardPercentiles?: number[] | undefined;
            chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
            blockNumber?: bigint | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetFeeHistoryReturnType>;
    readonly queryKey: readonly ["feeHistory", {
        blockCount?: number | undefined;
        rewardPercentiles?: number[] | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetFeeHistoryQueryFnData = GetFeeHistoryReturnType;
export type GetFeeHistoryData = GetFeeHistoryQueryFnData;
export declare function getFeeHistoryQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options?: GetFeeHistoryOptions<config, chainId>): readonly ["feeHistory", {
    blockCount?: number | undefined;
    rewardPercentiles?: number[] | undefined;
    chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
    blockNumber?: bigint | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetFeeHistoryQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getFeeHistoryQueryKey<config, chainId>>;
//# sourceMappingURL=getFeeHistory.d.ts.map