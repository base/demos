import type { CreateConnectorFn } from '../connectors/createConnector.js';
import type { Config, Connection, Connector } from '../createConfig.js';
import type { ErrorType } from '../errors/base.js';
import type { Compute } from '../types/utils.js';
export type ReconnectParameters = {
    /** Connectors to attempt reconnect with */
    connectors?: readonly (CreateConnectorFn | Connector)[] | undefined;
};
export type ReconnectReturnType = Compute<Connection>[];
export type ReconnectErrorType = ErrorType;
/** https://wagmi.sh/core/api/actions/reconnect */
export declare function reconnect(config: Config, parameters?: ReconnectParameters): Promise<ReconnectReturnType>;
//# sourceMappingURL=reconnect.d.ts.map