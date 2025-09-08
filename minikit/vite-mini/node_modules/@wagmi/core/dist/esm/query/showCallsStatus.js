import { showCallsStatus, } from '../actions/showCallsStatus.js';
export function showCallsStatusMutationOptions(config) {
    return {
        mutationFn(variables) {
            return showCallsStatus(config, variables);
        },
        mutationKey: ['showCallsStatus'],
    };
}
//# sourceMappingURL=showCallsStatus.js.map