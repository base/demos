import { getEnsAddress as viem_getEnsAddress, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getEnsAddress */
export function getEnsAddress(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getEnsAddress, 'getEnsAddress');
    return action(rest);
}
//# sourceMappingURL=getEnsAddress.js.map