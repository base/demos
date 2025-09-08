'use client';
import { getPublicClient, watchPublicClient, } from '@wagmi/core';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/usePublicClient */
export function usePublicClient(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStoreWithSelector((onChange) => watchPublicClient(config, { onChange }), () => getPublicClient(config, parameters), () => getPublicClient(config, parameters), (x) => x, (a, b) => a?.uid === b?.uid);
}
//# sourceMappingURL=usePublicClient.js.map