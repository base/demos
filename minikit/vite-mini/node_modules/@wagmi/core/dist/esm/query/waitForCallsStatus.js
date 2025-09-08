import { waitForCallsStatus, } from '../actions/waitForCallsStatus.js';
import { ConnectorNotConnectedError } from '../errors/config.js';
import { filterQueryOptions } from '../query/utils.js';
export function waitForCallsStatusQueryOptions(config, options) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, id, ...parameters } = queryKey[1];
            if (!id)
                throw new Error('id is required');
            const status = await waitForCallsStatus(config, { ...parameters, id });
            return status;
        },
        queryKey: waitForCallsStatusQueryKey(options),
        retry(failureCount, error) {
            if (error instanceof ConnectorNotConnectedError)
                return false;
            return failureCount < 3;
        },
    };
}
export function waitForCallsStatusQueryKey(options) {
    return ['callsStatus', filterQueryOptions(options)];
}
//# sourceMappingURL=waitForCallsStatus.js.map