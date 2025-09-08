import { type GetEnsResolverParameters, type GetEnsResolverReturnType } from '../actions/getEnsResolver.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetEnsResolverOptions<config extends Config> = Compute<ExactPartial<GetEnsResolverParameters<config>> & ScopeKeyParameter>;
export declare function getEnsResolverQueryOptions<config extends Config>(config: config, options?: GetEnsResolverOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["ensResolver", {
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            name?: string | undefined;
            universalResolverAddress?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<`0x${string}`>;
    readonly queryKey: readonly ["ensResolver", {
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        name?: string | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetEnsResolverQueryFnData = GetEnsResolverReturnType;
export type GetEnsResolverData = GetEnsResolverQueryFnData;
export declare function getEnsResolverQueryKey<config extends Config>(options?: GetEnsResolverOptions<config>): readonly ["ensResolver", {
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    name?: string | undefined;
    universalResolverAddress?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetEnsResolverQueryKey<config extends Config> = ReturnType<typeof getEnsResolverQueryKey<config>>;
//# sourceMappingURL=getEnsResolver.d.ts.map