import type { FeeValuesType } from 'viem';
import { type EstimateFeesPerGasParameters, type EstimateFeesPerGasReturnType } from '../actions/estimateFeesPerGas.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type EstimateFeesPerGasOptions<type extends FeeValuesType, config extends Config> = Compute<ExactPartial<EstimateFeesPerGasParameters<type, config>> & ScopeKeyParameter>;
export declare function estimateFeesPerGasQueryOptions<config extends Config, type extends FeeValuesType = 'eip1559'>(config: config, options?: EstimateFeesPerGasOptions<type, config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["estimateFeesPerGas", {
            type?: FeeValuesType | type | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            formatUnits?: import("../types/unit.js").Unit | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<EstimateFeesPerGasReturnType<type>>;
    readonly queryKey: readonly ["estimateFeesPerGas", {
        type?: FeeValuesType | type | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        formatUnits?: import("../types/unit.js").Unit | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type EstimateFeesPerGasQueryFnData<type extends FeeValuesType> = EstimateFeesPerGasReturnType<type>;
export type EstimateFeesPerGasData<type extends FeeValuesType> = EstimateFeesPerGasQueryFnData<type>;
export declare function estimateFeesPerGasQueryKey<config extends Config, type extends FeeValuesType = 'eip1559'>(options?: EstimateFeesPerGasOptions<type, config>): readonly ["estimateFeesPerGas", {
    type?: FeeValuesType | type | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    formatUnits?: import("../types/unit.js").Unit | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type EstimateFeesPerGasQueryKey<config extends Config, type extends FeeValuesType> = ReturnType<typeof estimateFeesPerGasQueryKey<config, type>>;
//# sourceMappingURL=estimateFeesPerGas.d.ts.map