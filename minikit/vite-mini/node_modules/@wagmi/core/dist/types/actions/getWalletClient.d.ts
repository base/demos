import { type Account, type WalletClient } from 'viem';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { Compute } from '../types/utils.js';
import { type GetConnectorClientErrorType, type GetConnectorClientParameters } from './getConnectorClient.js';
export type GetWalletClientParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = GetConnectorClientParameters<Config, chainId>;
export type GetWalletClientReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<WalletClient<config['_internal']['transports'][chainId], Extract<config['chains'][number], {
    id: chainId;
}>, Account>>;
export type GetWalletClientErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType;
export declare function getWalletClient<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters?: GetWalletClientParameters<config, chainId>): Promise<GetWalletClientReturnType<config, chainId>>;
//# sourceMappingURL=getWalletClient.d.ts.map