import { type GetBalanceParameters, type GetBalanceReturnType } from '../actions/getBalance.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, PartialBy } from '../types/utils.js';
export type GetBalanceOptions<config extends Config> = Compute<PartialBy<GetBalanceParameters<config>, 'address'> & ScopeKeyParameter>;
export declare function getBalanceQueryOptions<config extends Config>(config: config, options?: GetBalanceOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["balance", {
            address?: `0x${string}` | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            blockNumber?: bigint | undefined | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            token?: `0x${string}` | undefined;
            unit?: import("../types/unit.js").Unit | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<GetBalanceReturnType>;
    readonly queryKey: readonly ["balance", {
        address?: `0x${string}` | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        blockNumber?: bigint | undefined | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        token?: `0x${string}` | undefined;
        unit?: import("../types/unit.js").Unit | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type GetBalanceQueryFnData = Compute<GetBalanceReturnType>;
export type GetBalanceData = GetBalanceQueryFnData;
export declare function getBalanceQueryKey<config extends Config>(options?: GetBalanceOptions<config>): readonly ["balance", {
    address?: `0x${string}` | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    blockNumber?: bigint | undefined | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    token?: `0x${string}` | undefined;
    unit?: import("../types/unit.js").Unit | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetBalanceQueryKey<config extends Config> = ReturnType<typeof getBalanceQueryKey<config>>;
//# sourceMappingURL=getBalance.d.ts.map