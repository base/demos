// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
export var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["DISCONNECTED"] = 0] = "DISCONNECTED";
    ConnectionState[ConnectionState["CONNECTING"] = 1] = "CONNECTING";
    ConnectionState[ConnectionState["CONNECTED"] = 2] = "CONNECTED";
})(ConnectionState || (ConnectionState = {}));
export class WalletLinkWebSocket {
    setConnectionStateListener(listener) {
        this.connectionStateListener = listener;
    }
    setIncomingDataListener(listener) {
        this.incomingDataListener = listener;
    }
    /**
     * Constructor
     * @param url WebSocket server URL
     * @param [WebSocketClass] Custom WebSocket implementation
     */
    constructor(url, WebSocketClass = WebSocket) {
        this.WebSocketClass = WebSocketClass;
        this.webSocket = null;
        this.isDisconnecting = false;
        this.url = url.replace(/^http/, 'ws');
        this.instanceId = WalletLinkWebSocket.instanceCounter++;
        WalletLinkWebSocket.activeInstances.add(this.instanceId);
    }
    /**
     * Make a websocket connection
     * @returns a Promise that resolves when connected
     */
    async connect() {
        if (this.webSocket) {
            throw new Error('webSocket object is not null');
        }
        if (this.isDisconnecting) {
            throw new Error('WebSocket is disconnecting, cannot reconnect on same instance');
        }
        return new Promise((resolve, reject) => {
            var _a;
            let webSocket;
            try {
                this.webSocket = webSocket = new this.WebSocketClass(this.url);
            }
            catch (err) {
                reject(err);
                return;
            }
            (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.CONNECTING);
            webSocket.onclose = (evt) => {
                var _a;
                this.clearWebSocket();
                // Only reject the connection promise if we haven't connected yet
                if (webSocket.readyState !== WebSocket.OPEN) {
                    reject(new Error(`websocket error ${evt.code}: ${evt.reason}`));
                }
                (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.DISCONNECTED);
            };
            webSocket.onopen = (_) => {
                var _a;
                resolve();
                (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.CONNECTED);
                if (WalletLinkWebSocket.pendingData.length > 0) {
                    const pending = [...WalletLinkWebSocket.pendingData];
                    pending.forEach((data) => this.sendData(data));
                    WalletLinkWebSocket.pendingData = [];
                }
            };
            webSocket.onmessage = (evt) => {
                var _a, _b;
                if (evt.data === 'h') {
                    (_a = this.incomingDataListener) === null || _a === void 0 ? void 0 : _a.call(this, {
                        type: 'Heartbeat',
                    });
                }
                else {
                    try {
                        const message = JSON.parse(evt.data);
                        (_b = this.incomingDataListener) === null || _b === void 0 ? void 0 : _b.call(this, message);
                    }
                    catch (_c) {
                    }
                }
            };
        });
    }
    /**
     * Disconnect from server
     */
    disconnect() {
        var _a;
        const { webSocket } = this;
        if (!webSocket) {
            return;
        }
        // Mark as disconnecting to prevent reconnection attempts on this instance
        this.isDisconnecting = true;
        this.clearWebSocket();
        // Clear listeners
        (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.DISCONNECTED);
        this.connectionStateListener = undefined;
        this.incomingDataListener = undefined;
        try {
            webSocket.close();
        }
        catch (_b) {
            // noop
        }
    }
    /**
     * Send data to server
     * @param data text to send
     */
    sendData(data) {
        const { webSocket } = this;
        if (!webSocket) {
            WalletLinkWebSocket.pendingData.push(data);
            if (!this.isDisconnecting) {
                this.connect();
            }
            return;
        }
        // Check if WebSocket is actually open before sending
        if (webSocket.readyState !== WebSocket.OPEN) {
            WalletLinkWebSocket.pendingData.push(data);
            return;
        }
        webSocket.send(data);
    }
    clearWebSocket() {
        const { webSocket } = this;
        if (!webSocket) {
            return;
        }
        this.webSocket = null;
        webSocket.onclose = null;
        webSocket.onerror = null;
        webSocket.onmessage = null;
        webSocket.onopen = null;
    }
    /**
     * remove ws from active instances
     */
    cleanup() {
        WalletLinkWebSocket.activeInstances.delete(this.instanceId);
    }
}
// used to differentiate instances
WalletLinkWebSocket.instanceCounter = 0;
WalletLinkWebSocket.activeInstances = new Set();
WalletLinkWebSocket.pendingData = [];
//# sourceMappingURL=WalletLinkWebSocket.js.map