import { getEnsAvatar as viem_getEnsAvatar, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getEnsAvatar */
export function getEnsAvatar(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getEnsAvatar, 'getEnsAvatar');
    return action(rest);
}
//# sourceMappingURL=getEnsAvatar.js.map