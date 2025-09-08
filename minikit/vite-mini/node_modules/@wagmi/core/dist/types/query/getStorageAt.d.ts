import { type GetStorageAtParameters, type GetStorageAtReturnType } from '../actions/getStorageAt.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetStorageAtOptions<config extends Config> = Compute<ExactPartial<GetStorageAtParameters<config>> & ScopeKeyParameter>;
export declare function getStorageAtQueryOptions<config extends Config>(config: config, options?: GetStorageAtOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["getStorageAt", GetStorageAtOptions<config>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetStorageAtReturnType>;
    readonly queryKey: readonly ["getStorageAt", GetStorageAtOptions<config>];
};
export type GetStorageAtQueryFnData = GetStorageAtReturnType;
export type GetStorageAtData = GetStorageAtQueryFnData;
export declare function getStorageAtQueryKey<config extends Config>(options: GetStorageAtOptions<config>): readonly ["getStorageAt", GetStorageAtOptions<config>];
export type GetStorageAtQueryKey<config extends Config> = ReturnType<typeof getStorageAtQueryKey<config>>;
//# sourceMappingURL=getStorageAt.d.ts.map