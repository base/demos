import type { Config, Connection } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
export type GetConnectionsReturnType = Compute<Connection>[];
/** https://wagmi.sh/core/api/actions/getConnections */
export declare function getConnections(config: Config): GetConnectionsReturnType;
//# sourceMappingURL=getConnections.d.ts.map