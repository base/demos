'use client';
import { getAccount, watchAccount, } from '@wagmi/core';
import { useConfig } from './useConfig.js';
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js';
/** https://wagmi.sh/react/api/hooks/useAccount */
export function useAccount(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStoreWithTracked((onChange) => watchAccount(config, { onChange }), () => getAccount(config));
}
//# sourceMappingURL=useAccount.js.map