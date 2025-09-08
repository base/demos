import { estimateMaxPriorityFeePerGas as viem_estimateMaxPriorityFeePerGas, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/estimateMaxPriorityFeePerGas */
export async function estimateMaxPriorityFeePerGas(config, parameters = {}) {
    const { chainId } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_estimateMaxPriorityFeePerGas, 'estimateMaxPriorityFeePerGas');
    return action({ chain: client.chain });
}
//# sourceMappingURL=estimateMaxPriorityFeePerGas.js.map