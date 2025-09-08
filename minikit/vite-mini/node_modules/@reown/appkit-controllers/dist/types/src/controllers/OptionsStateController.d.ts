export interface OptionsStateControllerState {
    isLegalCheckboxChecked: boolean;
}
type StateKey = keyof OptionsStateControllerState;
export declare const OptionsStateController: {
    state: OptionsStateControllerState;
    subscribe(callback: (newState: OptionsStateControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: OptionsStateControllerState[K]) => void): () => void;
    setIsLegalCheckboxChecked(isLegalCheckboxChecked: boolean): void;
};
export {};
