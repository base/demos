import { getFeeHistory as viem_getFeeHistory, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getFeeHistory */
export function getFeeHistory(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getFeeHistory, 'getFeeHistory');
    return action(rest);
}
//# sourceMappingURL=getFeeHistory.js.map