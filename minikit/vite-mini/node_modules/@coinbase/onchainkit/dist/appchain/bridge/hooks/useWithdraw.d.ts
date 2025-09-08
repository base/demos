import { Hex } from 'viem';
import { UseWithdrawParams } from '../types';
export declare const useWithdraw: ({ config, chain, bridgeParams, }: UseWithdrawParams) => {
    withdraw: () => Promise<`0x${string}` | undefined>;
    withdrawStatus: "error" | "idle" | "withdrawPending" | "withdrawSuccess" | "withdrawRejected" | "claimReady" | "claimPending" | "claimSuccess" | "claimRejected";
    waitForWithdrawal: (txHash?: Hex) => Promise<void>;
    proveAndFinalizeWithdrawal: () => Promise<void>;
    finalizedWithdrawalTxHash: `0x${string}` | undefined;
    resetWithdrawStatus: () => void;
};
//# sourceMappingURL=useWithdraw.d.ts.map