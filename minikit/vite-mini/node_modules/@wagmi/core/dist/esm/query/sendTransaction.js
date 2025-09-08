import { sendTransaction, } from '../actions/sendTransaction.js';
export function sendTransactionMutationOptions(config) {
    return {
        mutationFn(variables) {
            return sendTransaction(config, variables);
        },
        mutationKey: ['sendTransaction'],
    };
}
//# sourceMappingURL=sendTransaction.js.map