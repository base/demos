import { switchChain, } from '../actions/switchChain.js';
export function switchChainMutationOptions(config) {
    return {
        mutationFn(variables) {
            return switchChain(config, variables);
        },
        mutationKey: ['switchChain'],
    };
}
//# sourceMappingURL=switchChain.js.map