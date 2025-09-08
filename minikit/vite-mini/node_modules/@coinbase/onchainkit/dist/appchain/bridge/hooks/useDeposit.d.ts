import { UseDepositParams } from '../types';
export declare function useDeposit(): {
    deposit: ({ config, from, bridgeParams }: UseDepositParams) => Promise<void>;
    depositStatus: "error" | "idle" | "depositPending" | "depositSuccess" | "depositRejected";
    transactionHash: `0x${string}` | undefined;
    resetDepositStatus: () => void;
};
//# sourceMappingURL=useDeposit.d.ts.map