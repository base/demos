import { getEnsText as viem_getEnsText, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getEnsText */
export function getEnsText(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getEnsText, 'getEnsText');
    return action(rest);
}
//# sourceMappingURL=getEnsText.js.map