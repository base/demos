import { ContractFunctionExecutionError } from 'viem';
import { multicall } from './multicall.js';
import { readContract } from './readContract.js';
export async function readContracts(config, parameters) {
    const { allowFailure = true, blockNumber, blockTag, ...rest } = parameters;
    const contracts = parameters.contracts;
    try {
        const contractsByChainId = {};
        for (const [index, contract] of contracts.entries()) {
            const chainId = contract.chainId ?? config.state.chainId;
            if (!contractsByChainId[chainId])
                contractsByChainId[chainId] = [];
            contractsByChainId[chainId]?.push({ contract, index });
        }
        const promises = () => Object.entries(contractsByChainId).map(([chainId, contracts]) => multicall(config, {
            ...rest,
            allowFailure,
            blockNumber,
            blockTag,
            chainId: Number.parseInt(chainId),
            contracts: contracts.map(({ contract }) => contract),
        }));
        const multicallResults = (await Promise.all(promises())).flat();
        // Reorder the contract results back to the order they were
        // provided in.
        const resultIndexes = Object.values(contractsByChainId).flatMap((contracts) => contracts.map(({ index }) => index));
        return multicallResults.reduce((results, result, index) => {
            if (results)
                results[resultIndexes[index]] = result;
            return results;
        }, []);
    }
    catch (error) {
        if (error instanceof ContractFunctionExecutionError)
            throw error;
        const promises = () => contracts.map((contract) => readContract(config, { ...contract, blockNumber, blockTag }));
        if (allowFailure)
            return (await Promise.allSettled(promises())).map((result) => {
                if (result.status === 'fulfilled')
                    return { result: result.value, status: 'success' };
                return { error: result.reason, result: undefined, status: 'failure' };
            });
        return (await Promise.all(promises()));
    }
}
//# sourceMappingURL=readContracts.js.map