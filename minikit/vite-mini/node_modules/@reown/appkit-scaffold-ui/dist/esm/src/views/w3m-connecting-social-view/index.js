var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AccountController, ChainController, ConnectionController, ConnectorController, EventsController, ModalController, OptionsController, RouterController, SnackController, StorageUtil, ThemeController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-loading-thumbnail';
import '@reown/appkit-ui/wui-logo';
import '@reown/appkit-ui/wui-text';
import { ErrorUtil } from '@reown/appkit-utils';
import { ConstantsUtil } from '../../utils/ConstantsUtil.js';
import styles from './styles.js';
let W3mConnectingSocialView = class W3mConnectingSocialView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.socialProvider = AccountController.state.socialProvider;
        this.socialWindow = AccountController.state.socialWindow;
        this.error = false;
        this.connecting = false;
        this.message = 'Connect in the provider window';
        this.authConnector = ConnectorController.getAuthConnector();
        this.handleSocialConnection = async (event) => {
            if (event.data?.resultUri) {
                if (event.origin === ConstantsUtil.SECURE_SITE_ORIGIN) {
                    window.removeEventListener('message', this.handleSocialConnection, false);
                    try {
                        if (this.authConnector && !this.connecting) {
                            if (this.socialWindow) {
                                this.socialWindow.close();
                                AccountController.setSocialWindow(undefined, ChainController.state.activeChain);
                            }
                            this.connecting = true;
                            this.updateMessage();
                            const uri = event.data.resultUri;
                            if (this.socialProvider) {
                                EventsController.sendEvent({
                                    type: 'track',
                                    event: 'SOCIAL_LOGIN_REQUEST_USER_DATA',
                                    properties: { provider: this.socialProvider }
                                });
                            }
                            await ConnectionController.connectExternal({
                                id: this.authConnector.id,
                                type: this.authConnector.type,
                                socialUri: uri
                            }, this.authConnector.chain);
                            if (this.socialProvider) {
                                StorageUtil.setConnectedSocialProvider(this.socialProvider);
                                EventsController.sendEvent({
                                    type: 'track',
                                    event: 'SOCIAL_LOGIN_SUCCESS',
                                    properties: { provider: this.socialProvider }
                                });
                            }
                        }
                    }
                    catch (error) {
                        this.error = true;
                        this.updateMessage();
                        if (this.socialProvider) {
                            EventsController.sendEvent({
                                type: 'track',
                                event: 'SOCIAL_LOGIN_ERROR',
                                properties: { provider: this.socialProvider }
                            });
                        }
                    }
                }
                else {
                    RouterController.goBack();
                    SnackController.showError('Untrusted Origin');
                    if (this.socialProvider) {
                        EventsController.sendEvent({
                            type: 'track',
                            event: 'SOCIAL_LOGIN_ERROR',
                            properties: { provider: this.socialProvider }
                        });
                    }
                }
            }
        };
        const abortController = ErrorUtil.EmbeddedWalletAbortController;
        abortController.signal.addEventListener('abort', () => {
            if (this.socialWindow) {
                this.socialWindow.close();
                AccountController.setSocialWindow(undefined, ChainController.state.activeChain);
            }
        });
        this.unsubscribe.push(...[
            AccountController.subscribe(val => {
                if (val.socialProvider) {
                    this.socialProvider = val.socialProvider;
                }
                if (val.socialWindow) {
                    this.socialWindow = val.socialWindow;
                }
                if (val.address) {
                    if (ModalController.state.open || OptionsController.state.enableEmbedded) {
                        ModalController.close();
                    }
                }
            })
        ]);
        if (this.authConnector) {
            this.connectSocial();
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        window.removeEventListener('message', this.handleSocialConnection, false);
        this.socialWindow?.close();
        AccountController.setSocialWindow(undefined, ChainController.state.activeChain);
    }
    render() {
        return html `
      <wui-flex
        data-error=${ifDefined(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${ifDefined(this.socialProvider)}></wui-logo>
          ${this.error ? null : this.loaderTemplate()}
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
            >Log in with
            <span class="capitalize">${this.socialProvider ?? 'Social'}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error ? 'error-100' : 'fg-200'}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `;
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return html `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
    }
    connectSocial() {
        const interval = setInterval(() => {
            if (this.socialWindow?.closed) {
                if (!this.connecting && RouterController.state.view === 'ConnectingSocial') {
                    if (this.socialProvider) {
                        EventsController.sendEvent({
                            type: 'track',
                            event: 'SOCIAL_LOGIN_CANCELED',
                            properties: { provider: this.socialProvider }
                        });
                    }
                    RouterController.goBack();
                }
                clearInterval(interval);
            }
        }, 1000);
        window.addEventListener('message', this.handleSocialConnection, false);
    }
    updateMessage() {
        if (this.error) {
            this.message = 'Something went wrong';
        }
        else if (this.connecting) {
            this.message = 'Retrieving user data';
        }
        else {
            this.message = 'Connect in the provider window';
        }
    }
};
W3mConnectingSocialView.styles = styles;
__decorate([
    state()
], W3mConnectingSocialView.prototype, "socialProvider", void 0);
__decorate([
    state()
], W3mConnectingSocialView.prototype, "socialWindow", void 0);
__decorate([
    state()
], W3mConnectingSocialView.prototype, "error", void 0);
__decorate([
    state()
], W3mConnectingSocialView.prototype, "connecting", void 0);
__decorate([
    state()
], W3mConnectingSocialView.prototype, "message", void 0);
W3mConnectingSocialView = __decorate([
    customElement('w3m-connecting-social-view')
], W3mConnectingSocialView);
export { W3mConnectingSocialView };
//# sourceMappingURL=index.js.map