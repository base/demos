'use client';
import { getChains, } from '@wagmi/core';
import { watchChains } from '@wagmi/core/internal';
import { useSyncExternalStore } from 'react';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useChains */
export function useChains(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStore((onChange) => watchChains(config, { onChange }), () => getChains(config), () => getChains(config));
}
//# sourceMappingURL=useChains.js.map