import { type EstimateMaxPriorityFeePerGasParameters, type EstimateMaxPriorityFeePerGasReturnType } from '../actions/estimateMaxPriorityFeePerGas.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type EstimateMaxPriorityFeePerGasOptions<config extends Config> = Compute<ExactPartial<EstimateMaxPriorityFeePerGasParameters<config>> & ScopeKeyParameter>;
export declare function estimateMaxPriorityFeePerGasQueryOptions<config extends Config>(config: config, options?: EstimateMaxPriorityFeePerGasOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["estimateMaxPriorityFeePerGas", {
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<bigint>;
    readonly queryKey: readonly ["estimateMaxPriorityFeePerGas", {
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type EstimateMaxPriorityFeePerGasQueryFnData = EstimateMaxPriorityFeePerGasReturnType;
export type EstimateMaxPriorityFeePerGasData = EstimateMaxPriorityFeePerGasQueryFnData;
export declare function estimateMaxPriorityFeePerGasQueryKey<config extends Config>(options?: EstimateMaxPriorityFeePerGasOptions<config>): readonly ["estimateMaxPriorityFeePerGas", {
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type EstimateMaxPriorityFeePerGasQueryKey<config extends Config> = ReturnType<typeof estimateMaxPriorityFeePerGasQueryKey<config>>;
//# sourceMappingURL=estimateMaxPriorityFeePerGas.d.ts.map