"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryExtensionContent = void 0;
const clsx_1 = __importDefault(require("clsx"));
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
const ArrowLeftIcon_1 = require("../icons/ArrowLeftIcon");
const LaptopIcon_1 = require("../icons/LaptopIcon");
const SafeIcon_1 = require("../icons/SafeIcon");
const TryExtensionContent_css_1 = __importDefault(require("./TryExtensionContent-css"));
function TryExtensionContent({ theme }) {
    const [clicked, setClicked] = (0, hooks_1.useState)(false);
    const handleInstallClick = (0, hooks_1.useCallback)(() => {
        window.open('https://api.wallet.coinbase.com/rpc/v2/desktop/chrome', '_blank');
    }, []);
    const handleClick = (0, hooks_1.useCallback)(() => {
        if (clicked) {
            window.location.reload();
        }
        else {
            handleInstallClick();
            setClicked(true);
        }
    }, [handleInstallClick, clicked]);
    return ((0, preact_1.h)("div", { class: (0, clsx_1.default)('-cbwsdk-try-extension', theme) },
        (0, preact_1.h)("style", null, TryExtensionContent_css_1.default),
        (0, preact_1.h)("div", { class: "-cbwsdk-try-extension-column-half" },
            (0, preact_1.h)("h3", { class: (0, clsx_1.default)('-cbwsdk-try-extension-heading', theme) }, "Or try the Coinbase Wallet browser extension"),
            (0, preact_1.h)("div", { class: "-cbwsdk-try-extension-cta-wrapper" },
                (0, preact_1.h)("button", { class: (0, clsx_1.default)('-cbwsdk-try-extension-cta', theme), onClick: handleClick }, clicked ? 'Refresh' : 'Install'),
                (0, preact_1.h)("div", null, !clicked && ((0, preact_1.h)(ArrowLeftIcon_1.ArrowLeftIcon, { class: "-cbwsdk-try-extension-cta-icon", fill: theme === 'light' ? '#0052FF' : '#588AF5' }))))),
        (0, preact_1.h)("div", { class: "-cbwsdk-try-extension-column-half" },
            (0, preact_1.h)("ul", { class: "-cbwsdk-try-extension-list" },
                (0, preact_1.h)("li", { class: "-cbwsdk-try-extension-list-item" },
                    (0, preact_1.h)("div", { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                        (0, preact_1.h)("span", { class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-icon', theme) },
                            (0, preact_1.h)(LaptopIcon_1.LaptopIcon, { fill: theme === 'light' ? '#0A0B0D' : '#FFFFFF' }))),
                    (0, preact_1.h)("div", { class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-copy', theme) }, "Connect with dapps with just one click on your desktop browser")),
                (0, preact_1.h)("li", { class: "-cbwsdk-try-extension-list-item" },
                    (0, preact_1.h)("div", { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                        (0, preact_1.h)("span", { class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-icon', theme) },
                            (0, preact_1.h)(SafeIcon_1.SafeIcon, { fill: theme === 'light' ? '#0A0B0D' : '#FFFFFF' }))),
                    (0, preact_1.h)("div", { class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-copy', theme) }, "Add an additional layer of security by using a supported Ledger hardware wallet"))))));
}
exports.TryExtensionContent = TryExtensionContent;
