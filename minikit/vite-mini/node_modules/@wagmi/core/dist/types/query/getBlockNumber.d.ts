import { type GetBlockNumberParameters, type GetBlockNumberReturnType } from '../actions/getBlockNumber.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetBlockNumberOptions<config extends Config, chainId extends config['chains'][number]['id']> = Compute<ExactPartial<GetBlockNumberParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getBlockNumberQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetBlockNumberOptions<config, chainId>): {
    readonly gcTime: 0;
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["blockNumber", {
            cacheTime?: number | undefined | undefined;
            chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<bigint>;
    readonly queryKey: readonly ["blockNumber", {
        cacheTime?: number | undefined | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetBlockNumberQueryFnData = GetBlockNumberReturnType;
export type GetBlockNumberData = GetBlockNumberQueryFnData;
export declare function getBlockNumberQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options?: GetBlockNumberOptions<config, chainId>): readonly ["blockNumber", {
    cacheTime?: number | undefined | undefined;
    chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetBlockNumberQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getBlockNumberQueryKey<config, chainId>>;
//# sourceMappingURL=getBlockNumber.d.ts.map