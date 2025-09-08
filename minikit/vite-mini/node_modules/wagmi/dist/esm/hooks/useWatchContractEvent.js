'use client';
import { watchContractEvent, } from '@wagmi/core';
import { useEffect } from 'react';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWatchContractEvent */
export function useWatchContractEvent(parameters = {}) {
    const { enabled = true, onLogs, config: _, ...rest } = parameters;
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    // TODO(react@19): cleanup
    // biome-ignore lint/correctness/useExhaustiveDependencies: `rest` changes every render so only including properties in dependency array
    useEffect(() => {
        if (!enabled)
            return;
        if (!onLogs)
            return;
        return watchContractEvent(config, {
            ...rest,
            chainId,
            onLogs,
        });
    }, [
        chainId,
        config,
        enabled,
        onLogs,
        ///
        rest.abi,
        rest.address,
        rest.args,
        rest.batch,
        rest.eventName,
        rest.fromBlock,
        rest.onError,
        rest.poll,
        rest.pollingInterval,
        rest.strict,
        rest.syncConnectedChain,
    ]);
}
//# sourceMappingURL=useWatchContractEvent.js.map