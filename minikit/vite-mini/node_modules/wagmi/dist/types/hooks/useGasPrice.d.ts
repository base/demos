import type { Config, GetGasPriceErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetGasPriceData, type GetGasPriceOptions, type GetGasPriceQueryFnData, type GetGasPriceQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseGasPriceParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetGasPriceData> = Compute<GetGasPriceOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetGasPriceQueryFnData, GetGasPriceErrorType, selectData, GetGasPriceQueryKey<config, chainId>>>;
export type UseGasPriceReturnType<selectData = GetGasPriceData> = UseQueryReturnType<selectData, GetGasPriceErrorType>;
/** https://wagmi.sh/react/api/hooks/useGasPrice */
export declare function useGasPrice<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetGasPriceData>(parameters?: UseGasPriceParameters<config, chainId, selectData>): UseGasPriceReturnType<selectData>;
//# sourceMappingURL=useGasPrice.d.ts.map