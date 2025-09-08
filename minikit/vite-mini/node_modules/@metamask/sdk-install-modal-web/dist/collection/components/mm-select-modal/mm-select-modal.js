import { h } from "@stencil/core";
import { WidgetWrapper } from "../widget-wrapper/widget-wrapper";
import SDKVersion from "../misc/SDKVersion";
import CloseButton from "../misc/CloseButton";
import Logo from "../misc/Logo";
import ConnectIcon from "../misc/ConnectIcon";
import { MetamaskExtensionImage } from "../misc/MetamaskExtensionImage";
import encodeQR from "@paulmillr/qr";
import { SimpleI18n } from "../misc/simple-i18n";
export class SelectModal {
    constructor() {
        this.link = undefined;
        this.sdkVersion = undefined;
        this.preferDesktop = undefined;
        this.tab = 1;
        this.isDefaultTab = true;
        this.translationsLoaded = false;
        this.i18nInstance = new SimpleI18n();
        this.setTab(this.preferDesktop ? 1 : 2);
    }
    async connectedCallback() {
        await this.i18nInstance.init({
            fallbackLng: 'en'
        });
        this.translationsLoaded = true;
    }
    onClose(shouldTerminate = false) {
        this.close.emit({ shouldTerminate });
    }
    connectWithExtensionHandler() {
        this.connectWithExtension.emit();
    }
    setTab(tab) {
        this.tab = tab;
        this.isDefaultTab = false;
    }
    disconnectedCallback() {
        this.onClose();
    }
    updatePreferDesktop(newValue) {
        if (newValue) {
            this.setTab(1);
        }
        else {
            this.setTab(2);
        }
    }
    render() {
        if (!this.translationsLoaded) {
            return null;
        }
        const t = (key) => this.i18nInstance.t(key);
        const sdkVersion = this.sdkVersion;
        const currentTab = this.isDefaultTab ? this.preferDesktop ? 1 : 2 : this.tab;
        const svgElement = encodeQR(this.link, "svg", {
            ecc: "medium",
            scale: 2
        });
        return (h(WidgetWrapper, { className: "select-modal" }, h("div", { class: 'backdrop', onClick: () => this.onClose(true) }), h("div", { class: 'modal' }, h("div", { class: 'closeButtonContainer' }, h("div", { class: 'right' }, h("span", { class: 'closeButton', onClick: () => this.onClose(true) }, h(CloseButton, null)))), h("div", { class: 'logoContainer' }, h(Logo, null)), h("div", null, h("div", { class: 'tabcontainer' }, h("div", { class: 'flexContainer' }, h("div", { onClick: () => this.setTab(1), class: `tab flexItem ${currentTab === 1 ? 'tabactive' : ''}` }, t('DESKTOP')), h("div", { onClick: () => this.setTab(2), class: `tab flexItem ${currentTab === 2 ? 'tabactive' : ''}` }, t('MOBILE')))), h("div", { style: { display: currentTab === 1 ? 'none' : 'block' } }, h("div", { class: 'flexContainer' }, h("div", { class: 'flexItem', style: {
                textAlign: 'center',
                marginTop: '4',
            } }, h("div", { class: 'center', id: "sdk-mm-qrcode", innerHTML: svgElement }), h("div", { class: 'connectMobileText' }, t('SCAN_TO_CONNECT'), h("br", null), h("span", { class: 'blue' }, h("b", null, t('META_MASK_MOBILE_APP'))))))), h("div", { style: { display: currentTab === 2 ? 'none' : 'block' } }, h("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                height: '300',
                marginTop: '-20',
            } }, h(MetamaskExtensionImage, null)), h("div", { class: 'extensionLabel' }, t('SELECT_MODAL.CRYPTO_TAKE_CONTROL_TEXT')), h("button", { class: 'button', onClick: () => this.connectWithExtensionHandler() }, h(ConnectIcon, null), h("span", { class: 'installExtensionText' }, t('CONNECT_WITH_EXTENSION'))))), h(SDKVersion, { version: sdkVersion }))));
    }
    static get is() { return "mm-select-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["../style.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["../style.css"]
        };
    }
    static get properties() {
        return {
            "link": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The QR code link"
                },
                "attribute": "link",
                "reflect": false
            },
            "sdkVersion": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "sdk-version",
                "reflect": false
            },
            "preferDesktop": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "prefer-desktop",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "tab": {},
            "isDefaultTab": {},
            "translationsLoaded": {}
        };
    }
    static get events() {
        return [{
                "method": "close",
                "name": "close",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ shouldTerminate?: boolean }",
                    "resolved": "{ shouldTerminate?: boolean | undefined; }",
                    "references": {}
                }
            }, {
                "method": "connectWithExtension",
                "name": "connectWithExtension",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "preferDesktop",
                "methodName": "updatePreferDesktop"
            }];
    }
}
//# sourceMappingURL=mm-select-modal.js.map
