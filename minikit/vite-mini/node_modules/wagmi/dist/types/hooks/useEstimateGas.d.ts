import type { Config, EstimateGasErrorType, ResolvedRegister } from '@wagmi/core';
import { type EstimateGasData, type EstimateGasOptions, type EstimateGasQueryFnData, type EstimateGasQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseEstimateGasParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = EstimateGasData> = EstimateGasOptions<config, chainId> & ConfigParameter<config> & QueryParameter<EstimateGasQueryFnData, EstimateGasErrorType, selectData, EstimateGasQueryKey<config, chainId>>;
export type UseEstimateGasReturnType<selectData = EstimateGasData> = UseQueryReturnType<selectData, EstimateGasErrorType>;
/** https://wagmi.sh/react/api/hooks/useEstimateGas */
export declare function useEstimateGas<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] | undefined = undefined, selectData = EstimateGasData>(parameters?: UseEstimateGasParameters<config, chainId, selectData>): UseEstimateGasReturnType<selectData>;
//# sourceMappingURL=useEstimateGas.d.ts.map