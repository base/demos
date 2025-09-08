import { deepEqual } from '../utils/deepEqual.js';
let previousConnections = [];
/** https://wagmi.sh/core/api/actions/getConnections */
export function getConnections(config) {
    const connections = [...config.state.connections.values()];
    if (config.state.status === 'reconnecting')
        return previousConnections;
    if (deepEqual(previousConnections, connections))
        return previousConnections;
    previousConnections = connections;
    return connections;
}
//# sourceMappingURL=getConnections.js.map