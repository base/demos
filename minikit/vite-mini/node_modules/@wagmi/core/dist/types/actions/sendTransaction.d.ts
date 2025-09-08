import type { Account, Chain, TransactionRequest, SendTransactionErrorType as viem_SendTransactionErrorType, SendTransactionParameters as viem_SendTransactionParameters, SendTransactionReturnType as viem_SendTransactionReturnType } from 'viem';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type SendTransactionParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = {
    [key in keyof chains]: Compute<Omit<viem_SendTransactionParameters<chains[key], Account, chains[key]>, 'chain' | 'gas'> & ChainIdParameter<config, chainId> & ConnectorParameter>;
}[number] & {
    /** Gas provided for transaction execution. */
    gas?: TransactionRequest['gas'] | null;
};
export type SendTransactionReturnType = viem_SendTransactionReturnType;
export type SendTransactionErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_SendTransactionErrorType;
/** https://wagmi.sh/core/api/actions/sendTransaction */
export declare function sendTransaction<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters: SendTransactionParameters<config, chainId>): Promise<SendTransactionReturnType>;
//# sourceMappingURL=sendTransaction.d.ts.map