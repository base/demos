import { estimateGas as viem_estimateGas, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/estimateGas */
export async function estimateGas(config, parameters) {
    const { chainId, connector, ...rest } = parameters;
    let account;
    if (parameters.account)
        account = parameters.account;
    else {
        const connectorClient = await getConnectorClient(config, {
            account: parameters.account,
            chainId,
            connector,
        });
        account = connectorClient.account;
    }
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_estimateGas, 'estimateGas');
    return action({ ...rest, account });
}
//# sourceMappingURL=estimateGas.js.map