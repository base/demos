'use client';
import { waitForCallsStatusQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWaitForCallsStatus */
export function useWaitForCallsStatus(parameters) {
    const { id, query = {} } = parameters;
    const config = useConfig(parameters);
    const options = waitForCallsStatusQueryOptions(config, parameters);
    const enabled = Boolean(id && (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useWaitForCallsStatus.js.map