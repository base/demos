import { type ChainNamespace } from '@reown/appkit-common';
import type { RouterControllerState } from './RouterController.js';
export interface ModalControllerState {
    loading: boolean;
    loadingNamespaceMap: Map<ChainNamespace, boolean>;
    open: boolean;
    shake: boolean;
    namespace: ChainNamespace | undefined;
}
export interface ModalControllerArguments {
    open: {
        view?: RouterControllerState['view'];
        namespace?: ChainNamespace;
        data?: RouterControllerState['data'];
    };
}
type StateKey = keyof ModalControllerState;
export declare const ModalController: {
    state: ModalControllerState;
    subscribe(callback: (newState: ModalControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: ModalControllerState[K]) => void): () => void;
    open(options?: ModalControllerArguments["open"]): Promise<void>;
    close(): void;
    setLoading(loading: ModalControllerState["loading"], namespace?: ChainNamespace): void;
    clearLoading(): void;
    shake(): void;
};
export {};
