import type { MutateOptions } from '@tanstack/react-query';
import type { Config, ResolvedRegister, WriteContractErrorType } from '@wagmi/core';
import type { ChainIdParameter, Compute, ConnectorParameter, SelectChains, UnionCompute, UnionStrictOmit } from '@wagmi/core/internal';
import type { WriteContractData, WriteContractVariables } from '@wagmi/core/query';
import type { Abi, Account, Address, Chain, ContractFunctionArgs, ContractFunctionName } from 'viem';
import type { WriteContractParameters as viem_WriteContractParameters } from 'viem/actions';
import { type UseWriteContractParameters, type UseWriteContractReturnType as wagmi_UseWriteContractReturnType } from '../useWriteContract.js';
type stateMutability = 'nonpayable' | 'payable';
export type CreateUseWriteContractParameters<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined = undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined = undefined> = {
    abi: abi | Abi | readonly unknown[];
    address?: address | Address | Record<number, Address> | undefined;
    functionName?: functionName | ContractFunctionName<abi, stateMutability> | undefined;
};
export type CreateUseWriteContractReturnType<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined> = <config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseWriteContractParameters<config, context>) => Compute<Omit<wagmi_UseWriteContractReturnType<config, context>, 'writeContract' | 'writeContractAsync'> & {
    writeContract: <const abi2 extends abi, name extends functionName extends ContractFunctionName<abi, stateMutability> ? functionName : ContractFunctionName<abi, stateMutability>, args extends ContractFunctionArgs<abi2, stateMutability, name>, chainId extends config['chains'][number]['id']>(variables: Variables<abi2, functionName, name, args, config, chainId, address>, options?: MutateOptions<WriteContractData, WriteContractErrorType, WriteContractVariables<abi2, name, args, config, chainId, name>, context> | undefined) => void;
    writeContractAsync: <const abi2 extends abi, name extends functionName extends ContractFunctionName<abi, stateMutability> ? functionName : ContractFunctionName<abi, stateMutability>, args extends ContractFunctionArgs<abi2, stateMutability, name>, chainId extends config['chains'][number]['id']>(variables: Variables<abi2, functionName, name, args, config, chainId, address>, options?: MutateOptions<WriteContractData, WriteContractErrorType, WriteContractVariables<abi2, name, args, config, chainId, name>, context> | undefined) => Promise<WriteContractData>;
}>;
export declare function createUseWriteContract<const abi extends Abi | readonly unknown[], const address extends Address | Record<number, Address> | undefined = undefined, functionName extends ContractFunctionName<abi, stateMutability> | undefined = undefined>(props: CreateUseWriteContractParameters<abi, address, functionName>): CreateUseWriteContractReturnType<abi, address, functionName>;
type Variables<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, stateMutability> | undefined, name extends ContractFunctionName<abi, stateMutability>, args extends ContractFunctionArgs<abi, stateMutability, name>, config extends Config, chainId extends config['chains'][number]['id'], address extends Address | Record<number, Address> | undefined, allFunctionNames = ContractFunctionName<abi, stateMutability>, chains extends readonly Chain[] = SelectChains<config, chainId>, omittedProperties extends 'abi' | 'address' | 'functionName' = 'abi' | (address extends undefined ? never : 'address') | (functionName extends undefined ? never : 'functionName')> = UnionCompute<{
    [key in keyof chains]: UnionStrictOmit<viem_WriteContractParameters<abi, name, args, chains[key], Account, chains[key], allFunctionNames>, omittedProperties | 'chain'>;
}[number] & (address extends Record<number, Address> ? {
    chainId?: keyof address | (chainId extends keyof address ? chainId : never) | undefined;
} : Compute<ChainIdParameter<config, chainId>>) & ConnectorParameter & {
    /** @deprecated */
    __mode?: 'prepared';
}>;
export {};
//# sourceMappingURL=createUseWriteContract.d.ts.map