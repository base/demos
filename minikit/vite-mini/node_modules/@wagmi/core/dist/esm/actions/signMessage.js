import { signMessage as viem_signMessage, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/signMessage */
export async function signMessage(config, parameters) {
    const { account, connector, ...rest } = parameters;
    let client;
    if (typeof account === 'object' && account.type === 'local')
        client = config.getClient();
    else
        client = await getConnectorClient(config, { account, connector });
    const action = getAction(client, viem_signMessage, 'signMessage');
    return action({
        ...rest,
        ...(account ? { account } : {}),
    });
}
//# sourceMappingURL=signMessage.js.map