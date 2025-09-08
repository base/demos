import { publicActions } from 'viem';
import { getClient } from './getClient.js';
export function getPublicClient(config, parameters = {}) {
    const client = getClient(config, parameters);
    return client?.extend(publicActions);
}
//# sourceMappingURL=getPublicClient.js.map