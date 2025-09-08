import { reconnect, } from '../actions/reconnect.js';
export function reconnectMutationOptions(config) {
    return {
        mutationFn(variables) {
            return reconnect(config, variables);
        },
        mutationKey: ['reconnect'],
    };
}
//# sourceMappingURL=reconnect.js.map