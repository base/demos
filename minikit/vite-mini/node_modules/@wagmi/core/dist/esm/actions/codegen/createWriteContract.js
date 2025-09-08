import { getChainId } from '../getChainId.js';
import { writeContract, } from '../writeContract.js';
export function createWriteContract(c) {
    if (c.address !== undefined && typeof c.address === 'object')
        return (config, parameters) => {
            const chainId = (() => {
                if (parameters.chainId)
                    return parameters.chainId;
                return getChainId(config);
            })();
            return writeContract(config, {
                ...parameters,
                ...(c.functionName ? { functionName: c.functionName } : {}),
                address: chainId ? c.address?.[chainId] : undefined,
                abi: c.abi,
            });
        };
    return (config, parameters) => {
        return writeContract(config, {
            ...parameters,
            ...(c.address ? { address: c.address } : {}),
            ...(c.functionName ? { functionName: c.functionName } : {}),
            abi: c.abi,
        });
    };
}
//# sourceMappingURL=createWriteContract.js.map