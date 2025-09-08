export interface AlertControllerState {
    message: string;
    variant: 'info' | 'success' | 'warning' | 'error';
    open: boolean;
}
type StateKey = keyof AlertControllerState;
interface OpenMessageParameters {
    shortMessage: string;
    longMessage?: string | (() => void);
}
export declare const AlertController: {
    state: AlertControllerState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: AlertControllerState[K]) => void): () => void;
    open(message: OpenMessageParameters, variant: AlertControllerState["variant"]): void;
    close(): void;
};
export {};
