import { formatUnits, } from 'viem';
import { estimateFeesPerGas as viem_estimateFeesPerGas, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
import { getUnit } from '../utils/getUnit.js';
export async function estimateFeesPerGas(config, parameters = {}) {
    const { chainId, formatUnits: units = 'gwei', ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(client, viem_estimateFeesPerGas, 'estimateFeesPerGas');
    const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await action({
        ...rest,
        chain: client.chain,
    });
    const unit = getUnit(units);
    const formatted = {
        gasPrice: gasPrice ? formatUnits(gasPrice, unit) : undefined,
        maxFeePerGas: maxFeePerGas ? formatUnits(maxFeePerGas, unit) : undefined,
        maxPriorityFeePerGas: maxPriorityFeePerGas
            ? formatUnits(maxPriorityFeePerGas, unit)
            : undefined,
    };
    return {
        formatted,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
    };
}
//# sourceMappingURL=estimateFeesPerGas.js.map