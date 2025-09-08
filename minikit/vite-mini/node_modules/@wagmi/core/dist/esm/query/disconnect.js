import { disconnect, } from '../actions/disconnect.js';
export function disconnectMutationOptions(config) {
    return {
        mutationFn(variables) {
            return disconnect(config, variables);
        },
        mutationKey: ['disconnect'],
    };
}
//# sourceMappingURL=disconnect.js.map