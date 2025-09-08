import { Call } from '../../transaction/types';
import { Address } from 'viem';
export type DepositToMorphoParams = {
    /** The address of the Morpho vault */
    vaultAddress: Address;
    /** The address of the token to deposit */
    tokenAddress: Address;
    /** The amount of tokens to deposit */
    amount: bigint;
    /** The address which can withdraw the deposited tokens */
    recipientAddress: Address;
};
export declare function buildDepositToMorphoTx({ vaultAddress, tokenAddress, amount, recipientAddress, }: DepositToMorphoParams): Call[];
//# sourceMappingURL=buildDepositToMorphoTx.d.ts.map