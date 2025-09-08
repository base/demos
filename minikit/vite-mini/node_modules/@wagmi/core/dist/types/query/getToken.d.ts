import { type GetTokenParameters, type GetTokenReturnType } from '../actions/getToken.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetTokenOptions<config extends Config> = Compute<ExactPartial<GetTokenParameters<config>> & ScopeKeyParameter>;
export declare function getTokenQueryOptions<config extends Config>(config: config, options?: GetTokenOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["token", {
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            address?: `0x${string}` | undefined;
            formatUnits?: import("../types/unit.js").Unit | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<GetTokenReturnType>;
    readonly queryKey: readonly ["token", {
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        address?: `0x${string}` | undefined;
        formatUnits?: import("../types/unit.js").Unit | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetTokenQueryFnData = GetTokenReturnType;
export type GetTokenData = GetTokenQueryFnData;
export declare function getTokenQueryKey<config extends Config>(options?: GetTokenOptions<config>): readonly ["token", {
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    address?: `0x${string}` | undefined;
    formatUnits?: import("../types/unit.js").Unit | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetTokenQueryKey<config extends Config> = ReturnType<typeof getTokenQueryKey<config>>;
//# sourceMappingURL=getToken.d.ts.map