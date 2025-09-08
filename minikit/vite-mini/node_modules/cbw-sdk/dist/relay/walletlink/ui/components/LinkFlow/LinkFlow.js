"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkFlow = void 0;
const preact_1 = require("preact");
const ConnectDialog_1 = require("../ConnectDialog/ConnectDialog");
class LinkFlow {
    constructor(options) {
        this.connected = false;
        this.chainId = 1;
        this.isOpen = false;
        this.onCancel = null;
        this.root = null;
        // if true, hide QR code in LinkFlow (which happens if no jsonRpcUrl is provided)
        this.connectDisabled = false;
        this.darkMode = options.darkMode;
        this.version = options.version;
        this.sessionId = options.sessionId;
        this.sessionSecret = options.sessionSecret;
        this.linkAPIUrl = options.linkAPIUrl;
        this.isParentConnection = options.isParentConnection;
    }
    attach(el) {
        this.root = document.createElement('div');
        this.root.className = '-cbwsdk-link-flow-root';
        el.appendChild(this.root);
        this.render();
    }
    setConnected(v) {
        if (this.connected !== v) {
            this.connected = v;
            this.render();
        }
    }
    setChainId(chainId) {
        if (this.chainId !== chainId) {
            this.chainId = chainId;
            this.render();
        }
    }
    detach() {
        var _a;
        if (!this.root) {
            return;
        }
        (0, preact_1.render)(null, this.root);
        (_a = this.root.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.root);
    }
    setConnectDisabled(connectDisabled) {
        this.connectDisabled = connectDisabled;
    }
    open(options) {
        this.isOpen = true;
        this.onCancel = options.onCancel;
        this.render();
    }
    close() {
        this.isOpen = false;
        this.onCancel = null;
        this.render();
    }
    render() {
        if (!this.root) {
            return;
        }
        (0, preact_1.render)((0, preact_1.h)(ConnectDialog_1.ConnectDialog, { darkMode: this.darkMode, version: this.version, sessionId: this.sessionId, sessionSecret: this.sessionSecret, linkAPIUrl: this.linkAPIUrl, isOpen: this.isOpen, isConnected: this.connected, isParentConnection: this.isParentConnection, chainId: this.chainId, onCancel: this.onCancel, connectDisabled: this.connectDisabled }), this.root);
    }
}
exports.LinkFlow = LinkFlow;
