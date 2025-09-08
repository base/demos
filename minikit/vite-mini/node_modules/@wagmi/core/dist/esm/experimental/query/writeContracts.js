import { writeContracts, } from '../actions/writeContracts.js';
export function writeContractsMutationOptions(config) {
    return {
        mutationFn(variables) {
            return writeContracts(config, variables);
        },
        mutationKey: ['writeContracts'],
    };
}
//# sourceMappingURL=writeContracts.js.map