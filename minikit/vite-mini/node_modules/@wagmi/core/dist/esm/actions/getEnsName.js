import { getEnsName as viem_getEnsName, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getEnsName */
export function getEnsName(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getEnsName, 'getEnsName');
    return action(rest);
}
//# sourceMappingURL=getEnsName.js.map