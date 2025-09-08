import { getTransactionReceipt as viem_getTransactionReceipt, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getTransactionReceipt */
export async function getTransactionReceipt(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getTransactionReceipt, 'getTransactionReceipt');
    return action(rest);
}
//# sourceMappingURL=getTransactionReceipt.js.map