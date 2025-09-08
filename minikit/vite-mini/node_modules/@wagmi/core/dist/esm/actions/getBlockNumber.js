import { getBlockNumber as viem_getBlockNumber, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getBlockNumber */
export function getBlockNumber(config, parameters = {}) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getBlockNumber, 'getBlockNumber');
    return action(rest);
}
//# sourceMappingURL=getBlockNumber.js.map