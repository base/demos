import { getTransactionCount as viem_getTransactionCount, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getTransactionCount */
export async function getTransactionCount(config, parameters) {
    const { address, blockNumber, blockTag, chainId } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getTransactionCount, 'getTransactionCount');
    return action(blockNumber ? { address, blockNumber } : { address, blockTag });
}
//# sourceMappingURL=getTransactionCount.js.map