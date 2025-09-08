import { Call } from '../../transaction/types';
import { Address } from 'viem';
export type UseBuildDepositToMorphoTxParams = {
    vaultAddress: Address;
    recipientAddress?: Address;
    amount: string;
};
/**
 * Generates Call[] for a Morpho deposit transaction
 * to be used with <Transaction />
 */
export declare function useBuildDepositToMorphoTx({ vaultAddress, recipientAddress, amount, }: UseBuildDepositToMorphoTxParams): {
    calls: Call[];
};
//# sourceMappingURL=useBuildDepositToMorphoTx.d.ts.map