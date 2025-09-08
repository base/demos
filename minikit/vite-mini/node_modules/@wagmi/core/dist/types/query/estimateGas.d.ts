import { type EstimateGasParameters, type EstimateGasReturnType } from '../actions/estimateGas.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { UnionExactPartial } from '../types/utils.js';
export type EstimateGasOptions<config extends Config, chainId extends config['chains'][number]['id'] | undefined> = UnionExactPartial<EstimateGasParameters<config, chainId>> & ScopeKeyParameter;
export declare function estimateGasQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: EstimateGasOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["estimateGas", Omit<EstimateGasOptions<config, chainId>, "connector">];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<bigint>;
    readonly queryKey: readonly ["estimateGas", Omit<EstimateGasOptions<config, chainId>, "connector">];
};
export type EstimateGasQueryFnData = EstimateGasReturnType;
export type EstimateGasData = EstimateGasQueryFnData;
export declare function estimateGasQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined>(options?: EstimateGasOptions<config, chainId>): readonly ["estimateGas", Omit<EstimateGasOptions<config, chainId>, "connector">];
export type EstimateGasQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined> = ReturnType<typeof estimateGasQueryKey<config, chainId>>;
//# sourceMappingURL=estimateGas.d.ts.map