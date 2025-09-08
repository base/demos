import { getChainId } from '../getChainId.js';
import { watchContractEvent, } from '../watchContractEvent.js';
export function createWatchContractEvent(c) {
    if (c.address !== undefined && typeof c.address === 'object')
        return (config, parameters) => {
            const configChainId = getChainId(config);
            const chainId = parameters?.chainId ?? configChainId;
            return watchContractEvent(config, {
                ...parameters,
                ...(c.eventName ? { eventName: c.eventName } : {}),
                address: c.address?.[chainId],
                abi: c.abi,
            });
        };
    return (config, parameters) => {
        return watchContractEvent(config, {
            ...parameters,
            ...(c.address ? { address: c.address } : {}),
            ...(c.eventName ? { eventName: c.eventName } : {}),
            abi: c.abi,
        });
    };
}
//# sourceMappingURL=createWatchContractEvent.js.map