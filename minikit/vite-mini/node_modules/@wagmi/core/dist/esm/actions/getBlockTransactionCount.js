import { getBlockTransactionCount as viem_getBlockTransactionCount, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getBlockTransactionCount */
export function getBlockTransactionCount(config, parameters = {}) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getBlockTransactionCount, 'getBlockTransactionCount');
    return action(rest);
}
//# sourceMappingURL=getBlockTransactionCount.js.map