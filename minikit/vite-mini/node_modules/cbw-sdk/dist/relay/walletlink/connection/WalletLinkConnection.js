"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLinkConnection = void 0;
const type_1 = require("../../../core/type");
const Cipher_1 = require("../../../lib/Cipher");
const DiagnosticLogger_1 = require("../../../provider/DiagnosticLogger");
const RelayAbstract_1 = require("../../RelayAbstract");
const Session_1 = require("../../Session");
const WalletLinkHTTP_1 = require("./WalletLinkHTTP");
const WalletLinkWebSocket_1 = require("./WalletLinkWebSocket");
const HEARTBEAT_INTERVAL = 10000;
const REQUEST_TIMEOUT = 60000;
/**
 * Coinbase Wallet Connection
 */
class WalletLinkConnection {
    /**
     * Constructor
     * @param session Session
     * @param linkAPIUrl Coinbase Wallet link server URL
     * @param listener WalletLinkConnectionUpdateListener
     * @param [WebSocketClass] Custom WebSocket implementation
     */
    constructor({ session, linkAPIUrl, listener, diagnostic, WebSocketClass = WebSocket, }) {
        this.destroyed = false;
        this.lastHeartbeatResponse = 0;
        this.nextReqId = (0, type_1.IntNumber)(1);
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
        this.shouldFetchUnseenEventsOnConnect = false;
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
                    'ChainId',
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
            var _a, _b;
            if (__destroyed !== '1')
                return;
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.resetAndReload();
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.METADATA_DESTROYED, {
                alreadyDestroyed: this.isDestroyed,
                sessionIdHash: Session_1.Session.hash(this.session.id),
            });
        };
        this.handleAccountUpdated = async (encryptedEthereumAddress) => {
            var _a, _b;
            try {
                const address = await this.cipher.decrypt(encryptedEthereumAddress);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.accountUpdated(address);
            }
            catch (_c) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                    message: 'Had error decrypting',
                    value: 'selectedAddress',
                });
            }
        };
        this.handleMetadataUpdated = async (key, encryptedMetadataValue) => {
            var _a, _b;
            try {
                const decryptedValue = await this.cipher.decrypt(encryptedMetadataValue);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.metadataUpdated(key, decryptedValue);
            }
            catch (_c) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                    message: 'Had error decrypting',
                    value: key,
                });
            }
        };
        this.handleWalletUsernameUpdated = async (walletUsername) => {
            this.handleMetadataUpdated(RelayAbstract_1.WALLET_USER_NAME_KEY, walletUsername);
        };
        this.handleAppVersionUpdated = async (appVersion) => {
            this.handleMetadataUpdated(RelayAbstract_1.APP_VERSION_KEY, appVersion);
        };
        this.handleChainUpdated = async (encryptedChainId, encryptedJsonRpcUrl) => {
            var _a, _b;
            try {
                const chainId = await this.cipher.decrypt(encryptedChainId);
                const jsonRpcUrl = await this.cipher.decrypt(encryptedJsonRpcUrl);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.chainUpdated(chainId, jsonRpcUrl);
            }
            catch (_c) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                    message: 'Had error decrypting',
                    value: 'chainId|jsonRpcUrl',
                });
            }
        };
        this.session = session;
        this.cipher = new Cipher_1.Cipher(session.secret);
        this.diagnostic = diagnostic;
        this.listener = listener;
        const ws = new WalletLinkWebSocket_1.WalletLinkWebSocket(`${linkAPIUrl}/rpc`, WebSocketClass);
        ws.setConnectionStateListener(async (state) => {
            var _a;
            // attempt to reconnect every 5 seconds when disconnected
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.CONNECTED_STATE_CHANGE, {
                state,
                sessionIdHash: Session_1.Session.hash(session.id),
            });
            let connected = false;
            switch (state) {
                case WalletLinkWebSocket_1.ConnectionState.DISCONNECTED:
                    // if DISCONNECTED and not destroyed
                    if (!this.destroyed) {
                        const connect = async () => {
                            // wait 5 seconds
                            await new Promise((resolve) => setTimeout(resolve, 5000));
                            // check whether it's destroyed again
                            if (!this.destroyed) {
                                // reconnect
                                ws.connect().catch(() => {
                                    connect();
                                });
                            }
                        };
                        connect();
                    }
                    break;
                case WalletLinkWebSocket_1.ConnectionState.CONNECTED:
                    // perform authentication upon connection
                    try {
                        // if CONNECTED, authenticate, and then check link status
                        await this.authenticate();
                        this.sendIsLinked();
                        this.sendGetSessionConfig();
                        connected = true;
                    }
                    catch (_b) {
                        /* empty */
                    }
                    // send heartbeat every n seconds while connected
                    // if CONNECTED, start the heartbeat timer
                    // first timer event updates lastHeartbeat timestamp
                    // subsequent calls send heartbeat message
                    this.updateLastHeartbeat();
                    setInterval(() => {
                        this.heartbeat();
                    }, HEARTBEAT_INTERVAL);
                    // check for unseen events
                    if (this.shouldFetchUnseenEventsOnConnect) {
                        this.fetchUnseenEventsAPI();
                    }
                    break;
                case WalletLinkWebSocket_1.ConnectionState.CONNECTING:
                    break;
            }
            // distinctUntilChanged
            if (this.connected !== connected) {
                this.connected = connected;
            }
        });
        ws.setIncomingDataListener((m) => {
            var _a, _b, _c;
            switch (m.type) {
                // handle server's heartbeat responses
                case 'Heartbeat':
                    this.updateLastHeartbeat();
                    return;
                // handle link status updates
                case 'IsLinkedOK':
                case 'Linked': {
                    const linked = m.type === 'IsLinkedOK' ? m.linked : undefined;
                    (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.LINKED, {
                        sessionIdHash: Session_1.Session.hash(session.id),
                        linked,
                        type: m.type,
                        onlineGuests: m.onlineGuests,
                    });
                    this.linked = linked || m.onlineGuests > 0;
                    break;
                }
                // handle session config updates
                case 'GetSessionConfigOK':
                case 'SessionConfigUpdated': {
                    (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.SESSION_CONFIG_RECEIVED, {
                        sessionIdHash: Session_1.Session.hash(session.id),
                        metadata_keys: m && m.metadata ? Object.keys(m.metadata) : undefined,
                    });
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
                (_c = this.requestResolutions.get(m.id)) === null || _c === void 0 ? void 0 : _c(m);
            }
        });
        this.ws = ws;
        this.http = new WalletLinkHTTP_1.WalletLinkHTTP(linkAPIUrl, session.id, session.key);
    }
    /**
     * Make a connection to the server
     */
    connect() {
        var _a;
        if (this.destroyed) {
            throw new Error('instance is destroyed');
        }
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.STARTED_CONNECTING, {
            sessionIdHash: Session_1.Session.hash(this.session.id),
        });
        this.ws.connect();
    }
    /**
     * Terminate connection, and mark as destroyed. To reconnect, create a new
     * instance of WalletSDKConnection
     */
    destroy() {
        var _a;
        this.destroyed = true;
        this.ws.disconnect();
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.DISCONNECTED, {
            sessionIdHash: Session_1.Session.hash(this.session.id),
        });
        this.listener = undefined;
    }
    get isDestroyed() {
        return this.destroyed;
    }
    get connected() {
        return this._connected;
    }
    set connected(connected) {
        var _a, _b;
        this._connected = connected;
        if (connected)
            (_a = this.onceConnected) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.listener) === null || _b === void 0 ? void 0 : _b.connectedUpdated(connected);
    }
    setOnceConnected(callback) {
        return new Promise((resolve) => {
            if (this.connected) {
                callback().then(resolve);
            }
            else {
                this.onceConnected = () => {
                    callback().then(resolve);
                    this.onceConnected = undefined;
                };
            }
        });
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
        var _a, _b;
        if (m.type !== 'Event' || m.event !== 'Web3Response') {
            return;
        }
        try {
            const decryptedData = await this.cipher.decrypt(m.data);
            const message = JSON.parse(decryptedData);
            if (message.type !== 'WEB3_RESPONSE')
                return;
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.handleWeb3ResponseMessage(message);
        }
        catch (_c) {
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                message: 'Had error decrypting',
                value: 'incomingEvent',
            });
        }
    }
    async checkUnseenEvents() {
        if (!this.connected) {
            this.shouldFetchUnseenEventsOnConnect = true;
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
        try {
            await this.fetchUnseenEventsAPI();
        }
        catch (e) {
            console.error('Unable to check for unseen events', e);
        }
    }
    async fetchUnseenEventsAPI() {
        this.shouldFetchUnseenEventsOnConnect = false;
        const responseEvents = await this.http.fetchUnseenEvents();
        responseEvents.forEach((e) => this.handleIncomingEvent(e));
    }
    /**
     * Set session metadata in SessionConfig object
     * @param key
     * @param value
     * @returns a Promise that completes when successful
     */
    async setSessionMetadata(key, value) {
        const message = {
            type: 'SetSessionConfig',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
            metadata: { [key]: value },
        };
        return this.setOnceConnected(async () => {
            const res = await this.makeRequest(message);
            if (res.type === 'Fail') {
                throw new Error(res.error || 'failed to set session metadata');
            }
        });
    }
    /**
     * Publish an event and emit event ID when successful
     * @param event event name
     * @param unencryptedData unencrypted event data
     * @param callWebhook whether the webhook should be invoked
     * @returns a Promise that emits event ID when successful
     */
    async publishEvent(event, unencryptedData, callWebhook = false) {
        const data = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, unencryptedData), { origin: location.origin, relaySource: window.coinbaseWalletExtension ? 'injected_sdk' : 'sdk' })));
        const message = {
            type: 'PublishEvent',
            id: (0, type_1.IntNumber)(this.nextReqId++),
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
        try {
            this.ws.sendData('h');
        }
        catch (_a) {
            // noop
        }
    }
    async makeRequest(message, timeout = REQUEST_TIMEOUT) {
        const reqId = message.id;
        this.sendData(message);
        // await server message with corresponding id
        let timeoutId;
        return Promise.race([
            new Promise((_, reject) => {
                timeoutId = window.setTimeout(() => {
                    reject(new Error(`request ${reqId} timed out`));
                }, timeout);
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
    async authenticate() {
        const m = {
            type: 'HostSession',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
            sessionKey: this.session.key,
        };
        const res = await this.makeRequest(m);
        if (res.type === 'Fail') {
            throw new Error(res.error || 'failed to authentcate');
        }
    }
    sendIsLinked() {
        const m = {
            type: 'IsLinked',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
        };
        this.sendData(m);
    }
    sendGetSessionConfig() {
        const m = {
            type: 'GetSessionConfig',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
        };
        this.sendData(m);
    }
}
exports.WalletLinkConnection = WalletLinkConnection;
