import type { Config, ReadContractErrorType, ReadContractParameters, ResolvedRegister } from '@wagmi/core';
import type { ScopeKeyParameter, UnionCompute, UnionExactPartial, UnionStrictOmit } from '@wagmi/core/internal';
import type { ReadContractData, ReadContractQueryFnData, ReadContractQueryKey } from '@wagmi/core/query';
import type { Abi, Address, ContractFunctionArgs, ContractFunctionName } from 'viem';
import type { ConfigParameter, QueryParameter } from '../../types/properties.js';
import { type UseReadContractReturnType } from '../useReadContract.js';
type stateMutability = 'pure' | 'view';
export type CreateUseReadContractParameters<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined = undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined = undefined> = {
    abi: abi | Abi | readonly unknown[];
    address?: address | Address | Record<number, Address> | undefined;
    functionName?: functionName | ContractFunctionName<abi, stateMutability> | undefined;
};
export type CreateUseReadContractReturnType<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined, omittedProperties extends 'abi' | 'address' | 'chainId' | 'functionName' = 'abi' | (address extends undefined ? never : 'address') | (address extends Record<number, Address> ? 'chainId' : never) | (functionName extends undefined ? never : 'functionName')> = <name extends functionName extends ContractFunctionName<abi, stateMutability> ? functionName : ContractFunctionName<abi, stateMutability>, args extends ContractFunctionArgs<abi, stateMutability, name>, config extends Config = ResolvedRegister['config'], selectData = ReadContractData<abi, name, args>>(parameters?: UnionCompute<UnionExactPartial<UnionStrictOmit<ReadContractParameters<abi, name, args, config>, omittedProperties>> & ScopeKeyParameter & ConfigParameter<config> & QueryParameter<ReadContractQueryFnData<abi, name, args>, ReadContractErrorType, selectData, ReadContractQueryKey<abi, name, args, config>>> & (address extends Record<number, Address> ? {
    chainId?: keyof address | undefined;
} : unknown)) => UseReadContractReturnType<abi, name, args, selectData>;
export declare function createUseReadContract<const abi extends Abi | readonly unknown[], const address extends Address | Record<number, Address> | undefined = undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined = undefined>(props: CreateUseReadContractParameters<abi, address, functionName>): CreateUseReadContractReturnType<abi, address, functionName>;
export {};
//# sourceMappingURL=createUseReadContract.d.ts.map