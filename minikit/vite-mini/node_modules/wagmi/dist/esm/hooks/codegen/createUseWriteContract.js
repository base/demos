import { useCallback } from 'react';
import { useChainId } from '../useChainId.js';
import { useConfig } from '../useConfig.js';
import { useWriteContract, } from '../useWriteContract.js';
export function createUseWriteContract(props) {
    if (props.address !== undefined && typeof props.address === 'object')
        return (parameters) => {
            const config = useConfig(parameters);
            const result = useWriteContract(parameters);
            const configChainId = useChainId({ config });
            return {
                ...result,
                writeContract: useCallback((...args) => {
                    const chainId = (() => {
                        if (args[0].chainId)
                            return args[0].chainId;
                        return configChainId;
                    })();
                    const variables = {
                        ...args[0],
                        address: chainId ? props.address?.[chainId] : undefined,
                        ...(props.functionName
                            ? { functionName: props.functionName }
                            : {}),
                        abi: props.abi,
                    };
                    result.writeContract(variables, args[1]);
                }, [props, configChainId, result.writeContract]),
                writeContractAsync: useCallback((...args) => {
                    const chainId = (() => {
                        if (args[0].chainId)
                            return args[0].chainId;
                        return configChainId;
                    })();
                    const variables = {
                        ...args[0],
                        address: chainId ? props.address?.[chainId] : undefined,
                        ...(props.functionName
                            ? { functionName: props.functionName }
                            : {}),
                        abi: props.abi,
                    };
                    return result.writeContractAsync(variables, args[1]);
                }, [props, configChainId, result.writeContractAsync]),
            };
        };
    return (parameters) => {
        const result = useWriteContract(parameters);
        return {
            ...result,
            writeContract: useCallback((...args) => {
                const variables = {
                    ...args[0],
                    ...(props.address ? { address: props.address } : {}),
                    ...(props.functionName ? { functionName: props.functionName } : {}),
                    abi: props.abi,
                };
                result.writeContract(variables, args[1]);
            }, [props, result.writeContract]),
            writeContractAsync: useCallback((...args) => {
                const variables = {
                    ...args[0],
                    ...(props.address ? { address: props.address } : {}),
                    ...(props.functionName ? { functionName: props.functionName } : {}),
                    abi: props.abi,
                };
                return result.writeContractAsync(variables, args[1]);
            }, [props, result.writeContractAsync]),
        };
    };
}
//# sourceMappingURL=createUseWriteContract.js.map