'use client';
import { watchBlockNumber, } from '@wagmi/core';
import { useEffect } from 'react';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWatchBlockNumber */
export function useWatchBlockNumber(parameters = {}) {
    const { enabled = true, onBlockNumber, config: _, ...rest } = parameters;
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    // TODO(react@19): cleanup
    // biome-ignore lint/correctness/useExhaustiveDependencies: `rest` changes every render so only including properties in dependency array
    useEffect(() => {
        if (!enabled)
            return;
        if (!onBlockNumber)
            return;
        return watchBlockNumber(config, {
            ...rest,
            chainId,
            onBlockNumber,
        });
    }, [
        chainId,
        config,
        enabled,
        onBlockNumber,
        ///
        rest.onError,
        rest.emitMissed,
        rest.emitOnBegin,
        rest.poll,
        rest.pollingInterval,
        rest.syncConnectedChain,
    ]);
}
//# sourceMappingURL=useWatchBlockNumber.js.map