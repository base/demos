import type { W3mFrameTypes } from './W3mFrameTypes.js';
interface W3mFrameConfig {
    projectId: string;
    isAppClient?: boolean;
    chainId?: W3mFrameTypes.Network['chainId'];
    enableLogger?: boolean;
}
export declare class W3mFrame {
    private iframe;
    iframeIsReady: boolean;
    private projectId;
    private rpcUrl;
    frameLoadPromise: Promise<void>;
    frameLoadPromiseResolver: {
        resolve: (value: undefined) => void;
        reject: (reason?: unknown) => void;
    } | undefined;
    constructor({ projectId, isAppClient, chainId, enableLogger }: W3mFrameConfig);
    initFrame: () => void;
    get networks(): Record<string, W3mFrameTypes.Network>;
    events: {
        registerFrameEventHandler: (id: string, callback: (event: W3mFrameTypes.FrameEvent) => void, signal: AbortSignal) => void;
        onFrameEvent: (callback: (event: W3mFrameTypes.FrameEvent) => void) => void;
        onAppEvent: (callback: (event: W3mFrameTypes.AppEvent) => void) => void;
        postAppEvent: (event: W3mFrameTypes.AppEvent) => void;
        postFrameEvent: (event: W3mFrameTypes.FrameEvent) => void;
    };
}
export {};
