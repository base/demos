import { type GetEnsAddressParameters, type GetEnsAddressReturnType } from '../actions/getEnsAddress.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetEnsAddressOptions<config extends Config> = Compute<ExactPartial<GetEnsAddressParameters<config>> & ScopeKeyParameter>;
export declare function getEnsAddressQueryOptions<config extends Config>(config: config, options?: GetEnsAddressOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["ensAddress", {
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            coinType?: number | undefined | undefined;
            gatewayUrls?: string[] | undefined | undefined;
            name?: string | undefined;
            strict?: boolean | undefined | undefined;
            universalResolverAddress?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetEnsAddressReturnType>;
    readonly queryKey: readonly ["ensAddress", {
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        coinType?: number | undefined | undefined;
        gatewayUrls?: string[] | undefined | undefined;
        name?: string | undefined;
        strict?: boolean | undefined | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetEnsAddressQueryFnData = GetEnsAddressReturnType;
export type GetEnsAddressData = GetEnsAddressQueryFnData;
export declare function getEnsAddressQueryKey<config extends Config>(options?: GetEnsAddressOptions<config>): readonly ["ensAddress", {
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    coinType?: number | undefined | undefined;
    gatewayUrls?: string[] | undefined | undefined;
    name?: string | undefined;
    strict?: boolean | undefined | undefined;
    universalResolverAddress?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetEnsAddressQueryKey<config extends Config> = ReturnType<typeof getEnsAddressQueryKey<config>>;
//# sourceMappingURL=getEnsAddress.d.ts.map