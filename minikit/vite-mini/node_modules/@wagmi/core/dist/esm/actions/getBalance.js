import { formatUnits, hexToString, trim } from 'viem';
import { getBalance as viem_getBalance, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getUnit } from '../utils/getUnit.js';
import { readContracts } from './readContracts.js';
/** https://wagmi.sh/core/api/actions/getBalance */
export async function getBalance(config, parameters) {
    const { address, blockNumber, blockTag, chainId, token: tokenAddress, unit = 'ether', } = parameters;
    if (tokenAddress) {
        try {
            return await getTokenBalance(config, {
                balanceAddress: address,
                chainId,
                symbolType: 'string',
                tokenAddress,
            });
        }
        catch (error) {
            // In the chance that there is an error upon decoding the contract result,
            // it could be likely that the contract data is represented as bytes32 instead
            // of a string.
            if (error.name ===
                'ContractFunctionExecutionError') {
                const balance = await getTokenBalance(config, {
                    balanceAddress: address,
                    chainId,
                    symbolType: 'bytes32',
                    tokenAddress,
                });
                const symbol = hexToString(trim(balance.symbol, { dir: 'right' }));
                return { ...balance, symbol };
            }
            throw error;
        }
    }
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_getBalance, 'getBalance');
    const value = await action(blockNumber ? { address, blockNumber } : { address, blockTag });
    const chain = config.chains.find((x) => x.id === chainId) ?? client.chain;
    return {
        decimals: chain.nativeCurrency.decimals,
        formatted: formatUnits(value, getUnit(unit)),
        symbol: chain.nativeCurrency.symbol,
        value,
    };
}
async function getTokenBalance(config, parameters) {
    const { balanceAddress, chainId, symbolType, tokenAddress, unit } = parameters;
    const contract = {
        abi: [
            {
                type: 'function',
                name: 'balanceOf',
                stateMutability: 'view',
                inputs: [{ type: 'address' }],
                outputs: [{ type: 'uint256' }],
            },
            {
                type: 'function',
                name: 'decimals',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ type: 'uint8' }],
            },
            {
                type: 'function',
                name: 'symbol',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ type: symbolType }],
            },
        ],
        address: tokenAddress,
    };
    const [value, decimals, symbol] = await readContracts(config, {
        allowFailure: false,
        contracts: [
            {
                ...contract,
                functionName: 'balanceOf',
                args: [balanceAddress],
                chainId,
            },
            { ...contract, functionName: 'decimals', chainId },
            { ...contract, functionName: 'symbol', chainId },
        ],
    });
    const formatted = formatUnits(value ?? '0', getUnit(unit ?? decimals));
    return { decimals, formatted, symbol, value };
}
//# sourceMappingURL=getBalance.js.map