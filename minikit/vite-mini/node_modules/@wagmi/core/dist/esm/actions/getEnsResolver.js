import { getEnsResolver as viem_getEnsResolver, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getEnsResolver */
export function getEnsResolver(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getEnsResolver, 'getEnsResolver');
    return action(rest);
}
//# sourceMappingURL=getEnsResolver.js.map