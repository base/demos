import { Call } from '../../transaction/types';
import { Address } from 'viem';
export type UseBuildWithdrawFromMorphoTxParams = {
    vaultAddress: Address;
    recipientAddress?: Address;
    amount: string;
    tokenDecimals: number | undefined;
};
/**
 * Generates Call[] for a Morpho withdraw transaction
 * to be used with <Transaction />
 */
export declare function useBuildWithdrawFromMorphoTx({ vaultAddress, amount, recipientAddress, tokenDecimals, }: UseBuildWithdrawFromMorphoTxParams): {
    calls: Call[];
};
//# sourceMappingURL=useBuildWithdrawFromMorphoTx.d.ts.map