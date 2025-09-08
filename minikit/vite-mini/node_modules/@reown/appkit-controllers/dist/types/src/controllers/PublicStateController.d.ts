import type { CaipNetworkId, ChainNamespace } from '@reown/appkit-common';
export interface PublicStateControllerState {
    /**
     * @description Indicates if the AppKit is loading.
     * @type {boolean}
     */
    loading: boolean;
    /**
     * @description Indicates if the AppKit modal is open.
     * @type {boolean}
     */
    open: boolean;
    /**
     * @description Indicates the selected network id in CAIP-2 format.
     * @type {CaipNetworkId | undefined}
     */
    selectedNetworkId?: CaipNetworkId | undefined;
    /**
     * @description Indicates the active chain namespace.
     * @type {ChainNamespace | undefined}
     */
    activeChain?: ChainNamespace | undefined;
    /**
     * @description Indicates if the AppKit has been initialized. This sets to true when all controllers, adapters and internal state is ready.
     * @type {boolean}
     */
    initialized: boolean;
}
export declare const PublicStateController: {
    state: PublicStateControllerState;
    subscribe(callback: (newState: PublicStateControllerState) => void): () => void;
    subscribeOpen(callback: (newState: PublicStateControllerState["open"]) => void): () => void;
    set(newState: Partial<PublicStateControllerState>): void;
};
