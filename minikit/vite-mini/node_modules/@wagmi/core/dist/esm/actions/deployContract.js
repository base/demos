import { deployContract as viem_deployContract, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/deployContract */
export async function deployContract(config, parameters) {
    const { account, chainId, connector, ...rest } = parameters;
    let client;
    if (typeof account === 'object' && account?.type === 'local')
        client = config.getClient({ chainId });
    else
        client = await getConnectorClient(config, {
            account: account ?? undefined,
            chainId,
            connector,
        });
    const action = getAction(client, viem_deployContract, 'deployContract');
    const hash = await action({
        ...rest,
        ...(account ? { account } : {}),
        chain: chainId ? { id: chainId } : null,
    });
    return hash;
}
//# sourceMappingURL=deployContract.js.map