import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem';
import { type SimulateContractParameters, type SimulateContractReturnType } from '../actions/simulateContract.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { UnionExactPartial } from '../types/utils.js';
export type SimulateContractOptions<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config, chainId extends config['chains'][number]['id'] | undefined> = UnionExactPartial<SimulateContractParameters<abi, functionName, args, config, chainId>> & ScopeKeyParameter;
export declare function simulateContractQueryOptions<config extends Config, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chainId extends config['chains'][number]['id'] | undefined>(config: config, options?: SimulateContractOptions<abi, functionName, args, config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["simulateContract", Omit<SimulateContractOptions<abi, functionName, args, config, chainId>, "connector" | "abi">];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<SimulateContractReturnType<abi, functionName, args, config, chainId, import("../types/chain.js").SelectChains<config, chainId>>>;
    readonly queryKey: readonly ["simulateContract", Omit<SimulateContractOptions<abi, functionName, args, config, chainId>, "connector" | "abi">];
};
export type SimulateContractQueryFnData<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config, chainId extends config['chains'][number]['id'] | undefined> = SimulateContractReturnType<abi, functionName, args, config, chainId>;
export type SimulateContractData<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config, chainId extends config['chains'][number]['id'] | undefined> = SimulateContractQueryFnData<abi, functionName, args, config, chainId>;
export declare function simulateContractQueryKey<config extends Config, abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chainId extends config['chains'][number]['id'] | undefined>(options?: SimulateContractOptions<abi, functionName, args, config, chainId>): readonly ["simulateContract", Omit<SimulateContractOptions<abi, functionName, args, config, chainId>, "connector" | "abi">];
export type SimulateContractQueryKey<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config, chainId extends config['chains'][number]['id'] | undefined> = ReturnType<typeof simulateContractQueryKey<config, abi, functionName, args, chainId>>;
//# sourceMappingURL=simulateContract.d.ts.map