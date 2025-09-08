import { requestExecute, } from '../actions/requestExecute.js';
export function walletActionsL1() {
    return (client) => ({
        requestExecute: (args) => requestExecute(client, args),
    });
}
//# sourceMappingURL=walletL1.js.map