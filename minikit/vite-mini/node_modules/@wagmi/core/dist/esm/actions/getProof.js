import { getProof as viem_getProof, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getProof */
export async function getProof(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getProof, 'getProof');
    return action(rest);
}
//# sourceMappingURL=getProof.js.map