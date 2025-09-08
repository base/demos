'use client';
import { watchBlocks, } from '@wagmi/core';
import { useEffect } from 'react';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/hooks/useWatchBlocks */
export function useWatchBlocks(parameters = {}) {
    const { enabled = true, onBlock, config: _, ...rest } = parameters;
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    // TODO(react@19): cleanup
    // biome-ignore lint/correctness/useExhaustiveDependencies: `rest` changes every render so only including properties in dependency array
    useEffect(() => {
        if (!enabled)
            return;
        if (!onBlock)
            return;
        return watchBlocks(config, {
            ...rest,
            chainId,
            onBlock,
        });
    }, [
        chainId,
        config,
        enabled,
        onBlock,
        ///
        rest.blockTag,
        rest.emitMissed,
        rest.emitOnBegin,
        rest.includeTransactions,
        rest.onError,
        rest.poll,
        rest.pollingInterval,
        rest.syncConnectedChain,
    ]);
}
//# sourceMappingURL=useWatchBlocks.js.map