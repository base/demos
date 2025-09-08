import { walletActions } from 'viem';
import { getConnectorClient, } from './getConnectorClient.js';
export async function getWalletClient(config, parameters = {}) {
    const client = await getConnectorClient(config, parameters);
    // @ts-ignore
    return client.extend(walletActions);
}
//# sourceMappingURL=getWalletClient.js.map