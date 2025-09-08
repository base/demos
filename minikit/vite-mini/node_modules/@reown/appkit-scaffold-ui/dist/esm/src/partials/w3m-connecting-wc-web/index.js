var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { state } from 'lit/decorators.js';
import { ConnectionController, ConstantsUtil, CoreHelperUtil, EventsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
let W3mConnectingWcWeb = class W3mConnectingWcWeb extends W3mConnectingWidget {
    constructor() {
        super();
        this.isLoading = true;
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-web: No wallet provided');
        }
        this.onConnect = this.onConnectProxy.bind(this);
        this.secondaryBtnLabel = 'Open';
        this.secondaryLabel = ConstantsUtil.CONNECT_LABELS.MOBILE;
        this.secondaryBtnIcon = 'externalLink';
        this.updateLoadingState();
        this.unsubscribe.push(ConnectionController.subscribeKey('wcUri', () => {
            this.updateLoadingState();
        }));
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'web' }
        });
    }
    updateLoadingState() {
        this.isLoading = !this.uri;
    }
    onConnectProxy() {
        if (this.wallet?.webapp_link && this.uri) {
            try {
                this.error = false;
                const { webapp_link, name } = this.wallet;
                const { redirect, href } = CoreHelperUtil.formatUniversalUrl(webapp_link, this.uri);
                ConnectionController.setWcLinking({ name, href });
                ConnectionController.setRecentWallet(this.wallet);
                CoreHelperUtil.openHref(redirect, '_blank');
            }
            catch {
                this.error = true;
            }
        }
    }
};
__decorate([
    state()
], W3mConnectingWcWeb.prototype, "isLoading", void 0);
W3mConnectingWcWeb = __decorate([
    customElement('w3m-connecting-wc-web')
], W3mConnectingWcWeb);
export { W3mConnectingWcWeb };
//# sourceMappingURL=index.js.map