import { getCallsStatus, } from '../actions/getCallsStatus.js';
import { ConnectorNotConnectedError } from '../errors/config.js';
import { filterQueryOptions } from '../query/utils.js';
export function getCallsStatusQueryOptions(config, options) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            const status = await getCallsStatus(config, parameters);
            return status;
        },
        queryKey: getCallsStatusQueryKey(options),
        retry(failureCount, error) {
            if (error instanceof ConnectorNotConnectedError)
                return false;
            return failureCount < 3;
        },
    };
}
export function getCallsStatusQueryKey(options) {
    return ['callsStatus', filterQueryOptions(options)];
}
//# sourceMappingURL=getCallsStatus.js.map