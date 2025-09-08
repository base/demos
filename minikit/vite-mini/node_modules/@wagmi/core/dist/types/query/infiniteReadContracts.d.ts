import type { ContractFunctionParameters } from 'viem';
import { type ReadContractsParameters, type ReadContractsReturnType } from '../actions/readContracts.js';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter, ScopeKeyParameter } from '../types/properties.js';
import type { StrictOmit } from '../types/utils.js';
export type InfiniteReadContractsOptions<contracts extends readonly unknown[], allowFailure extends boolean, pageParam, config extends Config> = {
    cacheKey: string;
    contracts(pageParam: pageParam): ReadContractsParameters<contracts, allowFailure, config>['contracts'];
} & StrictOmit<ReadContractsParameters<contracts, allowFailure, config>, 'contracts'> & ScopeKeyParameter;
export declare function infiniteReadContractsQueryOptions<config extends Config, const contracts extends readonly ContractFunctionParameters[], allowFailure extends boolean = true, pageParam = unknown>(config: config, options: InfiniteReadContractsOptions<contracts, allowFailure, pageParam, config> & ChainIdParameter<config> & RequiredPageParamsParameters<contracts, allowFailure, pageParam>): {
    readonly queryFn: ({ pageParam, queryKey }: import("@tanstack/query-core").QueryFunctionContext<readonly ["infiniteReadContracts", {
        cacheKey: string;
        account?: import("viem").Address | undefined;
        blockNumber?: bigint | undefined | undefined;
        batchSize?: number | undefined | undefined;
        stateOverride?: import("viem").StateOverride | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        allowFailure?: boolean | allowFailure | undefined;
        multicallAddress?: import("viem").Address | undefined;
        scopeKey?: string | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    }], pageParam>) => Promise<ReadContractsReturnType<contracts, allowFailure>>;
    readonly queryKey: readonly ["infiniteReadContracts", {
        cacheKey: string;
        account?: import("viem").Address | undefined;
        blockNumber?: bigint | undefined | undefined;
        batchSize?: number | undefined | undefined;
        stateOverride?: import("viem").StateOverride | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        allowFailure?: boolean | allowFailure | undefined;
        multicallAddress?: import("viem").Address | undefined;
        scopeKey?: string | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    }];
    readonly initialPageParam: pageParam;
    readonly getNextPageParam: (lastPage: InfiniteReadContractsQueryFnData<contracts, allowFailure>, allPages: InfiniteReadContractsQueryFnData<contracts, allowFailure>[], lastPageParam: pageParam, allPageParams: pageParam[]) => pageParam | null | undefined;
};
type RequiredPageParamsParameters<contracts extends readonly unknown[], allowFailure extends boolean, pageParam> = {
    query: {
        initialPageParam: pageParam;
        getNextPageParam(lastPage: InfiniteReadContractsQueryFnData<contracts, allowFailure>, allPages: InfiniteReadContractsQueryFnData<contracts, allowFailure>[], lastPageParam: pageParam, allPageParams: pageParam[]): pageParam | undefined | null;
    };
};
export type InfiniteReadContractsQueryFnData<contracts extends readonly unknown[], allowFailure extends boolean> = ReadContractsReturnType<contracts, allowFailure>;
export type InfiniteReadContractsData<contracts extends readonly unknown[], allowFailure extends boolean> = InfiniteReadContractsQueryFnData<contracts, allowFailure>;
export declare function infiniteReadContractsQueryKey<config extends Config, const contracts extends readonly unknown[], allowFailure extends boolean, pageParam>(options: InfiniteReadContractsOptions<contracts, allowFailure, pageParam, config> & ChainIdParameter<config> & RequiredPageParamsParameters<contracts, allowFailure, pageParam>): readonly ["infiniteReadContracts", {
    cacheKey: string;
    account?: `0x${string}` | undefined;
    blockNumber?: bigint | undefined | undefined;
    batchSize?: number | undefined | undefined;
    stateOverride?: import("viem").StateOverride | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    allowFailure?: boolean | allowFailure | undefined;
    multicallAddress?: `0x${string}` | undefined;
    scopeKey?: string | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
}];
export type InfiniteReadContractsQueryKey<contracts extends readonly unknown[], allowFailure extends boolean, pageParam, config extends Config> = ReturnType<typeof infiniteReadContractsQueryKey<config, contracts, allowFailure, pageParam>>;
export {};
//# sourceMappingURL=infiniteReadContracts.d.ts.map