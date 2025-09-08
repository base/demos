import { writeContract, } from '../actions/writeContract.js';
export function writeContractMutationOptions(config) {
    return {
        mutationFn(variables) {
            return writeContract(config, variables);
        },
        mutationKey: ['writeContract'],
    };
}
//# sourceMappingURL=writeContract.js.map