import { sendCalls, } from '../actions/sendCalls.js';
export function sendCallsMutationOptions(config) {
    return {
        mutationFn(variables) {
            return sendCalls(config, variables);
        },
        mutationKey: ['sendCalls'],
    };
}
//# sourceMappingURL=sendCalls.js.map