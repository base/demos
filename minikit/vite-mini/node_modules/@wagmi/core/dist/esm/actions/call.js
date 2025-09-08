import { call as viem_call } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
export async function call(config, parameters) {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_call, 'call');
    return action(rest);
}
//# sourceMappingURL=call.js.map