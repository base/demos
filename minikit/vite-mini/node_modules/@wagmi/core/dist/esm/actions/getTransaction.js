import { getTransaction as viem_getTransaction, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getTransaction */
export function getTransaction(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getTransaction, 'getTransaction');
    return action(rest);
}
//# sourceMappingURL=getTransaction.js.map