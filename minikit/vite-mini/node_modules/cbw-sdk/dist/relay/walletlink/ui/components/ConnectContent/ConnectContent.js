"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinbaseWalletSteps = exports.ConnectContent = void 0;
const clsx_1 = __importDefault(require("clsx"));
const preact_1 = require("preact");
const util_1 = require("../../../../../core/util");
const version_1 = require("../../../../../version");
const CloseIcon_1 = require("../icons/CloseIcon");
const CoinbaseWalletRound_1 = require("../icons/CoinbaseWalletRound");
const QRCodeIcon_1 = require("../icons/QRCodeIcon");
const QRCode_1 = require("../QRCode");
const Spinner_1 = require("../Spinner/Spinner");
const ConnectContent_css_1 = __importDefault(require("./ConnectContent-css"));
const wallet = {
    title: 'Coinbase Wallet app',
    description: 'Connect with your self-custody wallet',
    steps: CoinbaseWalletSteps,
};
const makeIconColor = (theme) => {
    return theme === 'light' ? '#FFFFFF' : '#0A0B0D';
};
function ConnectContent(props) {
    const { theme } = props;
    const qrUrl = (0, util_1.createQrUrl)(props.sessionId, props.sessionSecret, props.linkAPIUrl, props.isParentConnection, props.version, props.chainId);
    const WalletSteps = wallet.steps;
    return ((0, preact_1.h)("div", { "data-testid": "connect-content", className: (0, clsx_1.default)('-cbwsdk-connect-content', theme) },
        (0, preact_1.h)("style", null, ConnectContent_css_1.default),
        (0, preact_1.h)("div", { className: "-cbwsdk-connect-content-header" },
            (0, preact_1.h)("h2", { className: (0, clsx_1.default)('-cbwsdk-connect-content-heading', theme) }, "Scan to connect with our mobile app"),
            props.onCancel && ((0, preact_1.h)("button", { type: "button", className: '-cbwsdk-cancel-button', onClick: props.onCancel },
                (0, preact_1.h)(CloseIcon_1.CloseIcon, { fill: theme === 'light' ? '#0A0B0D' : '#FFFFFF' })))),
        (0, preact_1.h)("div", { className: "-cbwsdk-connect-content-layout" },
            (0, preact_1.h)("div", { className: "-cbwsdk-connect-content-column-left" },
                (0, preact_1.h)(ConnectItem, { title: wallet.title, description: wallet.description, theme: theme })),
            (0, preact_1.h)("div", { className: "-cbwsdk-connect-content-column-right" },
                (0, preact_1.h)("div", { className: "-cbwsdk-connect-content-qr-wrapper" },
                    (0, preact_1.h)(QRCode_1.QRCode, { content: qrUrl, width: 200, height: 200, fgColor: "#000", bgColor: "transparent" }),
                    (0, preact_1.h)("input", { type: "hidden", name: "cbw-cbwsdk-version", value: version_1.LIB_VERSION }),
                    (0, preact_1.h)("input", { type: "hidden", value: qrUrl })),
                (0, preact_1.h)(WalletSteps, { theme: theme }),
                !props.isConnected && ((0, preact_1.h)("div", { "data-testid": "connecting-spinner", className: (0, clsx_1.default)('-cbwsdk-connect-content-qr-connecting', theme) },
                    (0, preact_1.h)(Spinner_1.Spinner, { size: 36, color: theme === 'dark' ? '#FFF' : '#000' }),
                    (0, preact_1.h)("p", null, "Connecting...")))))));
}
exports.ConnectContent = ConnectContent;
function ConnectItem({ title, description, theme }) {
    return ((0, preact_1.h)("div", { className: (0, clsx_1.default)('-cbwsdk-connect-item', theme) },
        (0, preact_1.h)("div", null,
            (0, preact_1.h)(CoinbaseWalletRound_1.CoinbaseWalletRound, null)),
        (0, preact_1.h)("div", { className: "-cbwsdk-connect-item-copy-wrapper" },
            (0, preact_1.h)("h3", { className: "-cbwsdk-connect-item-title" }, title),
            (0, preact_1.h)("p", { className: "-cbwsdk-connect-item-description" }, description))));
}
function CoinbaseWalletSteps({ theme }) {
    return ((0, preact_1.h)("ol", { className: "-cbwsdk-wallet-steps" },
        (0, preact_1.h)("li", { className: (0, clsx_1.default)('-cbwsdk-wallet-steps-item', theme) },
            (0, preact_1.h)("div", { className: "-cbwsdk-wallet-steps-item-wrapper" }, "Open Coinbase Wallet app")),
        (0, preact_1.h)("li", { className: (0, clsx_1.default)('-cbwsdk-wallet-steps-item', theme) },
            (0, preact_1.h)("div", { className: "-cbwsdk-wallet-steps-item-wrapper" },
                (0, preact_1.h)("span", null,
                    "Tap ",
                    (0, preact_1.h)("strong", null, "Scan"),
                    ' '),
                (0, preact_1.h)("span", { className: (0, clsx_1.default)('-cbwsdk-wallet-steps-pad-left', '-cbwsdk-wallet-steps-icon', theme) },
                    (0, preact_1.h)(QRCodeIcon_1.QRCodeIcon, { fill: makeIconColor(theme) }))))));
}
exports.CoinbaseWalletSteps = CoinbaseWalletSteps;
