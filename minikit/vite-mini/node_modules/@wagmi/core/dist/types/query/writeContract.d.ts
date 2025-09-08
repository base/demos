import type { MutateOptions } from '@tanstack/query-core';
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem';
import { type WriteContractErrorType, type WriteContractParameters, type WriteContractReturnType } from '../actions/writeContract.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
export declare function writeContractMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: import("../types/utils.js").UnionCompute<(import("../types/chain.js").SelectChains<config, config["chains"][number]["id"]> extends infer T extends readonly import("viem").Chain[] ? { [key in keyof T]: import("viem").WriteContractParameters<abi, functionName, args, T[key], import("viem").Account, T[key], allFunctionNames>; } : never)[number] & {
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T_1 ? T_1 extends config["chains"][number]["id"] ? T_1 extends config["chains"][number]["id"] ? T_1 : undefined : never : never) | undefined;
    } & import("../types/properties.js").ConnectorParameter & {
        __mode?: "prepared";
    }>) => Promise<`0x${string}`>;
    readonly mutationKey: readonly ["writeContract"];
};
export type WriteContractData = Compute<WriteContractReturnType>;
export type WriteContractVariables<abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config, chainId extends config['chains'][number]['id'], allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>> = WriteContractParameters<abi, functionName, args, config, chainId, allFunctionNames>;
export type WriteContractMutate<config extends Config, context = unknown> = <const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chainId extends config['chains'][number]['id']>(variables: WriteContractVariables<abi, functionName, args, config, chainId>, options?: MutateOptions<WriteContractData, WriteContractErrorType, WriteContractVariables<abi, functionName, args, config, chainId, functionName>, context> | undefined) => void;
export type WriteContractMutateAsync<config extends Config, context = unknown> = <const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chainId extends config['chains'][number]['id']>(variables: WriteContractVariables<abi, functionName, args, config, chainId>, options?: MutateOptions<WriteContractData, WriteContractErrorType, WriteContractVariables<abi, functionName, args, config, chainId, functionName>, context> | undefined) => Promise<WriteContractData>;
//# sourceMappingURL=writeContract.d.ts.map