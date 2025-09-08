'use client';
import { estimateGasQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useConnectorClient } from './useConnectorClient.js';
export function useEstimateGas(parameters = {}) {
    const { connector, query = {} } = parameters;
    const config = useConfig(parameters);
    const { data: connectorClient } = useConnectorClient({
        config,
        connector,
        query: { enabled: parameters.account === undefined },
    });
    const account = parameters.account ?? connectorClient?.account;
    const chainId = useChainId({ config });
    const options = estimateGasQueryOptions(config, {
        ...parameters,
        account,
        chainId: parameters.chainId ?? chainId,
        connector,
    });
    const enabled = Boolean((account || connector) && (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useEstimateGas.js.map