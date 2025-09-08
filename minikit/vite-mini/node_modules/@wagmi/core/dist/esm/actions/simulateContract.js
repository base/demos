import { simulateContract as viem_simulateContract, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/simulateContract */
export async function simulateContract(config, parameters) {
    const { abi, chainId, connector, ...rest } = parameters;
    let account;
    if (parameters.account)
        account = parameters.account;
    else {
        const connectorClient = await getConnectorClient(config, {
            chainId,
            connector,
        });
        account = connectorClient.account;
    }
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_simulateContract, 'simulateContract');
    const { result, request } = await action({ ...rest, abi, account });
    return {
        chainId: client.chain.id,
        result,
        request: { ...request, chainId },
    };
}
//# sourceMappingURL=simulateContract.js.map