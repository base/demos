import { type GetGasPriceErrorType as viem_GetGasPriceErrorType, type GetGasPriceReturnType as viem_GetGasPriceReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetGasPriceParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<ChainIdParameter<config, chainId>>;
export type GetGasPriceReturnType = viem_GetGasPriceReturnType;
export type GetGasPriceErrorType = viem_GetGasPriceErrorType;
/** https://wagmi.sh/core/api/actions/getGasPrice */
export declare function getGasPrice<config extends Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(config: config, parameters?: GetGasPriceParameters<config, chainId>): Promise<GetGasPriceReturnType>;
//# sourceMappingURL=getGasPrice.d.ts.map