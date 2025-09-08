export type TelemetryErrorCategory = 'API_ERROR' | 'DATA_PARSING_ERROR' | 'SECURE_SITE_ERROR' | 'INTERNAL_SDK_ERROR';
export interface TelemetryEvent {
    type: 'error';
    event: string;
    properties: {
        errorType?: string;
        errorMessage?: string;
        stackTrace?: string;
        timestamp?: string;
    };
}
export interface TelemetryControllerState {
    enabled: boolean;
    events: TelemetryEvent[];
}
export declare const TelemetryController: {
    state: TelemetryControllerState;
    subscribeKey<K extends keyof TelemetryControllerState>(key: K, callback: (value: TelemetryControllerState[K]) => void): () => void;
    sendError(error: Error, category: TelemetryErrorCategory): Promise<void>;
    enable(): void;
    disable(): void;
    clearEvents(): void;
};
