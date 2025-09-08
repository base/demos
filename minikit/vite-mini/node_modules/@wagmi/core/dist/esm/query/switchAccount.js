import { switchAccount, } from '../actions/switchAccount.js';
export function switchAccountMutationOptions(config) {
    return {
        mutationFn(variables) {
            return switchAccount(config, variables);
        },
        mutationKey: ['switchAccount'],
    };
}
//# sourceMappingURL=switchAccount.js.map