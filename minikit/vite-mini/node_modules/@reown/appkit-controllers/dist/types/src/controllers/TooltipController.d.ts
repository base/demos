type TriggerRect = {
    width: number;
    height: number;
    top: number;
    left: number;
};
export interface TooltipControllerState {
    message: string;
    triggerRect: TriggerRect;
    open: boolean;
    variant: 'shade' | 'fill';
}
type StateKey = keyof TooltipControllerState;
export declare const TooltipController: {
    state: TooltipControllerState;
    subscribe(callback: (newState: TooltipControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: TooltipControllerState[K]) => void): () => void;
    showTooltip({ message, triggerRect, variant }: {
        message: string;
        triggerRect: TriggerRect;
        variant: "shade" | "fill";
    }): void;
    hide(): void;
};
export {};
