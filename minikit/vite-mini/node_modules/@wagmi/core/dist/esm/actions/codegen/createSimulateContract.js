import { getChainId } from '../getChainId.js';
import { simulateContract, } from '../simulateContract.js';
export function createSimulateContract(c) {
    if (c.address !== undefined && typeof c.address === 'object')
        return (config, parameters) => {
            const configChainId = getChainId(config);
            const chainId = parameters?.chainId ?? configChainId;
            return simulateContract(config, {
                ...parameters,
                ...(c.functionName ? { functionName: c.functionName } : {}),
                address: c.address?.[chainId],
                abi: c.abi,
            });
        };
    return (config, parameters) => {
        return simulateContract(config, {
            ...parameters,
            ...(c.address ? { address: c.address } : {}),
            ...(c.functionName ? { functionName: c.functionName } : {}),
            abi: c.abi,
        });
    };
}
//# sourceMappingURL=createSimulateContract.js.map