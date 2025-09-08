import { useChainId } from '../useChainId.js';
import { useConfig } from '../useConfig.js';
import { useSimulateContract, } from '../useSimulateContract.js';
export function createUseSimulateContract(props) {
    if (props.address !== undefined && typeof props.address === 'object')
        return (parameters) => {
            const config = useConfig(parameters);
            const configChainId = useChainId({ config });
            const chainId = parameters?.chainId ?? configChainId;
            return useSimulateContract({
                ...parameters,
                ...(props.functionName ? { functionName: props.functionName } : {}),
                address: props.address?.[chainId],
                abi: props.abi,
            });
        };
    return (parameters) => {
        return useSimulateContract({
            ...parameters,
            ...(props.address ? { address: props.address } : {}),
            ...(props.functionName ? { functionName: props.functionName } : {}),
            abi: props.abi,
        });
    };
}
//# sourceMappingURL=createUseSimulateContract.js.map