import { prepareTransactionRequest as viem_prepareTransactionRequest } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getAccount } from './getAccount.js';
/** https://wagmi.sh/core/api/actions/prepareTransactionRequest */
export async function prepareTransactionRequest(config, parameters) {
    const { account: account_, chainId, ...rest } = parameters;
    const account = account_ ?? getAccount(config).address;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_prepareTransactionRequest, 'prepareTransactionRequest');
    return action({
        ...rest,
        ...(account ? { account } : {}),
    });
}
//# sourceMappingURL=prepareTransactionRequest.js.map