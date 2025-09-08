import { LifecycleEvents, LifecycleStatus } from '../types';
export declare const useEmitLifecycleStatus: ({ onError, onSuccess, onStatus, }: LifecycleEvents) => {
    lifecycleStatus: LifecycleStatus;
    updateLifecycleStatus: (newStatus: ({
        statusName: "transactionPending";
    } & {
        statusData?: {} | undefined;
    }) | ({
        statusName: "init";
    } & {
        statusData: null;
    }) | ({
        statusName: "exit";
    } & {
        statusData?: {} | undefined;
    }) | ({
        statusName: "error";
    } & {
        statusData?: {
            code?: string | undefined;
            errorType?: "internal_error" | "handled_error" | "network_error" | "unknown_error" | undefined;
            debugMessage?: string | undefined;
        } | undefined;
    }) | ({
        statusName: "transactionSuccess";
    } & {
        statusData?: {
            chainId?: string | undefined;
            assetImageUrl?: string | undefined;
            assetName?: string | undefined;
            assetSymbol?: string | undefined;
        } | undefined;
    })) => void;
};
//# sourceMappingURL=useEmitLifecycleStatus.d.ts.map