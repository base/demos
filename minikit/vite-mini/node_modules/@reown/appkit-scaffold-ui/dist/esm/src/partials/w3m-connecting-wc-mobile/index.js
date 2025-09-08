var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { state } from 'lit/decorators.js';
import { ConnectionController, ConstantsUtil, CoreHelperUtil, EventsController, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
let W3mConnectingWcMobile = class W3mConnectingWcMobile extends W3mConnectingWidget {
    constructor() {
        super();
        this.btnLabelTimeout = undefined;
        this.redirectDeeplink = undefined;
        this.redirectUniversalLink = undefined;
        this.target = undefined;
        this.preferUniversalLinks = OptionsController.state.experimental_preferUniversalLinks;
        this.isLoading = true;
        this.onConnect = () => {
            if (this.wallet?.mobile_link && this.uri) {
                try {
                    this.error = false;
                    const { mobile_link, link_mode, name } = this.wallet;
                    const { redirect, redirectUniversalLink, href } = CoreHelperUtil.formatNativeUrl(mobile_link, this.uri, link_mode);
                    this.redirectDeeplink = redirect;
                    this.redirectUniversalLink = redirectUniversalLink;
                    this.target = CoreHelperUtil.isIframe() ? '_top' : '_self';
                    ConnectionController.setWcLinking({ name, href });
                    ConnectionController.setRecentWallet(this.wallet);
                    if (this.preferUniversalLinks && this.redirectUniversalLink) {
                        CoreHelperUtil.openHref(this.redirectUniversalLink, this.target);
                    }
                    else {
                        CoreHelperUtil.openHref(this.redirectDeeplink, this.target);
                    }
                }
                catch (e) {
                    EventsController.sendEvent({
                        type: 'track',
                        event: 'CONNECT_PROXY_ERROR',
                        properties: {
                            message: e instanceof Error ? e.message : 'Error parsing the deeplink',
                            uri: this.uri,
                            mobile_link: this.wallet.mobile_link,
                            name: this.wallet.name
                        }
                    });
                    this.error = true;
                }
            }
        };
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-mobile: No wallet provided');
        }
        this.secondaryBtnLabel = 'Open';
        this.secondaryLabel = ConstantsUtil.CONNECT_LABELS.MOBILE;
        this.secondaryBtnIcon = 'externalLink';
        this.onHandleURI();
        this.unsubscribe.push(ConnectionController.subscribeKey('wcUri', () => {
            this.onHandleURI();
        }));
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'mobile' }
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this.btnLabelTimeout);
    }
    onHandleURI() {
        this.isLoading = !this.uri;
        if (!this.ready && this.uri) {
            this.ready = true;
            this.onConnect?.();
        }
    }
    onTryAgain() {
        ConnectionController.setWcError(false);
        this.onConnect?.();
    }
};
__decorate([
    state()
], W3mConnectingWcMobile.prototype, "redirectDeeplink", void 0);
__decorate([
    state()
], W3mConnectingWcMobile.prototype, "redirectUniversalLink", void 0);
__decorate([
    state()
], W3mConnectingWcMobile.prototype, "target", void 0);
__decorate([
    state()
], W3mConnectingWcMobile.prototype, "preferUniversalLinks", void 0);
__decorate([
    state()
], W3mConnectingWcMobile.prototype, "isLoading", void 0);
W3mConnectingWcMobile = __decorate([
    customElement('w3m-connecting-wc-mobile')
], W3mConnectingWcMobile);
export { W3mConnectingWcMobile };
//# sourceMappingURL=index.js.map