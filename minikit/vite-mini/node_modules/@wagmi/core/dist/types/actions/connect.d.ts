import type { Address, ResourceUnavailableRpcErrorType, UserRejectedRequestErrorType } from 'viem';
import type { CreateConnectorFn } from '../connectors/createConnector.js';
import type { Config, Connector } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import { type ConnectorAlreadyConnectedErrorType } from '../errors/config.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type ConnectParameters<config extends Config = Config, connector extends Connector | CreateConnectorFn = Connector | CreateConnectorFn, parameters extends unknown | undefined = (connector extends CreateConnectorFn ? Omit<NonNullable<Parameters<ReturnType<connector>['connect']>[0]>, 'isReconnecting'> : never) | (connector extends Connector ? Omit<NonNullable<Parameters<connector['connect']>[0]>, 'isReconnecting'> : never)> = Compute<ChainIdParameter<config> & {
    connector: connector | CreateConnectorFn;
}> & parameters;
export type ConnectReturnType<config extends Config = Config> = {
    accounts: readonly [Address, ...Address[]];
    chainId: config['chains'][number]['id'] | (number extends config['chains'][number]['id'] ? number : number & {});
};
export type ConnectErrorType = ConnectorAlreadyConnectedErrorType | UserRejectedRequestErrorType | ResourceUnavailableRpcErrorType | BaseErrorType | ErrorType;
/** https://wagmi.sh/core/api/actions/connect */
export declare function connect<config extends Config, connector extends Connector | CreateConnectorFn>(config: config, parameters: ConnectParameters<config, connector>): Promise<ConnectReturnType<config>>;
//# sourceMappingURL=connect.d.ts.map