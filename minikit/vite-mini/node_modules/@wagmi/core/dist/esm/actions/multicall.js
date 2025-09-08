import { multicall as viem_multicall } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
export async function multicall(config, parameters) {
    const { allowFailure = true, chainId, contracts, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_multicall, 'multicall');
    return action({
        allowFailure,
        contracts,
        ...rest,
    });
}
//# sourceMappingURL=multicall.js.map