import { hexToString } from 'viem';
import { call, getTransaction, waitForTransactionReceipt as viem_waitForTransactionReceipt, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
export async function waitForTransactionReceipt(config, parameters) {
    const { chainId, timeout = 0, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_waitForTransactionReceipt, 'waitForTransactionReceipt');
    const receipt = await action({ ...rest, timeout });
    if (receipt.status === 'reverted') {
        const action_getTransaction = getAction(client, getTransaction, 'getTransaction');
        const txn = await action_getTransaction({ hash: receipt.transactionHash });
        const action_call = getAction(client, call, 'call');
        const code = await action_call({
            ...txn,
            data: txn.input,
            gasPrice: txn.type !== 'eip1559' ? txn.gasPrice : undefined,
            maxFeePerGas: txn.type === 'eip1559' ? txn.maxFeePerGas : undefined,
            maxPriorityFeePerGas: txn.type === 'eip1559' ? txn.maxPriorityFeePerGas : undefined,
        });
        const reason = code?.data
            ? hexToString(`0x${code.data.substring(138)}`)
            : 'unknown reason';
        throw new Error(reason);
    }
    return {
        ...receipt,
        chainId: client.chain.id,
    };
}
//# sourceMappingURL=waitForTransactionReceipt.js.map