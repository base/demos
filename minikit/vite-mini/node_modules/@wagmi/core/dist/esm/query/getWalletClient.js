import { getWalletClient, } from '../actions/getWalletClient.js';
import { filterQueryOptions } from './utils.js';
export function getWalletClientQueryOptions(config, options = {}) {
    return {
        gcTime: 0,
        async queryFn({ queryKey }) {
            const { connector } = options;
            const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
            return getWalletClient(config, { ...parameters, connector });
        },
        queryKey: getWalletClientQueryKey(options),
    };
}
export function getWalletClientQueryKey(options = {}) {
    const { connector, ...parameters } = options;
    return [
        'walletClient',
        { ...filterQueryOptions(parameters), connectorUid: connector?.uid },
    ];
}
//# sourceMappingURL=getWalletClient.js.map