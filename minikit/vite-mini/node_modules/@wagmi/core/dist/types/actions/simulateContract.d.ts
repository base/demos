import type { Abi, Account, Address, Chain, ContractFunctionArgs, ContractFunctionName } from 'viem';
import { type SimulateContractErrorType as viem_SimulateContractErrorType, type SimulateContractParameters as viem_SimulateContractParameters, type SimulateContractReturnType as viem_SimulateContractReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js';
import type { Compute, PartialBy, UnionCompute, UnionStrictOmit } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type SimulateContractParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: UnionCompute<UnionStrictOmit<viem_SimulateContractParameters<abi, functionName, args, chains[key], chains[key], Account | Address>, 'chain'>> & ChainIdParameter<config, chainId> & ConnectorParameter;
}[number];
export type SimulateContractReturnType<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: viem_SimulateContractReturnType<abi, functionName, args, chains[key], Account, chains[key]> & {
        chainId: chains[key]['id'];
        request: Compute<PartialBy<{
            chainId: chainId;
            chain: chains[key];
        }, chainId extends config['chains'][number]['id'] ? never : 'chainId'>>;
    };
}[number];
export type SimulateContractErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_SimulateContractErrorType;
/** https://wagmi.sh/core/api/actions/simulateContract */
export declare function simulateContract<config extends Config, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chainId extends config['chains'][number]['id'] | undefined = undefined>(config: config, parameters: SimulateContractParameters<abi, functionName, args, config, chainId>): Promise<SimulateContractReturnType<abi, functionName, args, config, chainId>>;
//# sourceMappingURL=simulateContract.d.ts.map