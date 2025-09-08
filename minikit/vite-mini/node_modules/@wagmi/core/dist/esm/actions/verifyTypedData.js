import { verifyTypedData as viem_verifyTypedData, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/verifyTypedData */
export async function verifyTypedData(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_verifyTypedData, 'verifyTypedData');
    return action(rest);
}
//# sourceMappingURL=verifyTypedData.js.map