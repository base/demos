import { h } from "@stencil/core";
import { WidgetWrapper } from "../widget-wrapper/widget-wrapper";
import AdvantagesListItem from "../misc/AdvantagesListItem";
import WalletIcon from "../misc/WalletIcon";
import HeartIcon from "../misc/HeartIcon";
import LockIcon from "../misc/LockIcon";
import InstallIcon from "../misc/InstallIcon";
import SDKVersion from "../misc/SDKVersion";
import CloseButton from "../misc/CloseButton";
import Logo from "../misc/Logo";
import encodeQR from "@paulmillr/qr";
import { SimpleI18n } from "../misc/simple-i18n";
import { TrackingEvents } from "../misc/tracking-events";
export class InstallModal {
    constructor() {
        this.link = undefined;
        this.sdkVersion = undefined;
        this.preferDesktop = undefined;
        this.tab = 1;
        this.isDefaultTab = true;
        this.translationsLoaded = false;
        this.onClose = this.onClose.bind(this);
        this.onStartDesktopOnboardingHandler = this.onStartDesktopOnboardingHandler.bind(this);
        this.setTab = this.setTab.bind(this);
        this.render = this.render.bind(this);
        this.setTab(this.preferDesktop ? 1 : 2);
        this.i18nInstance = new SimpleI18n();
    }
    componentDidLoad() {
        this.trackAnalytics.emit({
            event: TrackingEvents.SDK_MODAL_VIEWED,
            params: {
                extensionInstalled: false,
                tab: this.tab === 1 ? 'desktop' : 'mobile',
            },
        });
    }
    async connectedCallback() {
        await this.i18nInstance.init({
            fallbackLng: 'en'
        });
        this.translationsLoaded = true;
    }
    updatePreferDesktop(newValue) {
        if (newValue) {
            this.setTab(1);
        }
        else {
            this.setTab(2);
        }
    }
    onClose(shouldTerminate = false) {
        this.close.emit({ shouldTerminate });
    }
    onStartDesktopOnboardingHandler() {
        this.trackAnalytics.emit({
            event: TrackingEvents.SDK_MODAL_BUTTON_CLICKED,
            params: {
                button_type: 'install_extension',
                tab: 'desktop',
            },
        });
        this.startDesktopOnboarding.emit();
    }
    setTab(newTab, isUserAction = false) {
        if (isUserAction) {
            this.trackAnalytics.emit({
                event: TrackingEvents.SDK_MODAL_TOGGLE_CHANGED,
                params: {
                    toggle: this.tab === 1 ? 'desktop_to_mobile' : 'mobile_to_desktop',
                },
            });
        }
        this.tab = newTab;
        this.isDefaultTab = false;
    }
    render() {
        if (!this.translationsLoaded) {
            return null; // or a loading state
        }
        const t = (key) => this.i18nInstance.t(key);
        const currentTab = this.isDefaultTab ? this.preferDesktop ? 1 : 2 : this.tab;
        const svgElement = encodeQR(this.link, "svg", {
            ecc: "medium",
            scale: 2
        });
        return (h(WidgetWrapper, { className: "install-model" }, h("div", { class: 'backdrop', onClick: () => this.onClose(true) }), h("div", { class: 'modal' }, h("div", { class: 'closeButtonContainer' }, h("div", { class: 'right' }, h("span", { class: 'closeButton', onClick: () => this.onClose(true) }, h(CloseButton, null)))), h("div", { class: 'logoContainer' }, h(Logo, null)), h("div", null, h("div", { class: 'tabcontainer' }, h("div", { class: 'flexContainer' }, h("div", { onClick: () => this.setTab(1, true), class: `tab flexItem ${currentTab === 1 ? 'tabactive' : ''}` }, t('DESKTOP')), h("div", { onClick: () => this.setTab(2, true), class: `tab flexItem ${currentTab === 2 ? 'tabactive' : ''}` }, t('MOBILE')))), h("div", { style: { display: currentTab === 1 ? 'none' : 'block' } }, h("div", { class: 'flexContainer' }, h("div", { class: 'flexItem', style: {
                textAlign: 'center',
                marginTop: '4',
            } }, svgElement && (h("div", { id: "sdk-mm-qrcode", class: 'center', innerHTML: svgElement })), h("div", { class: 'connectMobileText' }, t('SCAN_TO_CONNECT'), " ", h("br", null), h("span", { class: 'blue' }, h("b", null, t('META_MASK_MOBILE_APP'))))))), h("div", { style: { display: currentTab === 2 ? 'none' : 'block' } }, h("div", { class: 'item' }, h(AdvantagesListItem, { Icon: HeartIcon, text: t('INSTALL_MODAL.TRUSTED_BY_USERS') })), h("div", { class: 'item' }, h(AdvantagesListItem, { Icon: WalletIcon, text: t('INSTALL_MODAL.LEADING_CRYPTO_WALLET') })), h("div", { class: 'item' }, h(AdvantagesListItem, { Icon: LockIcon, text: t('INSTALL_MODAL.CONTROL_DIGITAL_INTERACTIONS') })), h("button", { class: 'button', onClick: () => this.onStartDesktopOnboardingHandler() }, h(InstallIcon, null), h("span", { class: 'installExtensionText' }, t('INSTALL_MODAL.INSTALL_META_MASK_EXTENSION'))))), h(SDKVersion, { version: this.sdkVersion }))));
    }
    static get is() { return "mm-install-modal"; }
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
                "method": "startDesktopOnboarding",
                "name": "startDesktopOnboarding",
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
            }, {
                "method": "trackAnalytics",
                "name": "trackAnalytics",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ event: TrackingEvents, params?: Record<string, unknown> }",
                    "resolved": "{ event: TrackingEvents; params?: Record<string, unknown> | undefined; }",
                    "references": {
                        "TrackingEvents": {
                            "location": "import",
                            "path": "../misc/tracking-events",
                            "id": "src/components/misc/tracking-events.ts::TrackingEvents"
                        },
                        "Record": {
                            "location": "global",
                            "id": "global::Record"
                        }
                    }
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
//# sourceMappingURL=mm-install-modal.js.map
