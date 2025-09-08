import { LifecycleStatus } from '../../swap/types';
type UseOnrampLifecycleParams = {
    updateLifecycleStatus: (status: LifecycleStatus) => void;
    maxSlippage: number;
    lifecycleStatus: LifecycleStatus;
};
export declare const useOnrampEventListeners: ({ updateLifecycleStatus, maxSlippage, lifecycleStatus, }: UseOnrampLifecycleParams) => {
    onPopupClose: () => void;
};
export {};
//# sourceMappingURL=useOnrampEventListeners.d.ts.map