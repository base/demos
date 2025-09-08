import { EventMetadata, OnrampError, SuccessEventData } from '../types';
type SetupOnrampEventListenersParams = {
    host?: string;
    onSuccess?: (data?: SuccessEventData) => void;
    onExit?: (error?: OnrampError) => void;
    onEvent?: (event: EventMetadata) => void;
};
/**
 * Subscribes to events from the Coinbase Onramp widget.
 * @param onEvent - Callback for when any event is received.
 * @param onExit - Callback for when an exit event is received.
 * @param onSuccess - Callback for when a success event is received.
 * @returns a function to unsubscribe from the event listener.
 */
export declare function setupOnrampEventListeners({ onEvent, onExit, onSuccess, host, }: SetupOnrampEventListenersParams): () => void;
export {};
//# sourceMappingURL=setupOnrampEventListeners.d.ts.map