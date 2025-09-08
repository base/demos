import type { Abi, Account, Chain, ContractConstructorArgs } from 'viem';
import { type DeployContractErrorType as viem_DeployContractErrorType, type DeployContractParameters as viem_DeployContractParameters, type DeployContractReturnType as viem_DeployContractReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type DeployContractParameters<abi extends Abi | readonly unknown[] = Abi, config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], allArgs = ContractConstructorArgs<abi>, chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: Compute<Omit<viem_DeployContractParameters<abi, chains[key], Account, chains[key], allArgs>, 'chain'> & ChainIdParameter<config, chainId> & ConnectorParameter>;
}[number];
export type DeployContractReturnType = viem_DeployContractReturnType;
export type DeployContractErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_DeployContractErrorType;
/** https://wagmi.sh/core/api/actions/deployContract */
export declare function deployContract<config extends Config, const abi extends Abi | readonly unknown[], chainId extends config['chains'][number]['id']>(config: config, parameters: DeployContractParameters<abi, config, chainId>): Promise<DeployContractReturnType>;
//# sourceMappingURL=deployContract.d.ts.map