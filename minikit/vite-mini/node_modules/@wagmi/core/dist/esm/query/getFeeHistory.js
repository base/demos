import { getFeeHistory, } from '../actions/getFeeHistory.js';
import { filterQueryOptions } from './utils.js';
export function getFeeHistoryQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { blockCount, rewardPercentiles, scopeKey: _, ...parameters } = queryKey[1];
            if (!blockCount)
                throw new Error('blockCount is required');
            if (!rewardPercentiles)
                throw new Error('rewardPercentiles is required');
            const feeHistory = await getFeeHistory(config, {
                ...parameters,
                blockCount,
                rewardPercentiles,
            });
            return feeHistory ?? null;
        },
        queryKey: getFeeHistoryQueryKey(options),
    };
}
export function getFeeHistoryQueryKey(options = {}) {
    return ['feeHistory', filterQueryOptions(options)];
}
//# sourceMappingURL=getFeeHistory.js.map