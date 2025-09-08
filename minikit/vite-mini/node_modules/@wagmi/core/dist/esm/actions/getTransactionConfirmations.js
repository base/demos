import { getTransactionConfirmations as viem_getTransactionConfirmations, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getTransactionConfirmations */
export function getTransactionConfirmations(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getTransactionConfirmations, 'getTransactionConfirmations');
    return action(rest);
}
//# sourceMappingURL=getTransactionConfirmations.js.map