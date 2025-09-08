import { watchAsset as viem_watchAsset, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/watchAsset */
export async function watchAsset(config, parameters) {
    const { connector, ...rest } = parameters;
    const client = await getConnectorClient(config, { connector });
    const action = getAction(client, viem_watchAsset, 'watchAsset');
    return action(rest);
}
//# sourceMappingURL=watchAsset.js.map