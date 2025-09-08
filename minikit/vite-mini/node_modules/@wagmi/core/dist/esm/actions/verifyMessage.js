import { verifyMessage as viem_verifyMessage, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/verifyMessage */
export async function verifyMessage(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_verifyMessage, 'verifyMessage');
    return action(rest);
}
//# sourceMappingURL=verifyMessage.js.map