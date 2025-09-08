'use client';
import { getClient, watchClient, } from '@wagmi/core';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useClient */
export function useClient(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStoreWithSelector((onChange) => watchClient(config, { onChange }), () => getClient(config, parameters), () => getClient(config, parameters), (x) => x, (a, b) => a?.uid === b?.uid);
}
//# sourceMappingURL=useClient.js.map