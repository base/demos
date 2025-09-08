import { getCapabilities as viem_getCapabilities, } from 'viem/actions';
import { getConnectorClient } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/getCapabilities */
export async function getCapabilities(config, parameters = {}) {
    const { account, chainId, connector } = parameters;
    const client = await getConnectorClient(config, { account, connector });
    return viem_getCapabilities(client, {
        account: account,
        chainId,
    });
}
//# sourceMappingURL=getCapabilities.js.map