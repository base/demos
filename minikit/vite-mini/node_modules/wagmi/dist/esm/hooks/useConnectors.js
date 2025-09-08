'use client';
import { getConnectors, watchConnectors, } from '@wagmi/core';
import { useSyncExternalStore } from 'react';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useConnectors */
export function useConnectors(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStore((onChange) => watchConnectors(config, { onChange }), () => getConnectors(config), () => getConnectors(config));
}
//# sourceMappingURL=useConnectors.js.map