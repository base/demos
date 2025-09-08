import { waitForCallsStatus as viem_waitForCallsStatus, } from 'viem/actions';
import { getConnectorClient } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/waitForCallsStatus */
export async function waitForCallsStatus(config, parameters) {
    const { connector } = parameters;
    const client = await getConnectorClient(config, { connector });
    return viem_waitForCallsStatus(client, parameters);
}
//# sourceMappingURL=waitForCallsStatus.js.map