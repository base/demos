export interface SnackControllerState {
    message: string;
    variant: 'error' | 'success' | 'loading';
    svg?: {
        iconColor: string;
        icon: string;
    };
    open: boolean;
    autoClose: boolean;
}
export type SnackControllerShowOptions = {
    autoClose?: boolean;
    svg?: SnackControllerState['svg'];
    variant?: SnackControllerState['variant'];
};
type StateKey = keyof SnackControllerState;
export declare const SnackController: {
    state: SnackControllerState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: SnackControllerState[K]) => void): () => void;
    showLoading(message: SnackControllerState["message"], options?: SnackControllerShowOptions): void;
    showSuccess(message: SnackControllerState["message"]): void;
    showSvg(message: SnackControllerState["message"], svg: NonNullable<SnackControllerState["svg"]>): void;
    showError(message: unknown): void;
    hide(): void;
    _showMessage({ message, svg, variant, autoClose }: {
        message: string;
    } & SnackControllerShowOptions): void;
};
export {};
