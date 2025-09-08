'use client';
import { getCallsStatusQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useCallsStatus */
export function useCallsStatus(parameters) {
    const { query = {} } = parameters;
    const config = useConfig(parameters);
    const options = getCallsStatusQueryOptions(config, parameters);
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useCallsStatus.js.map