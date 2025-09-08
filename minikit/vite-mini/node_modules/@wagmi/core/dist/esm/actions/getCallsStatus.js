import { getCallsStatus as viem_getCallsStatus, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/getCallsStatus */
export async function getCallsStatus(config, parameters) {
    const { connector, id } = parameters;
    const client = await getConnectorClient(config, { connector });
    const action = getAction(client, viem_getCallsStatus, 'getCallsStatus');
    return action({ id });
}
//# sourceMappingURL=getCallsStatus.js.map