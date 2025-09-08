import { writeContracts as viem_writeContracts, } from 'viem/experimental';
import { getConnectorClient, } from '../../actions/getConnectorClient.js';
/** https://wagmi.sh/core/api/actions/writeContracts */
export async function writeContracts(config, parameters) {
    const { account, chainId, connector, ...rest } = parameters;
    const client = await getConnectorClient(config, {
        account,
        chainId,
        connector,
    });
    return viem_writeContracts(client, {
        ...rest,
        ...(account ? { account } : {}),
        chain: chainId ? { id: chainId } : undefined,
    });
}
//# sourceMappingURL=writeContracts.js.map