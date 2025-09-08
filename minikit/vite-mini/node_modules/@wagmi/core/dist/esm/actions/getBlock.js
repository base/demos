import { getBlock as viem_getBlock, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/actions/getBlock */
export async function getBlock(config, parameters = {}) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getBlock, 'getBlock');
    const block = await action(rest);
    return {
        ...block,
        chainId: client.chain.id,
    };
}
//# sourceMappingURL=getBlock.js.map