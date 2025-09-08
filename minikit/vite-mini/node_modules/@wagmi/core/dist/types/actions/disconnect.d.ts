import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { ConnectorNotConnectedErrorType, ConnectorNotFoundErrorType } from '../errors/config.js';
import type { ConnectorParameter } from '../types/properties.js';
export type DisconnectParameters = ConnectorParameter;
export type DisconnectReturnType = void;
export type DisconnectErrorType = ConnectorNotFoundErrorType | ConnectorNotConnectedErrorType | BaseErrorType | ErrorType;
/** https://wagmi.sh/core/api/actions/disconnect */
export declare function disconnect(config: Config, parameters?: DisconnectParameters): Promise<DisconnectReturnType>;
//# sourceMappingURL=disconnect.d.ts.map