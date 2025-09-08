import { useChainId } from '../useChainId.js';
import { useConfig } from '../useConfig.js';
import { useWatchContractEvent } from '../useWatchContractEvent.js';
export function createUseWatchContractEvent(props) {
    if (props.address !== undefined && typeof props.address === 'object')
        return (parameters) => {
            const config = useConfig(parameters);
            const configChainId = useChainId({ config });
            const chainId = parameters?.chainId ?? configChainId;
            return useWatchContractEvent({
                ...parameters,
                ...(props.eventName ? { eventName: props.eventName } : {}),
                address: props.address?.[chainId],
                abi: props.abi,
            });
        };
    return (parameters) => {
        return useWatchContractEvent({
            ...parameters,
            ...(props.address ? { address: props.address } : {}),
            ...(props.eventName ? { eventName: props.eventName } : {}),
            abi: props.abi,
        });
    };
}
//# sourceMappingURL=createUseWatchContractEvent.js.map