import type { Config } from '../createConfig.js';
import { type GetConnectionsReturnType } from './getConnections.js';
export type WatchConnectionsParameters = {
    onChange(connections: GetConnectionsReturnType, prevConnections: GetConnectionsReturnType): void;
};
export type WatchConnectionsReturnType = () => void;
/** https://wagmi.sh/core/api/actions/watchConnections */
export declare function watchConnections(config: Config, parameters: WatchConnectionsParameters): WatchConnectionsReturnType;
//# sourceMappingURL=watchConnections.d.ts.map