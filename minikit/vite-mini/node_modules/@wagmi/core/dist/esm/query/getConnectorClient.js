import { getConnectorClient, } from '../actions/getConnectorClient.js';
import { filterQueryOptions } from './utils.js';
export function getConnectorClientQueryOptions(config, options = {}) {
    return {
        gcTime: 0,
        async queryFn({ queryKey }) {
            const { connector } = options;
            const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
            return getConnectorClient(config, {
                ...parameters,
                connector,
            });
        },
        queryKey: getConnectorClientQueryKey(options),
    };
}
export function getConnectorClientQueryKey(options = {}) {
    const { connector, ...parameters } = options;
    return [
        'connectorClient',
        { ...filterQueryOptions(parameters), connectorUid: connector?.uid },
    ];
}
//# sourceMappingURL=getConnectorClient.js.map