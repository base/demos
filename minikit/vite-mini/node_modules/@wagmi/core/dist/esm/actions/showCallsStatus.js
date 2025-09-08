import { showCallsStatus as viem_showCallsStatus, } from 'viem/actions';
import { getConnectorClient } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/showCallsStatus */
export async function showCallsStatus(config, parameters) {
    const { connector, id } = parameters;
    const client = await getConnectorClient(config, { connector });
    return viem_showCallsStatus(client, { id });
}
//# sourceMappingURL=showCallsStatus.js.map