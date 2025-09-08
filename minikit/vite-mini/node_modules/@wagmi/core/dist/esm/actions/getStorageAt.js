import { getStorageAt as viem_getStorageAt, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getStorageAt */
export async function getStorageAt(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getStorageAt, 'getStorageAt');
    return action(rest);
}
//# sourceMappingURL=getStorageAt.js.map