import type { AddEthereumChainParameter, UserRejectedRequestErrorType, SwitchChainErrorType as viem_SwitchChainErrorType } from 'viem';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import { type ChainNotConfiguredErrorType } from '../errors/config.js';
import { type ProviderNotFoundErrorType, type SwitchChainNotSupportedErrorType } from '../errors/connector.js';
import type { ConnectorParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type SwitchChainParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<ConnectorParameter & {
    chainId: chainId | config['chains'][number]['id'];
    addEthereumChainParameter?: Compute<ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>> | undefined;
}>;
export type SwitchChainReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Extract<config['chains'][number], {
    id: Config extends config ? number : chainId;
}>;
export type SwitchChainErrorType = SwitchChainNotSupportedErrorType | ChainNotConfiguredErrorType | ProviderNotFoundErrorType | UserRejectedRequestErrorType | BaseErrorType | ErrorType | viem_SwitchChainErrorType;
/** https://wagmi.sh/core/api/actions/switchChain */
export declare function switchChain<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters: SwitchChainParameters<config, chainId>): Promise<SwitchChainReturnType<config, chainId>>;
//# sourceMappingURL=switchChain.d.ts.map