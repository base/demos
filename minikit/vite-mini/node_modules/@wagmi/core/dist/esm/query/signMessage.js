import { signMessage, } from '../actions/signMessage.js';
export function signMessageMutationOptions(config) {
    return {
        mutationFn(variables) {
            return signMessage(config, variables);
        },
        mutationKey: ['signMessage'],
    };
}
//# sourceMappingURL=signMessage.js.map