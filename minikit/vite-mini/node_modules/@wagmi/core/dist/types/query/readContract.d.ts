import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem';
import { type ReadContractParameters, type ReadContractReturnType } from '../actions/readContract.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { UnionExactPartial } from '../types/utils.js';
export type ReadContractOptions<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>, config extends Config> = UnionExactPartial<ReadContractParameters<abi, functionName, args, config>> & ScopeKeyParameter;
export declare function readContractQueryOptions<config extends Config, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>>(config: config, options?: ReadContractOptions<abi, functionName, args, config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["readContract", Omit<UnionExactPartial<{
            account?: `0x${string}` | import("viem").Account | undefined;
            blockNumber?: bigint | undefined | undefined;
            factory?: `0x${string}` | undefined;
            factoryData?: `0x${string}` | undefined;
            stateOverride?: import("viem").StateOverride | undefined;
            blockTag?: import("viem").BlockTag | undefined;
        } & {
            abi: abi;
            functionName: ContractFunctionName<abi, "pure" | "view"> | (functionName extends ContractFunctionName<abi, "pure" | "view"> ? functionName : never);
            args?: ContractFunctionArgs<abi, "pure" | "view", functionName> | (abi extends Abi ? import("viem").UnionWiden<args> : never) | undefined;
        } & (readonly [] extends ContractFunctionArgs<abi, "pure" | "view", functionName> ? {} : {
            args: import("viem").Widen<args>;
        }) & {
            address: import("viem").Address;
        } & import("../types/properties.js").ChainIdParameter<config>> & ScopeKeyParameter, "abi"> | Omit<UnionExactPartial<{
            account?: `0x${string}` | import("viem").Account | undefined;
            blockNumber?: bigint | undefined | undefined;
            factory?: `0x${string}` | undefined;
            factoryData?: `0x${string}` | undefined;
            stateOverride?: import("viem").StateOverride | undefined;
            blockTag?: import("viem").BlockTag | undefined;
        } & {
            abi: abi;
            functionName: ContractFunctionName<abi, "pure" | "view"> | (functionName extends ContractFunctionName<abi, "pure" | "view"> ? functionName : never);
            args?: ContractFunctionArgs<abi, "pure" | "view", functionName> | (abi extends Abi ? import("viem").UnionWiden<args> : never) | undefined;
        } & (readonly [] extends ContractFunctionArgs<abi, "pure" | "view", functionName> ? {} : {
            args: import("viem").Widen<args>;
        }) & {
            address?: undefined;
            code: import("viem").Hex;
        } & import("../types/properties.js").ChainIdParameter<config>> & ScopeKeyParameter, "abi">];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
    readonly queryKey: any;
};
export type ReadContractQueryFnData<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>> = ReadContractReturnType<abi, functionName, args>;
export type ReadContractData<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>> = ReadContractQueryFnData<abi, functionName, args>;
export declare function readContractQueryKey<config extends Config, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>>(options?: ReadContractOptions<abi, functionName, args, config>): readonly ["readContract", Omit<UnionExactPartial<{
    account?: `0x${string}` | import("viem").Account | undefined;
    blockNumber?: bigint | undefined | undefined;
    factory?: `0x${string}` | undefined;
    factoryData?: `0x${string}` | undefined;
    stateOverride?: import("viem").StateOverride | undefined;
    blockTag?: import("viem").BlockTag | undefined;
} & {
    abi: abi;
    functionName: ContractFunctionName<abi, "pure" | "view"> | (functionName extends ContractFunctionName<abi, "pure" | "view"> ? functionName : never);
    args?: ContractFunctionArgs<abi, "pure" | "view", functionName> | (abi extends Abi ? import("viem").UnionWiden<args> : never) | undefined;
} & (readonly [] extends ContractFunctionArgs<abi, "pure" | "view", functionName> ? {} : {
    args: import("viem").Widen<args>;
}) & {
    address: import("viem").Address;
} & import("../types/properties.js").ChainIdParameter<config>> & ScopeKeyParameter, "abi"> | Omit<UnionExactPartial<{
    account?: `0x${string}` | import("viem").Account | undefined;
    blockNumber?: bigint | undefined | undefined;
    factory?: `0x${string}` | undefined;
    factoryData?: `0x${string}` | undefined;
    stateOverride?: import("viem").StateOverride | undefined;
    blockTag?: import("viem").BlockTag | undefined;
} & {
    abi: abi;
    functionName: ContractFunctionName<abi, "pure" | "view"> | (functionName extends ContractFunctionName<abi, "pure" | "view"> ? functionName : never);
    args?: ContractFunctionArgs<abi, "pure" | "view", functionName> | (abi extends Abi ? import("viem").UnionWiden<args> : never) | undefined;
} & (readonly [] extends ContractFunctionArgs<abi, "pure" | "view", functionName> ? {} : {
    args: import("viem").Widen<args>;
}) & {
    address?: undefined;
    code: import("viem").Hex;
} & import("../types/properties.js").ChainIdParameter<config>> & ScopeKeyParameter, "abi">];
export type ReadContractQueryKey<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>, config extends Config> = ReturnType<typeof readContractQueryKey<config, abi, functionName, args>>;
//# sourceMappingURL=readContract.d.ts.map