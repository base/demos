import { type Account, type Address, type BaseErrorType, type Client } from 'viem';
import type { Config } from '../createConfig.js';
import type { ErrorType } from '../errors/base.js';
import { type ConnectorAccountNotFoundErrorType, type ConnectorChainMismatchErrorType, type ConnectorNotConnectedErrorType, type ConnectorUnavailableReconnectingErrorType } from '../errors/config.js';
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetConnectorClientParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<ChainIdParameter<config, chainId> & ConnectorParameter & {
    /**
     * Account to use for the client.
     *
     * - `Account | Address`: An Account MUST exist on the connector.
     * - `null`: Account MAY NOT exist on the connector. This is useful for
     *   actions that can infer the account from the connector (e.g. sending a
     *   call without a connected account – the user will be prompted to select
     *   an account within the wallet).
     */
    account?: Address | Account | null | undefined;
}>;
export type GetConnectorClientReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<Client<config['_internal']['transports'][chainId], Extract<config['chains'][number], {
    id: chainId;
}>, Account>>;
export type GetConnectorClientErrorType = ConnectorAccountNotFoundErrorType | ConnectorChainMismatchErrorType | ConnectorNotConnectedErrorType | ConnectorUnavailableReconnectingErrorType | BaseErrorType | ErrorType;
/** https://wagmi.sh/core/api/actions/getConnectorClient */
export declare function getConnectorClient<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters?: GetConnectorClientParameters<config, chainId>): Promise<GetConnectorClientReturnType<config, chainId>>;
//# sourceMappingURL=getConnectorClient.d.ts.map