'use client';
import { getConnections, watchConnections, } from '@wagmi/core';
import { useSyncExternalStore } from 'react';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useConnections */
export function useConnections(parameters = {}) {
    const config = useConfig(parameters);
    return useSyncExternalStore((onChange) => watchConnections(config, { onChange }), () => getConnections(config), () => getConnections(config));
}
//# sourceMappingURL=useConnections.js.map