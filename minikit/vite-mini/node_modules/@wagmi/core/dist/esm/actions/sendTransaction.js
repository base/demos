import { sendTransaction as viem_sendTransaction } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getConnectorClient, } from './getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/sendTransaction */
export async function sendTransaction(config, parameters) {
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
    const action = getAction(client, viem_sendTransaction, 'sendTransaction');
    const hash = await action({
        ...rest,
        ...(account ? { account } : {}),
        chain: chainId ? { id: chainId } : null,
        gas: rest.gas ?? undefined,
    });
    return hash;
}
//# sourceMappingURL=sendTransaction.js.map