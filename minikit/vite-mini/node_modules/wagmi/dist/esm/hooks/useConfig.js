'use client';
import { useContext } from 'react';
import { WagmiContext } from '../context.js';
import { WagmiProviderNotFoundError } from '../errors/context.js';
/** https://wagmi.sh/react/api/hooks/useConfig */
export function useConfig(parameters = {}) {
    // biome-ignore lint/correctness/useHookAtTopLevel: false alarm
    const config = parameters.config ?? useContext(WagmiContext);
    if (!config)
        throw new WagmiProviderNotFoundError();
    return config;
}
//# sourceMappingURL=useConfig.js.map