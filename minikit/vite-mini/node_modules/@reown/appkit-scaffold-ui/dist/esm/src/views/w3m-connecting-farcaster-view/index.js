var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AccountController, ConnectionController, ConnectorController, CoreHelperUtil, EventsController, ModalController, RouterController, SnackController, StorageUtil, ThemeController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-loading-thumbnail';
import '@reown/appkit-ui/wui-logo';
import '@reown/appkit-ui/wui-qr-code';
import '@reown/appkit-ui/wui-shimmer';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mConnectingFarcasterView = class W3mConnectingFarcasterView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.timeout = undefined;
        this.socialProvider = AccountController.state.socialProvider;
        this.uri = AccountController.state.farcasterUrl;
        this.ready = false;
        this.loading = false;
        this.authConnector = ConnectorController.getAuthConnector();
        this.forceUpdate = () => {
            this.requestUpdate();
        };
        this.unsubscribe.push(...[
            AccountController.subscribeKey('farcasterUrl', val => {
                if (val) {
                    this.uri = val;
                    this.connectFarcaster();
                }
            }),
            AccountController.subscribeKey('socialProvider', val => {
                if (val) {
                    this.socialProvider = val;
                }
            })
        ]);
        window.addEventListener('resize', this.forceUpdate);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this.timeout);
        window.removeEventListener('resize', this.forceUpdate);
    }
    render() {
        this.onRenderProxy();
        return html `${this.platformTemplate()}`;
    }
    platformTemplate() {
        if (CoreHelperUtil.isMobile()) {
            return html `${this.mobileTemplate()}`;
        }
        return html `${this.desktopTemplate()}`;
    }
    desktopTemplate() {
        if (this.loading) {
            return html `${this.loadingTemplate()}`;
        }
        return html `${this.qrTemplate()}`;
    }
    qrTemplate() {
        return html ` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${['0', 'xl', 'xl', 'xl']}
      gap="xl"
    >
      <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

      <wui-text variant="paragraph-500" color="fg-100">
        Scan this QR Code with your phone
      </wui-text>
      ${this.copyTemplate()}
    </wui-flex>`;
    }
    loadingTemplate() {
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
    }
    mobileTemplate() {
        return html ` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${['3xl', 'xl', 'xl', 'xl']}
      gap="xl"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
        <wui-icon-box
          backgroundColor="error-100"
          background="opaque"
          iconColor="error-100"
          icon="close"
          size="sm"
          border
          borderColor="wui-color-bg-125"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`;
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return html `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
    }
    async connectFarcaster() {
        if (this.authConnector) {
            try {
                await this.authConnector?.provider.connectFarcaster();
                if (this.socialProvider) {
                    StorageUtil.setConnectedSocialProvider(this.socialProvider);
                    EventsController.sendEvent({
                        type: 'track',
                        event: 'SOCIAL_LOGIN_REQUEST_USER_DATA',
                        properties: { provider: this.socialProvider }
                    });
                }
                this.loading = true;
                await ConnectionController.connectExternal(this.authConnector, this.authConnector.chain);
                if (this.socialProvider) {
                    EventsController.sendEvent({
                        type: 'track',
                        event: 'SOCIAL_LOGIN_SUCCESS',
                        properties: { provider: this.socialProvider }
                    });
                }
                this.loading = false;
                ModalController.close();
            }
            catch (error) {
                if (this.socialProvider) {
                    EventsController.sendEvent({
                        type: 'track',
                        event: 'SOCIAL_LOGIN_ERROR',
                        properties: { provider: this.socialProvider }
                    });
                }
                RouterController.goBack();
                SnackController.showError(error);
            }
        }
    }
    mobileLinkTemplate() {
        return html `<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri || this.loading}
      @click=${() => {
            if (this.uri) {
                CoreHelperUtil.openHref(this.uri, '_blank');
            }
        }}
    >
      Open farcaster</wui-button
    >`;
    }
    onRenderProxy() {
        if (!this.ready && this.uri) {
            this.timeout = setTimeout(() => {
                this.ready = true;
            }, 200);
        }
    }
    qrCodeTemplate() {
        if (!this.uri || !this.ready) {
            return null;
        }
        const size = this.getBoundingClientRect().width - 40;
        return html ` <wui-qr-code
      size=${size}
      theme=${ThemeController.state.themeMode}
      uri=${this.uri}
      ?farcaster=${true}
      data-testid="wui-qr-code"
      color=${ifDefined(ThemeController.state.themeVariables['--w3m-qr-color'])}
    ></wui-qr-code>`;
    }
    copyTemplate() {
        const inactive = !this.uri || !this.ready;
        return html `<wui-link
      .disabled=${inactive}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
    }
    onCopyUri() {
        try {
            if (this.uri) {
                CoreHelperUtil.copyToClopboard(this.uri);
                SnackController.showSuccess('Link copied');
            }
        }
        catch {
            SnackController.showError('Failed to copy');
        }
    }
};
W3mConnectingFarcasterView.styles = styles;
__decorate([
    state()
], W3mConnectingFarcasterView.prototype, "socialProvider", void 0);
__decorate([
    state()
], W3mConnectingFarcasterView.prototype, "uri", void 0);
__decorate([
    state()
], W3mConnectingFarcasterView.prototype, "ready", void 0);
__decorate([
    state()
], W3mConnectingFarcasterView.prototype, "loading", void 0);
W3mConnectingFarcasterView = __decorate([
    customElement('w3m-connecting-farcaster-view')
], W3mConnectingFarcasterView);
export { W3mConnectingFarcasterView };
//# sourceMappingURL=index.js.map