import { WalletLinkEventData } from '../type/WalletLinkEventData.js';
import { WalletLinkSession } from '../type/WalletLinkSession.js';
import { Web3Response } from '../type/Web3Response.js';
export interface WalletLinkConnectionUpdateListener {
    linkedUpdated: (linked: boolean) => void;
    handleWeb3ResponseMessage: (id: string, response: Web3Response) => void;
    chainUpdated: (chainId: string, jsonRpcUrl: string) => void;
    accountUpdated: (selectedAddress: string) => void;
    metadataUpdated: (key: string, metadataValue: string) => void;
    resetAndReload: () => void;
}
interface WalletLinkConnectionParams {
    session: WalletLinkSession;
    linkAPIUrl: string;
    listener: WalletLinkConnectionUpdateListener;
}
/**
 * Coinbase Wallet Connection
 */
export declare class WalletLinkConnection {
    private destroyed;
    private lastHeartbeatResponse;
    private nextReqId;
    private heartbeatIntervalId?;
    private reconnectAttempts;
    private visibilityChangeHandler?;
    private focusHandler?;
    private activeWsInstance?;
    private isReconnecting;
    private readonly session;
    private listener?;
    private cipher;
    private ws;
    private http;
    private readonly linkAPIUrl;
    private readonly WebSocketClass;
    /**
     * Constructor
     * @param session Session
     * @param linkAPIUrl Coinbase Wallet link server URL
     * @param listener WalletLinkConnectionUpdateListener
     * @param [WebSocketClass] Custom WebSocket implementation
     */
    constructor({ session, linkAPIUrl, listener }: WalletLinkConnectionParams);
    private createWebSocket;
    private setupVisibilityChangeHandler;
    private reconnectWithFreshWebSocket;
    /**
     * Make a connection to the server
     */
    connect(): void;
    /**
     * Terminate connection, and mark as destroyed. To reconnect, create a new
     * instance of WalletSDKConnection
     */
    destroy(): Promise<void>;
    /**
     * true if connected and authenticated, else false
     * runs listener when connected status changes
     */
    private _connected;
    private get connected();
    private set connected(value);
    /**
     * true if linked (a guest has joined before)
     * runs listener when linked status changes
     */
    private _linked;
    private get linked();
    private set linked(value);
    /**
     * Execute once when linked
     */
    private onceLinked?;
    private setOnceLinked;
    private handleIncomingEvent;
    checkUnseenEvents(): Promise<void>;
    private fetchUnseenEventsAPI;
    /**
     * Publish an event and emit event ID when successful
     * @param event event name
     * @param unencryptedData unencrypted event data
     * @param callWebhook whether the webhook should be invoked
     * @returns a Promise that emits event ID when successful
     */
    publishEvent(event: string, unencryptedData: WalletLinkEventData, callWebhook?: boolean): Promise<string>;
    private sendData;
    private updateLastHeartbeat;
    private heartbeat;
    private requestResolutions;
    private makeRequest;
    private handleConnected;
    private handleSessionMetadataUpdated;
    private handleDestroyed;
    private handleAccountUpdated;
    private handleMetadataUpdated;
    private handleWalletUsernameUpdated;
    private handleAppVersionUpdated;
    private handleChainUpdated;
}
export {};
//# sourceMappingURL=WalletLinkConnection.d.ts.map