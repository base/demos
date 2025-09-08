import type { Abi, Account, Chain, ContractFunctionArgs, ContractFunctionName } from 'viem';
import { type WriteContractErrorType as viem_WriteContractErrorType, type WriteContractParameters as viem_WriteContractParameters, type WriteContractReturnType as viem_WriteContractReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js';
import type { Compute, UnionCompute } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type WriteContractParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>, chains extends readonly Chain[] = SelectChains<config, chainId>> = UnionCompute<{
    [key in keyof chains]: viem_WriteContractParameters<abi, functionName, args, chains[key], Account, chains[key], allFunctionNames>;
}[number] & Compute<ChainIdParameter<config, chainId>> & ConnectorParameter & {
    /** @deprecated */
    __mode?: 'prepared';
}>;
export type WriteContractReturnType = viem_WriteContractReturnType;
export type WriteContractErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_WriteContractErrorType;
/** https://wagmi.sh/core/api/actions/writeContract */
export declare function writeContract<config extends Config, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chainId extends config['chains'][number]['id']>(config: config, parameters: WriteContractParameters<abi, functionName, args, config, chainId>): Promise<WriteContractReturnType>;
//# sourceMappingURL=writeContract.d.ts.map