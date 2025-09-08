import { Call } from '../../transaction/types';
import { Address } from 'viem';
export type WithdrawFromMorphoParams = {
    /** The address of the Morpho vault */
    vaultAddress: Address;
    /** The amount of tokens to withdraw */
    amount: bigint;
    /** The address to which the withdrawn funds will be sent */
    recipientAddress: Address;
};
export declare function buildWithdrawFromMorphoTx({ vaultAddress, amount, recipientAddress, }: WithdrawFromMorphoParams): Call[];
//# sourceMappingURL=buildWithdrawFromMorphoTx.d.ts.map