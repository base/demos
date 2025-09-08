'use client';
import { watchAccount } from '@wagmi/core';
import { useEffect } from 'react';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useAccountEffect */
export function useAccountEffect(parameters = {}) {
    const { onConnect, onDisconnect } = parameters;
    const config = useConfig(parameters);
    useEffect(() => {
        return watchAccount(config, {
            onChange(data, prevData) {
                if ((prevData.status === 'reconnecting' ||
                    (prevData.status === 'connecting' &&
                        prevData.address === undefined)) &&
                    data.status === 'connected') {
                    const { address, addresses, chain, chainId, connector } = data;
                    const isReconnected = prevData.status === 'reconnecting' ||
                        // if `previousAccount.status` is `undefined`, the connector connected immediately.
                        prevData.status === undefined;
                    onConnect?.({
                        address,
                        addresses,
                        chain,
                        chainId,
                        connector,
                        isReconnected,
                    });
                }
                else if (prevData.status === 'connected' &&
                    data.status === 'disconnected')
                    onDisconnect?.();
            },
        });
    }, [config, onConnect, onDisconnect]);
}
//# sourceMappingURL=useAccountEffect.js.map