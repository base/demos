import type { Chain } from 'viem';
import { type GetTransactionErrorType as viem_GetTransactionErrorType, type GetTransactionParameters as viem_GetTransactionParameters, type GetTransactionReturnType as viem_GetTransactionReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute, IsNarrowable } from '../types/utils.js';
export type GetTransactionParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<viem_GetTransactionParameters & ChainIdParameter<config, chainId>>;
export type GetTransactionReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = Compute<{
    [key in keyof chains]: viem_GetTransactionReturnType<IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined> & {
        chainId: chains[key]['id'];
    };
}[number]>;
export type GetTransactionErrorType = viem_GetTransactionErrorType;
/** https://wagmi.sh/core/api/actions/getTransaction */
export declare function getTransaction<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters: GetTransactionParameters<config, chainId>): Promise<GetTransactionReturnType<config, chainId>>;
//# sourceMappingURL=getTransaction.d.ts.map