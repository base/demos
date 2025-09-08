'use client';
import { watchPendingTransactions, } from '@wagmi/core';
import { useEffect } from 'react';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWatchPendingTransactions */
export function useWatchPendingTransactions(parameters = {}) {
    const { enabled = true, onTransactions, config: _, ...rest } = parameters;
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    // TODO(react@19): cleanup
    // biome-ignore lint/correctness/useExhaustiveDependencies: `rest` changes every render so only including properties in dependency array
    useEffect(() => {
        if (!enabled)
            return;
        if (!onTransactions)
            return;
        return watchPendingTransactions(config, {
            ...rest,
            chainId,
            onTransactions,
        });
    }, [
        chainId,
        config,
        enabled,
        onTransactions,
        ///
        rest.batch,
        rest.onError,
        rest.poll,
        rest.pollingInterval,
        rest.syncConnectedChain,
    ]);
}
//# sourceMappingURL=useWatchPendingTransactions.js.map