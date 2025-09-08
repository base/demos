'use client';
import { simulateContractQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useConnectorClient } from './useConnectorClient.js';
/** https://wagmi.sh/react/api/hooks/useSimulateContract */
export function useSimulateContract(parameters = {}) {
    const { abi, address, connector, functionName, query = {} } = parameters;
    const config = useConfig(parameters);
    const { data: connectorClient } = useConnectorClient({
        config,
        connector,
        query: { enabled: parameters.account === undefined },
    });
    const chainId = useChainId({ config });
    const options = simulateContractQueryOptions(config, {
        ...parameters,
        account: parameters.account ?? connectorClient?.account,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(abi && address && functionName && (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useSimulateContract.js.map