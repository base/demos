import { getGasPrice as viem_getGasPrice, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
/** https://wagmi.sh/core/api/actions/getGasPrice */
export function getGasPrice(config, parameters = {}) {
    const { chainId } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getGasPrice, 'getGasPrice');
    return action({});
}
//# sourceMappingURL=getGasPrice.js.map