import { useChainId } from '../useChainId.js';
import { useConfig } from '../useConfig.js';
import { useReadContract, } from '../useReadContract.js';
export function createUseReadContract(props) {
    if (props.address !== undefined && typeof props.address === 'object')
        return (parameters) => {
            const config = useConfig(parameters);
            const configChainId = useChainId({ config });
            const chainId = parameters?.chainId ?? configChainId;
            return useReadContract({
                ...parameters,
                ...(props.functionName ? { functionName: props.functionName } : {}),
                address: props.address?.[chainId],
                abi: props.abi,
            });
        };
    return (parameters) => {
        return useReadContract({
            ...parameters,
            ...(props.address ? { address: props.address } : {}),
            ...(props.functionName ? { functionName: props.functionName } : {}),
            abi: props.abi,
        });
    };
}
//# sourceMappingURL=createUseReadContract.js.map