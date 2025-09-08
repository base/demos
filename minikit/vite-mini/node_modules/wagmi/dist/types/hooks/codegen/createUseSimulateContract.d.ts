import type { Config, ResolvedRegister, SimulateContractErrorType, SimulateContractParameters } from '@wagmi/core';
import type { ScopeKeyParameter, UnionExactPartial } from '@wagmi/core/internal';
import type { SimulateContractData, SimulateContractQueryFnData, SimulateContractQueryKey } from '@wagmi/core/query';
import type { Abi, Address, ContractFunctionArgs, ContractFunctionName } from 'viem';
import type { ConfigParameter, QueryParameter } from '../../types/properties.js';
import { type UseSimulateContractReturnType } from '../useSimulateContract.js';
type stateMutability = 'nonpayable' | 'payable';
export type CreateUseSimulateContractParameters<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined = undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined = undefined> = {
    abi: abi | Abi | readonly unknown[];
    address?: address | Address | Record<number, Address> | undefined;
    functionName?: functionName | ContractFunctionName<abi, stateMutability> | undefined;
};
export type CreateUseSimulateContractReturnType<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined> = <name extends functionName extends ContractFunctionName<abi, stateMutability> ? functionName : ContractFunctionName<abi, stateMutability>, args extends ContractFunctionArgs<abi, stateMutability, name>, config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = SimulateContractData<abi, name, args, config, chainId>>(parameters?: {
    abi?: undefined;
    address?: address extends undefined ? Address : undefined;
    functionName?: functionName extends undefined ? name : undefined;
    chainId?: address extends Record<number, Address> ? keyof address | (chainId extends keyof address ? chainId : never) | undefined : chainId | number | undefined;
} & UnionExactPartial<SimulateContractParameters<abi, name, args, config, chainId>> & ScopeKeyParameter & ConfigParameter<config> & QueryParameter<SimulateContractQueryFnData<abi, name, args, config, chainId>, SimulateContractErrorType, selectData, SimulateContractQueryKey<abi, name, args, config, chainId>>) => UseSimulateContractReturnType<abi, name, args, config, chainId, selectData>;
export declare function createUseSimulateContract<const abi extends Abi | readonly unknown[], const address extends Address | Record<number, Address> | undefined = undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined = undefined>(props: CreateUseSimulateContractParameters<abi, address, functionName>): CreateUseSimulateContractReturnType<abi, address, functionName>;
export {};
//# sourceMappingURL=createUseSimulateContract.d.ts.map