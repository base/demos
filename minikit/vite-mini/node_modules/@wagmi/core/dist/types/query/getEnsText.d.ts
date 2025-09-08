import { type GetEnsTextParameters, type GetEnsTextReturnType } from '../actions/getEnsText.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetEnsTextOptions<config extends Config> = Compute<ExactPartial<GetEnsTextParameters<config>> & ScopeKeyParameter>;
export declare function getEnsTextQueryOptions<config extends Config>(config: config, options?: GetEnsTextOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["ensText", {
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            name?: string | undefined;
            gatewayUrls?: string[] | undefined | undefined;
            key?: string | undefined;
            strict?: boolean | undefined | undefined;
            universalResolverAddress?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetEnsTextReturnType>;
    readonly queryKey: readonly ["ensText", {
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        name?: string | undefined;
        gatewayUrls?: string[] | undefined | undefined;
        key?: string | undefined;
        strict?: boolean | undefined | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetEnsTextQueryFnData = GetEnsTextReturnType;
export type GetEnsTextData = GetEnsTextQueryFnData;
export declare function getEnsTextQueryKey<config extends Config>(options?: GetEnsTextOptions<config>): readonly ["ensText", {
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    name?: string | undefined;
    gatewayUrls?: string[] | undefined | undefined;
    key?: string | undefined;
    strict?: boolean | undefined | undefined;
    universalResolverAddress?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetEnsTextQueryKey<config extends Config> = ReturnType<typeof getEnsTextQueryKey<config>>;
//# sourceMappingURL=getEnsText.d.ts.map