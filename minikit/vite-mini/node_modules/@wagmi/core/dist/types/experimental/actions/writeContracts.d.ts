import type { Account, Chain, ContractFunctionParameters } from 'viem';
import { type WriteContractsErrorType as viem_WriteContractsErrorType, type WriteContractsParameters as viem_WriteContractsParameters, type WriteContractsReturnType as viem_WriteContractsReturnType } from 'viem/experimental';
import { type GetConnectorClientErrorType } from '../../actions/getConnectorClient.js';
import type { Config } from '../../createConfig.js';
import type { BaseErrorType, ErrorType } from '../../errors/base.js';
import type { SelectChains } from '../../types/chain.js';
import type { ChainIdParameter, ConnectorParameter } from '../../types/properties.js';
import type { Compute } from '../../types/utils.js';
export type WriteContractsParameters<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: Compute<Omit<viem_WriteContractsParameters<contracts, chains[key], Account, chains[key]>, 'chain'> & ChainIdParameter<config, chainId> & ConnectorParameter>;
}[number];
export type WriteContractsReturnType = viem_WriteContractsReturnType;
export type WriteContractsErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_WriteContractsErrorType;
/** https://wagmi.sh/core/api/actions/writeContracts */
export declare function writeContracts<const contracts extends readonly unknown[], config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters: WriteContractsParameters<contracts, config, chainId>): Promise<WriteContractsReturnType>;
//# sourceMappingURL=writeContracts.d.ts.map