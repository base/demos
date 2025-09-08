import { type GetBlockTransactionCountErrorType as viem_GetBlockTransactionCountErrorType, type GetBlockTransactionCountParameters as viem_GetBlockTransactionCountParameters, type GetBlockTransactionCountReturnType as viem_GetBlockTransactionCountReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { UnionCompute } from '../types/utils.js';
export type GetBlockTransactionCountParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = UnionCompute<viem_GetBlockTransactionCountParameters & ChainIdParameter<config, chainId>>;
export type GetBlockTransactionCountReturnType = viem_GetBlockTransactionCountReturnType;
export type GetBlockTransactionCountErrorType = viem_GetBlockTransactionCountErrorType;
/** https://wagmi.sh/core/api/actions/getBlockTransactionCount */
export declare function getBlockTransactionCount<config extends Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(config: config, parameters?: GetBlockTransactionCountParameters<config, chainId>): Promise<GetBlockTransactionCountReturnType>;
//# sourceMappingURL=getBlockTransactionCount.d.ts.map