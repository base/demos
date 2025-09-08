var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { AlertController, ConnectorController, ConstantsUtil, OptionsController, RouterController } from '@reown/appkit-controllers';
import { executeSocialLogin } from '@reown/appkit-controllers/utils';
import { CoreHelperUtil } from '@reown/appkit-controllers/utils';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-social';
import { W3mFrameProvider } from '@reown/appkit-wallet';
import styles from './styles.js';
let W3mSocialLoginList = class W3mSocialLoginList extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        this.remoteFeatures = OptionsController.state.remoteFeatures;
        this.isPwaLoading = false;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => {
            this.connectors = val;
            this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        }), OptionsController.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)));
    }
    connectedCallback() {
        super.connectedCallback();
        this.handlePwaFrameLoad();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        let socials = this.remoteFeatures?.socials || [];
        const isAuthConnectorExist = Boolean(this.authConnector);
        const isSocialsEnabled = socials?.length;
        const isConnectSocialsView = RouterController.state.view === 'ConnectSocials';
        if ((!isAuthConnectorExist || !isSocialsEnabled) && !isConnectSocialsView) {
            return null;
        }
        if (isConnectSocialsView && !isSocialsEnabled) {
            socials = ConstantsUtil.DEFAULT_SOCIALS;
        }
        return html ` <wui-flex flexDirection="column" gap="xs">
      ${socials.map(social => html `<wui-list-social
            @click=${() => {
            this.onSocialClick(social);
        }}
            data-testid=${`social-selector-${social}`}
            name=${social}
            logo=${social}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`;
    }
    async onSocialClick(socialProvider) {
        if (socialProvider) {
            await executeSocialLogin(socialProvider);
        }
    }
    async handlePwaFrameLoad() {
        if (CoreHelperUtil.isPWA()) {
            this.isPwaLoading = true;
            try {
                if (this.authConnector?.provider instanceof W3mFrameProvider) {
                    await this.authConnector.provider.init();
                }
            }
            catch (error) {
                AlertController.open({
                    shortMessage: 'Error loading embedded wallet in PWA',
                    longMessage: error.message
                }, 'error');
            }
            finally {
                this.isPwaLoading = false;
            }
        }
    }
};
W3mSocialLoginList.styles = styles;
__decorate([
    property()
], W3mSocialLoginList.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mSocialLoginList.prototype, "connectors", void 0);
__decorate([
    state()
], W3mSocialLoginList.prototype, "authConnector", void 0);
__decorate([
    state()
], W3mSocialLoginList.prototype, "remoteFeatures", void 0);
__decorate([
    state()
], W3mSocialLoginList.prototype, "isPwaLoading", void 0);
W3mSocialLoginList = __decorate([
    customElement('w3m-social-login-list')
], W3mSocialLoginList);
export { W3mSocialLoginList };
//# sourceMappingURL=index.js.map