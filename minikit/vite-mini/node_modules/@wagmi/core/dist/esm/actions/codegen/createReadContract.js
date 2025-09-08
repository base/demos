import { getChainId } from '../getChainId.js';
import { readContract, } from '../readContract.js';
export function createReadContract(c) {
    if (c.address !== undefined && typeof c.address === 'object')
        return (config, parameters) => {
            const configChainId = getChainId(config);
            const chainId = parameters?.chainId ?? configChainId;
            return readContract(config, {
                ...parameters,
                ...(c.functionName ? { functionName: c.functionName } : {}),
                address: c.address?.[chainId],
                abi: c.abi,
            });
        };
    return (config, parameters) => {
        return readContract(config, {
            ...parameters,
            ...(c.address ? { address: c.address } : {}),
            ...(c.functionName ? { functionName: c.functionName } : {}),
            abi: c.abi,
        });
    };
}
//# sourceMappingURL=createReadContract.js.map