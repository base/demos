import { connect, } from '../actions/connect.js';
export function connectMutationOptions(config) {
    return {
        mutationFn(variables) {
            return connect(config, variables);
        },
        mutationKey: ['connect'],
    };
}
//# sourceMappingURL=connect.js.map