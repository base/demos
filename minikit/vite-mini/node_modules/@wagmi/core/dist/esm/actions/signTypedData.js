import { signTypedData as viem_signTypedData, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/signTypedData */
export async function signTypedData(config, parameters) {
    const { account, connector, ...rest } = parameters;
    let client;
    if (typeof account === 'object' && account.type === 'local')
        client = config.getClient();
    else
        client = await getConnectorClient(config, { account, connector });
    const action = getAction(client, viem_signTypedData, 'signTypedData');
    return action({
        ...rest,
        ...(account ? { account } : {}),
    });
}
//# sourceMappingURL=signTypedData.js.map