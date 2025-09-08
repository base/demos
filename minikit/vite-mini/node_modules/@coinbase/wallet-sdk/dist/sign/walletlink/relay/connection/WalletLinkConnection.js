// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
import { logWalletLinkConnectionConnectionFailed, logWalletLinkConnectionFetchUnseenEventsFailed, } from '../../../../core/telemetry/events/walletlink-signer.js';
import { IntNumber } from '../../../../core/type/index.js';
import { APP_VERSION_KEY, WALLET_USER_NAME_KEY } from '../constants.js';
import { WalletLinkCipher } from './WalletLinkCipher.js';
import { WalletLinkHTTP } from './WalletLinkHTTP.js';
import { ConnectionState, WalletLinkWebSocket } from './WalletLinkWebSocket.js';
const HEARTBEAT_INTERVAL = 10000;
const REQUEST_TIMEOUT = 60000;
/**
 * Coinbase Wallet Connection
 */
export class WalletLinkConnection {
    /**
     * Constructor
     * @param session Session
     * @param linkAPIUrl Coinbase Wallet link server URL
     * @param listener WalletLinkConnectionUpdateListener
     * @param [WebSocketClass] Custom WebSocket implementation
     */
    constructor({ session, linkAPIUrl, listener }) {
        this.destroyed = false;
        this.lastHeartbeatResponse = 0;
        this.nextReqId = IntNumber(1);
        this.reconnectAttempts = 0;
        this.isReconnecting = false;
        /**
         * true if connected and authenticated, else false
         * runs listener when connected status changes
         */
        this._connected = false;
        /**
         * true if linked (a guest has joined before)
         * runs listener when linked status changes
         */
        this._linked = false;
        this.requestResolutions = new Map();
        this.handleSessionMetadataUpdated = (metadata) => {
            if (!metadata)
                return;
            // Map of metadata key to handler function
            const handlers = new Map([
                ['__destroyed', this.handleDestroyed],
                ['EthereumAddress', this.handleAccountUpdated],
                ['WalletUsername', this.handleWalletUsernameUpdated],
                ['AppVersion', this.handleAppVersionUpdated],
                [
                    'ChainId', // ChainId and JsonRpcUrl are always updated together
                    (v) => metadata.JsonRpcUrl && this.handleChainUpdated(v, metadata.JsonRpcUrl),
                ],
            ]);
            // call handler for each metadata key if value is defined
            handlers.forEach((handler, key) => {
                const value = metadata[key];
                if (value === undefined)
                    return;
                handler(value);
            });
        };
        this.handleDestroyed = (__destroyed) => {
            var _a;
            if (__destroyed !== '1')
                return;
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.resetAndReload();
        };
        this.handleAccountUpdated = async (encryptedEthereumAddress) => {
            var _a;
            try {
                const address = await this.cipher.decrypt(encryptedEthereumAddress);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.accountUpdated(address);
            }
            catch (_b) {
                // Had error decrypting
            }
        };
        this.handleMetadataUpdated = async (key, encryptedMetadataValue) => {
            var _a;
            try {
                const decryptedValue = await this.cipher.decrypt(encryptedMetadataValue);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.metadataUpdated(key, decryptedValue);
            }
            catch (_b) {
                // Had error decrypting
            }
        };
        this.handleWalletUsernameUpdated = async (walletUsername) => {
            this.handleMetadataUpdated(WALLET_USER_NAME_KEY, walletUsername);
        };
        this.handleAppVersionUpdated = async (appVersion) => {
            this.handleMetadataUpdated(APP_VERSION_KEY, appVersion);
        };
        this.handleChainUpdated = async (encryptedChainId, encryptedJsonRpcUrl) => {
            var _a;
            try {
                const chainId = await this.cipher.decrypt(encryptedChainId);
                const jsonRpcUrl = await this.cipher.decrypt(encryptedJsonRpcUrl);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.chainUpdated(chainId, jsonRpcUrl);
            }
            catch (_b) {
                // Had error decrypting
            }
        };
        this.session = session;
        this.cipher = new WalletLinkCipher(session.secret);
        this.listener = listener;
        this.linkAPIUrl = linkAPIUrl;
        this.WebSocketClass = WebSocket;
        const ws = this.createWebSocket();
        this.ws = ws;
        this.http = new WalletLinkHTTP(linkAPIUrl, session.id, session.key);
        this.setupVisibilityChangeHandler();
    }
    createWebSocket() {
        const ws = new WalletLinkWebSocket(`${this.linkAPIUrl}/rpc`, this.WebSocketClass);
        // Track this as the active WebSocket instance
        this.activeWsInstance = ws;
        ws.setConnectionStateListener(async (state) => {
            // Ignore events from non-active WebSocket instances
            if (ws !== this.activeWsInstance) {
                return;
            }
            // attempt to reconnect every 5 seconds when disconnected
            let connected = false;
            switch (state) {
                case ConnectionState.DISCONNECTED:
                    // Clear heartbeat timer when disconnected
                    if (this.heartbeatIntervalId) {
                        clearInterval(this.heartbeatIntervalId);
                        this.heartbeatIntervalId = undefined;
                    }
                    // Reset lastHeartbeatResponse to prevent false timeout on reconnection
                    this.lastHeartbeatResponse = 0;
                    // Reset connected state to false on disconnect
                    connected = false;
                    // if DISCONNECTED and not destroyed, create a fresh WebSocket connection
                    if (!this.destroyed) {
                        const reconnect = async () => {
                            // Prevent multiple concurrent reconnection attempts
                            if (this.isReconnecting) {
                                return;
                            }
                            this.isReconnecting = true;
                            // 0 second delay on first attempt, then 3 seconds
                            const delay = this.reconnectAttempts === 0 ? 0 : 3000;
                            // wait before reconnecting
                            await new Promise((resolve) => setTimeout(resolve, delay));
                            // check whether it's destroyed again and ensure this is still the active instance
                            if (!this.destroyed && ws === this.activeWsInstance) {
                                this.reconnectAttempts++;
                                // Clean up the old WebSocket instance
                                if ('cleanup' in this.ws && typeof this.ws.cleanup === 'function') {
                                    this.ws.cleanup();
                                }
                                // Create a fresh WebSocket instance
                                this.ws = this.createWebSocket();
                                this.ws
                                    .connect()
                                    .catch(() => {
                                    // Reconnection failed, will retry
                                    logWalletLinkConnectionConnectionFailed();
                                })
                                    .finally(() => {
                                    this.isReconnecting = false;
                                });
                            }
                            else {
                                this.isReconnecting = false;
                            }
                        };
                        reconnect();
                    }
                    break;
                case ConnectionState.CONNECTED:
                    // Reset reconnect attempts on successful connection
                    this.reconnectAttempts = 0;
                    // perform authentication upon connection
                    try {
                        // if CONNECTED, authenticate, and then check link status
                        connected = await this.handleConnected();
                        // Always fetch unseen events when WebSocket state changes to CONNECTED
                        this.fetchUnseenEventsAPI().catch(() => {
                            // Failed to fetch unseen events after connection
                        });
                    }
                    catch (_error) {
                        // Don't set connected to true if authentication fails
                        break;
                    }
                    // Update connected state immediately after successful authentication
                    // This ensures heartbeats won't be skipped
                    this.connected = connected;
                    // send heartbeat every n seconds while connected
                    // if CONNECTED, start the heartbeat timer
                    // first timer event updates lastHeartbeat timestamp
                    // subsequent calls send heartbeat message
                    this.updateLastHeartbeat();
                    // Clear existing heartbeat timer
                    if (this.heartbeatIntervalId) {
                        clearInterval(this.heartbeatIntervalId);
                    }
                    this.heartbeatIntervalId = window.setInterval(() => {
                        this.heartbeat();
                    }, HEARTBEAT_INTERVAL);
                    // Send an immediate heartbeat
                    setTimeout(() => {
                        this.heartbeat();
                    }, 100);
                    break;
                case ConnectionState.CONNECTING:
                    break;
            }
            // Update connected state for DISCONNECTED and CONNECTING cases
            // For CONNECTED case, it's already set above
            if (state !== ConnectionState.CONNECTED) {
                this.connected = connected;
            }
        });
        ws.setIncomingDataListener((m) => {
            var _a;
            switch (m.type) {
                // handle server's heartbeat responses
                case 'Heartbeat':
                    this.updateLastHeartbeat();
                    return;
                // handle link status updates
                case 'IsLinkedOK':
                case 'Linked': {
                    const linked = m.type === 'IsLinkedOK' ? m.linked : undefined;
                    this.linked = linked || m.onlineGuests > 0;
                    break;
                }
                // handle session config updates
                case 'GetSessionConfigOK':
                case 'SessionConfigUpdated': {
                    this.handleSessionMetadataUpdated(m.metadata);
                    break;
                }
                case 'Event': {
                    this.handleIncomingEvent(m);
                    break;
                }
            }
            // resolve request promises
            if (m.id !== undefined) {
                (_a = this.requestResolutions.get(m.id)) === null || _a === void 0 ? void 0 : _a(m);
            }
        });
        return ws;
    }
    setupVisibilityChangeHandler() {
        this.visibilityChangeHandler = () => {
            if (!document.hidden && !this.destroyed) {
                if (!this.connected) {
                    // Force a fresh connection if we're disconnected
                    this.reconnectWithFreshWebSocket();
                }
                else {
                    // Otherwise send a heartbeat to check if connection is still alive
                    this.heartbeat();
                }
            }
        };
        // Handle focus events (when user switches back to the tab/app)
        this.focusHandler = () => {
            if (!this.destroyed && !this.connected) {
                this.reconnectWithFreshWebSocket();
            }
        };
        // Add event listeners
        document.addEventListener('visibilitychange', this.visibilityChangeHandler);
        window.addEventListener('focus', this.focusHandler);
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                if (this.focusHandler) {
                    this.focusHandler();
                }
            }
        });
    }
    reconnectWithFreshWebSocket() {
        if (this.destroyed)
            return;
        // Clear the active instance reference before disconnecting
        const oldWs = this.ws;
        this.activeWsInstance = undefined;
        // Disconnect current WebSocket
        oldWs.disconnect();
        // Clean up the old instance
        if ('cleanup' in oldWs && typeof oldWs.cleanup === 'function') {
            oldWs.cleanup();
        }
        // Create and connect fresh WebSocket
        this.ws = this.createWebSocket();
        this.ws.connect().catch(() => {
            // Fresh reconnection failed
            logWalletLinkConnectionConnectionFailed();
        });
    }
    /**
     * Make a connection to the server
     */
    connect() {
        if (this.destroyed) {
            throw new Error('instance is destroyed');
        }
        this.ws.connect();
    }
    /**
     * Terminate connection, and mark as destroyed. To reconnect, create a new
     * instance of WalletSDKConnection
     */
    async destroy() {
        if (this.destroyed)
            return;
        await this.makeRequest({
            type: 'SetSessionConfig',
            id: IntNumber(this.nextReqId++),
            sessionId: this.session.id,
            metadata: { __destroyed: '1' },
        }, { timeout: 1000 });
        this.destroyed = true;
        // Clear the active instance reference
        this.activeWsInstance = undefined;
        // Clear heartbeat timer
        if (this.heartbeatIntervalId) {
            clearInterval(this.heartbeatIntervalId);
            this.heartbeatIntervalId = undefined;
        }
        // Remove event listeners
        if (this.visibilityChangeHandler) {
            document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
        }
        if (this.focusHandler) {
            window.removeEventListener('focus', this.focusHandler);
        }
        this.ws.disconnect();
        // Call cleanup on the WebSocket instance if it has the method
        if ('cleanup' in this.ws && typeof this.ws.cleanup === 'function') {
            this.ws.cleanup();
        }
        this.listener = undefined;
    }
    get connected() {
        return this._connected;
    }
    set connected(connected) {
        this._connected = connected;
    }
    get linked() {
        return this._linked;
    }
    set linked(linked) {
        var _a, _b;
        this._linked = linked;
        if (linked)
            (_a = this.onceLinked) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.listener) === null || _b === void 0 ? void 0 : _b.linkedUpdated(linked);
    }
    setOnceLinked(callback) {
        return new Promise((resolve) => {
            if (this.linked) {
                callback().then(resolve);
            }
            else {
                this.onceLinked = () => {
                    callback().then(resolve);
                    this.onceLinked = undefined;
                };
            }
        });
    }
    async handleIncomingEvent(m) {
        var _a;
        if (m.type !== 'Event' || m.event !== 'Web3Response') {
            return;
        }
        try {
            const decryptedData = await this.cipher.decrypt(m.data);
            const message = JSON.parse(decryptedData);
            if (message.type !== 'WEB3_RESPONSE')
                return;
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.handleWeb3ResponseMessage(message.id, message.response);
        }
        catch (_error) {
            // Had error decrypting
        }
    }
    async checkUnseenEvents() {
        // Add a small delay to ensure any pending operations complete
        await new Promise((resolve) => setTimeout(resolve, 250));
        try {
            await this.fetchUnseenEventsAPI();
        }
        catch (e) {
            console.error('Unable to check for unseen events', e);
        }
    }
    async fetchUnseenEventsAPI() {
        try {
            const responseEvents = await this.http.fetchUnseenEvents();
            responseEvents.forEach((e) => {
                this.handleIncomingEvent(e);
            });
        }
        catch (_error) {
            // Failed to fetch unseen events
            logWalletLinkConnectionFetchUnseenEventsFailed();
        }
    }
    /**
     * Publish an event and emit event ID when successful
     * @param event event name
     * @param unencryptedData unencrypted event data
     * @param callWebhook whether the webhook should be invoked
     * @returns a Promise that emits event ID when successful
     */
    async publishEvent(event, unencryptedData, callWebhook = false) {
        const data = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, unencryptedData), { origin: location.origin, location: location.href, relaySource: 'coinbaseWalletExtension' in window && window.coinbaseWalletExtension
                ? 'injected_sdk'
                : 'sdk' })));
        const message = {
            type: 'PublishEvent',
            id: IntNumber(this.nextReqId++),
            sessionId: this.session.id,
            event,
            data,
            callWebhook,
        };
        return this.setOnceLinked(async () => {
            const res = await this.makeRequest(message);
            if (res.type === 'Fail') {
                throw new Error(res.error || 'failed to publish event');
            }
            return res.eventId;
        });
    }
    sendData(message) {
        this.ws.sendData(JSON.stringify(message));
    }
    updateLastHeartbeat() {
        this.lastHeartbeatResponse = Date.now();
    }
    heartbeat() {
        if (Date.now() - this.lastHeartbeatResponse > HEARTBEAT_INTERVAL * 2) {
            this.ws.disconnect();
            return;
        }
        // Only send heartbeat if we're connected
        if (!this.connected) {
            return;
        }
        try {
            this.ws.sendData('h');
        }
        catch (_error) {
            // Error sending heartbeat
        }
    }
    async makeRequest(message, options = { timeout: REQUEST_TIMEOUT }) {
        const reqId = message.id;
        this.sendData(message);
        // await server message with corresponding id
        let timeoutId;
        return Promise.race([
            new Promise((_, reject) => {
                timeoutId = window.setTimeout(() => {
                    reject(new Error(`request ${reqId} timed out`));
                }, options.timeout);
            }),
            new Promise((resolve) => {
                this.requestResolutions.set(reqId, (m) => {
                    clearTimeout(timeoutId); // clear the timeout
                    resolve(m);
                    this.requestResolutions.delete(reqId);
                });
            }),
        ]);
    }
    async handleConnected() {
        const res = await this.makeRequest({
            type: 'HostSession',
            id: IntNumber(this.nextReqId++),
            sessionId: this.session.id,
            sessionKey: this.session.key,
        });
        if (res.type === 'Fail') {
            return false;
        }
        this.sendData({
            type: 'IsLinked',
            id: IntNumber(this.nextReqId++),
            sessionId: this.session.id,
        });
        this.sendData({
            type: 'GetSessionConfig',
            id: IntNumber(this.nextReqId++),
            sessionId: this.session.id,
        });
        return true;
    }
}
//# sourceMappingURL=WalletLinkConnection.js.map