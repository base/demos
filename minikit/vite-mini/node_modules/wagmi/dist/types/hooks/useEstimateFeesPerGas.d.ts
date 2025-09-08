import type { Config, EstimateFeesPerGasErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type EstimateFeesPerGasData, type EstimateFeesPerGasOptions, type EstimateFeesPerGasQueryFnData, type EstimateFeesPerGasQueryKey } from '@wagmi/core/query';
import type { FeeValuesType } from 'viem';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseEstimateFeesPerGasParameters<type extends FeeValuesType = FeeValuesType, config extends Config = Config, selectData = EstimateFeesPerGasData<type>> = Compute<EstimateFeesPerGasOptions<type, config> & ConfigParameter<config> & QueryParameter<EstimateFeesPerGasQueryFnData<type>, EstimateFeesPerGasErrorType, selectData, EstimateFeesPerGasQueryKey<config, type>>>;
export type UseEstimateFeesPerGasReturnType<type extends FeeValuesType = FeeValuesType, selectData = EstimateFeesPerGasData<type>> = UseQueryReturnType<selectData, EstimateFeesPerGasErrorType>;
/** https://wagmi.sh/react/api/hooks/useEstimateFeesPerGas */
export declare function useEstimateFeesPerGas<config extends Config = ResolvedRegister['config'], type extends FeeValuesType = 'eip1559', selectData = EstimateFeesPerGasData<type>>(parameters?: UseEstimateFeesPerGasParameters<type, config, selectData>): UseEstimateFeesPerGasReturnType<type, selectData>;
//# sourceMappingURL=useEstimateFeesPerGas.d.ts.map