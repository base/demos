import { deployContract, } from '../actions/deployContract.js';
export function deployContractMutationOptions(config) {
    return {
        mutationFn(variables) {
            return deployContract(config, variables);
        },
        mutationKey: ['deployContract'],
    };
}
//# sourceMappingURL=deployContract.js.map