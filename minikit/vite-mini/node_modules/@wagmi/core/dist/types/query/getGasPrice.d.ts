import { type GetGasPriceParameters, type GetGasPriceReturnType } from '../actions/getGasPrice.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetGasPriceOptions<config extends Config, chainId extends config['chains'][number]['id']> = Compute<ExactPartial<GetGasPriceParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getGasPriceQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetGasPriceOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["gasPrice", {
            chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<bigint>;
    readonly queryKey: readonly ["gasPrice", {
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetGasPriceQueryFnData = GetGasPriceReturnType;
export type GetGasPriceData = GetGasPriceQueryFnData;
export declare function getGasPriceQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options?: GetGasPriceOptions<config, chainId>): readonly ["gasPrice", {
    chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetGasPriceQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getGasPriceQueryKey<config, chainId>>;
//# sourceMappingURL=getGasPrice.d.ts.map