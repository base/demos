"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDialog = void 0;
const clsx_1 = __importDefault(require("clsx"));
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
const ConnectContent_1 = require("../ConnectContent/ConnectContent");
const TryExtensionContent_1 = require("../TryExtensionContent/TryExtensionContent");
const ConnectDialog_css_1 = __importDefault(require("./ConnectDialog-css"));
const ConnectDialog = (props) => {
    const { isOpen, darkMode } = props;
    const [containerHidden, setContainerHidden] = (0, hooks_1.useState)(!isOpen);
    const [dialogHidden, setDialogHidden] = (0, hooks_1.useState)(!isOpen);
    (0, hooks_1.useEffect)(() => {
        const timers = [
            window.setTimeout(() => {
                setDialogHidden(!isOpen);
            }, 10),
        ];
        if (isOpen) {
            setContainerHidden(false);
        }
        else {
            timers.push(window.setTimeout(() => {
                setContainerHidden(true);
            }, 360));
        }
        return () => {
            timers.forEach(window.clearTimeout);
        };
    }, [isOpen]);
    const theme = darkMode ? 'dark' : 'light';
    return ((0, preact_1.h)("div", { class: (0, clsx_1.default)('-cbwsdk-connect-dialog-container', containerHidden && '-cbwsdk-connect-dialog-container-hidden') },
        (0, preact_1.h)("style", null, ConnectDialog_css_1.default),
        (0, preact_1.h)("div", { class: (0, clsx_1.default)('-cbwsdk-connect-dialog-backdrop', theme, dialogHidden && '-cbwsdk-connect-dialog-backdrop-hidden') }),
        (0, preact_1.h)("div", { class: "-cbwsdk-connect-dialog" },
            (0, preact_1.h)("div", { class: (0, clsx_1.default)('-cbwsdk-connect-dialog-box', dialogHidden && '-cbwsdk-connect-dialog-box-hidden') },
                !props.connectDisabled ? ((0, preact_1.h)(ConnectContent_1.ConnectContent, { theme: theme, version: props.version, sessionId: props.sessionId, sessionSecret: props.sessionSecret, linkAPIUrl: props.linkAPIUrl, isConnected: props.isConnected, isParentConnection: props.isParentConnection, chainId: props.chainId, onCancel: props.onCancel })) : null,
                (0, preact_1.h)(TryExtensionContent_1.TryExtensionContent, { theme: theme })))));
};
exports.ConnectDialog = ConnectDialog;
