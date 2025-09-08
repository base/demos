import { type GetEnsAvatarParameters, type GetEnsAvatarReturnType } from '../actions/getEnsAvatar.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetEnsAvatarOptions<config extends Config> = Compute<ExactPartial<GetEnsAvatarParameters<config>> & ScopeKeyParameter>;
export declare function getEnsAvatarQueryOptions<config extends Config>(config: config, options?: GetEnsAvatarOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["ensAvatar", {
            name?: string | undefined;
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            gatewayUrls?: string[] | undefined | undefined;
            strict?: boolean | undefined | undefined;
            universalResolverAddress?: `0x${string}` | undefined;
            assetGatewayUrls?: import("viem").AssetGatewayUrls | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetEnsAvatarReturnType>;
    readonly queryKey: readonly ["ensAvatar", {
        name?: string | undefined;
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        gatewayUrls?: string[] | undefined | undefined;
        strict?: boolean | undefined | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
        assetGatewayUrls?: import("viem").AssetGatewayUrls | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetEnsAvatarQueryFnData = GetEnsAvatarReturnType;
export type GetEnsAvatarData = GetEnsAvatarQueryFnData;
export declare function getEnsAvatarQueryKey<config extends Config>(options?: GetEnsAvatarOptions<config>): readonly ["ensAvatar", {
    name?: string | undefined;
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    gatewayUrls?: string[] | undefined | undefined;
    strict?: boolean | undefined | undefined;
    universalResolverAddress?: `0x${string}` | undefined;
    assetGatewayUrls?: import("viem").AssetGatewayUrls | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetEnsAvatarQueryKey<config extends Config> = ReturnType<typeof getEnsAvatarQueryKey<config>>;
//# sourceMappingURL=getEnsAvatar.d.ts.map