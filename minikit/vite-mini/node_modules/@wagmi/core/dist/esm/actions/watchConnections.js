import { deepEqual } from '../utils/deepEqual.js';
import { getConnections, } from './getConnections.js';
/** https://wagmi.sh/core/api/actions/watchConnections */
export function watchConnections(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe(() => getConnections(config), onChange, {
        equalityFn: deepEqual,
    });
}
//# sourceMappingURL=watchConnections.js.map