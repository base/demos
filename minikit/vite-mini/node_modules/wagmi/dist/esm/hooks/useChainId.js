'use client';
import { getChainId, watchChainId, } from '@wagmi/core';
import { useSyncExternalStore } from 'react';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useChainId */
export function useChainId(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStore((onChange) => watchChainId(config, { onChange }), () => getChainId(config), () => getChainId(config));
}
//# sourceMappingURL=useChainId.js.map