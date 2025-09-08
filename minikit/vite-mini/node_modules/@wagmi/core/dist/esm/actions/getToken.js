import { ContractFunctionExecutionError, formatUnits, hexToString, trim, } from 'viem';
import { getUnit } from '../utils/getUnit.js';
import { readContracts } from './readContracts.js';
/** @deprecated */
export async function getToken(config, parameters) {
    const { address, chainId, formatUnits: unit = 18 } = parameters;
    function getAbi(type) {
        return [
            {
                type: 'function',
                name: 'decimals',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ type: 'uint8' }],
            },
            {
                type: 'function',
                name: 'name',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ type }],
            },
            {
                type: 'function',
                name: 'symbol',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ type }],
            },
            {
                type: 'function',
                name: 'totalSupply',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ type: 'uint256' }],
            },
        ];
    }
    try {
        const abi = getAbi('string');
        const contractConfig = { address, abi, chainId };
        const [decimals, name, symbol, totalSupply] = await readContracts(config, {
            allowFailure: true,
            contracts: [
                { ...contractConfig, functionName: 'decimals' },
                { ...contractConfig, functionName: 'name' },
                { ...contractConfig, functionName: 'symbol' },
                { ...contractConfig, functionName: 'totalSupply' },
            ],
        });
        // throw if `name` or `symbol` failed
        if (name.error instanceof ContractFunctionExecutionError)
            throw name.error;
        if (symbol.error instanceof ContractFunctionExecutionError)
            throw symbol.error;
        // `decimals` and `totalSupply` are required
        if (decimals.error)
            throw decimals.error;
        if (totalSupply.error)
            throw totalSupply.error;
        return {
            address,
            decimals: decimals.result,
            name: name.result,
            symbol: symbol.result,
            totalSupply: {
                formatted: formatUnits(totalSupply.result, getUnit(unit)),
                value: totalSupply.result,
            },
        };
    }
    catch (error) {
        // In the chance that there is an error upon decoding the contract result,
        // it could be likely that the contract data is represented as bytes32 instead
        // of a string.
        if (error instanceof ContractFunctionExecutionError) {
            const abi = getAbi('bytes32');
            const contractConfig = { address, abi, chainId };
            const [decimals, name, symbol, totalSupply] = await readContracts(config, {
                allowFailure: false,
                contracts: [
                    { ...contractConfig, functionName: 'decimals' },
                    { ...contractConfig, functionName: 'name' },
                    { ...contractConfig, functionName: 'symbol' },
                    { ...contractConfig, functionName: 'totalSupply' },
                ],
            });
            return {
                address,
                decimals,
                name: hexToString(trim(name, { dir: 'right' })),
                symbol: hexToString(trim(symbol, { dir: 'right' })),
                totalSupply: {
                    formatted: formatUnits(totalSupply, getUnit(unit)),
                    value: totalSupply,
                },
            };
        }
        throw error;
    }
}
//# sourceMappingURL=getToken.js.map