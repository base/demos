import { getBytecode as viem_getBytecode, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getBytecode */
export async function getBytecode(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getBytecode, 'getBytecode');
    return action(rest);
}
//# sourceMappingURL=getBytecode.js.map