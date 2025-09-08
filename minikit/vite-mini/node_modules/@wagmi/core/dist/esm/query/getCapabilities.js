import { getCapabilities, } from '../actions/getCapabilities.js';
import { ConnectorNotConnectedError } from '../errors/config.js';
import { filterQueryOptions } from '../query/utils.js';
export function getCapabilitiesQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            const capabilities = await getCapabilities(config, parameters);
            return capabilities;
        },
        queryKey: getCapabilitiesQueryKey(options),
        retry(failureCount, error) {
            if (error instanceof ConnectorNotConnectedError)
                return false;
            return failureCount < 3;
        },
    };
}
export function getCapabilitiesQueryKey(options = {}) {
    return ['capabilities', filterQueryOptions(options)];
}
//# sourceMappingURL=getCapabilities.js.map