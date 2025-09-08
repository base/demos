export interface LinkFlowOptions {
    darkMode: boolean;
    version: string;
    sessionId: string;
    sessionSecret: string;
    linkAPIUrl: string;
    isParentConnection: boolean;
}
export declare class LinkFlow {
    private readonly darkMode;
    private readonly version;
    private readonly sessionId;
    private readonly sessionSecret;
    private readonly linkAPIUrl;
    private readonly isParentConnection;
    private connected;
    private chainId;
    private isOpen;
    private onCancel;
    private root;
    private connectDisabled;
    constructor(options: Readonly<LinkFlowOptions>);
    attach(el: Element): void;
    setConnected(v: boolean): void;
    setChainId(chainId: number): void;
    detach(): void;
    setConnectDisabled(connectDisabled: boolean): void;
    open(options: {
        onCancel: () => void;
    }): void;
    close(): void;
    private render;
}
