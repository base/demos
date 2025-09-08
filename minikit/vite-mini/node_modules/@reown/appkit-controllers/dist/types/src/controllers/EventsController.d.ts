import type { Event } from '../utils/TypeUtil.js';
export interface EventsControllerState {
    timestamp: number;
    reportedErrors: Record<string, boolean>;
    data: Event;
}
export declare const EventsController: {
    state: EventsControllerState;
    subscribe(callback: (newState: EventsControllerState) => void): () => void;
    getSdkProperties(): {
        projectId: string;
        st: "appkit";
        sv: import("../utils/TypeUtil.js").SdkVersion;
    };
    _sendAnalyticsEvent(payload: EventsControllerState): Promise<void>;
    sendEvent(data: EventsControllerState["data"]): void;
};
