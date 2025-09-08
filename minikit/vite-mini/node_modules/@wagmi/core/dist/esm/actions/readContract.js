import { readContract as viem_readContract, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/readContract */
export function readContract(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_readContract, 'readContract');
    return action(rest);
}
//# sourceMappingURL=readContract.js.map