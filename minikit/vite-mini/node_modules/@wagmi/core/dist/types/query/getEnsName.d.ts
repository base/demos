import { type GetEnsNameParameters, type GetEnsNameReturnType } from '../actions/getEnsName.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetEnsNameOptions<config extends Config> = Compute<ExactPartial<GetEnsNameParameters<config>> & ScopeKeyParameter>;
export declare function getEnsNameQueryOptions<config extends Config>(config: config, options?: GetEnsNameOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["ensName", {
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            address?: `0x${string}` | undefined;
            gatewayUrls?: string[] | undefined | undefined;
            strict?: boolean | undefined | undefined;
            universalResolverAddress?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetEnsNameReturnType>;
    readonly queryKey: readonly ["ensName", {
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        address?: `0x${string}` | undefined;
        gatewayUrls?: string[] | undefined | undefined;
        strict?: boolean | undefined | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetEnsNameQueryFnData = GetEnsNameReturnType;
export type GetEnsNameData = GetEnsNameQueryFnData;
export declare function getEnsNameQueryKey<config extends Config>(options?: GetEnsNameOptions<config>): readonly ["ensName", {
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    address?: `0x${string}` | undefined;
    gatewayUrls?: string[] | undefined | undefined;
    strict?: boolean | undefined | undefined;
    universalResolverAddress?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetEnsNameQueryKey<config extends Config> = ReturnType<typeof getEnsNameQueryKey<config>>;
//# sourceMappingURL=getEnsName.d.ts.map