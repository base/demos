import type { Chain } from 'viem';
import { type WaitForTransactionReceiptErrorType as viem_WaitForTransactionReceiptErrorType, type WaitForTransactionReceiptParameters as viem_WaitForTransactionReceiptParameters, type WaitForTransactionReceiptReturnType as viem_WaitForTransactionReceiptReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute, IsNarrowable } from '../types/utils.js';
export type WaitForTransactionReceiptParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<viem_WaitForTransactionReceiptParameters & ChainIdParameter<config, chainId>>;
export type WaitForTransactionReceiptReturnType<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], chains extends readonly Chain[] = SelectChains<config, chainId>> = Compute<{
    [key in keyof chains]: viem_WaitForTransactionReceiptReturnType<IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined> & {
        chainId: chains[key]['id'];
    };
}[number]>;
export type WaitForTransactionReceiptErrorType = viem_WaitForTransactionReceiptErrorType;
export declare function waitForTransactionReceipt<config extends Config, chainId extends config['chains'][number]['id']>(config: config, parameters: WaitForTransactionReceiptParameters<config, chainId>): Promise<WaitForTransactionReceiptReturnType<config, chainId>>;
//# sourceMappingURL=waitForTransactionReceipt.d.ts.map