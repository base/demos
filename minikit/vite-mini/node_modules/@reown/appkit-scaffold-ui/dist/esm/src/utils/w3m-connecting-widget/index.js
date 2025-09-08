var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, ConnectionController, CoreHelperUtil, RouterController, SnackController, ThemeController } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-loading-thumbnail';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
import '../../partials/w3m-mobile-download-links/index.js';
import styles from './styles.js';
export class W3mConnectingWidget extends LitElement {
    constructor() {
        super();
        this.wallet = RouterController.state.data?.wallet;
        this.connector = RouterController.state.data?.connector;
        this.timeout = undefined;
        this.secondaryBtnIcon = 'refresh';
        this.onConnect = undefined;
        this.onRender = undefined;
        this.onAutoConnect = undefined;
        this.isWalletConnect = true;
        this.unsubscribe = [];
        this.imageSrc = AssetUtil.getWalletImage(this.wallet) ?? AssetUtil.getConnectorImage(this.connector);
        this.name = this.wallet?.name ?? this.connector?.name ?? 'Wallet';
        this.isRetrying = false;
        this.uri = ConnectionController.state.wcUri;
        this.error = ConnectionController.state.wcError;
        this.ready = false;
        this.showRetry = false;
        this.secondaryBtnLabel = 'Try again';
        this.secondaryLabel = 'Accept connection request in the wallet';
        this.isLoading = false;
        this.isMobile = false;
        this.onRetry = undefined;
        this.unsubscribe.push(...[
            ConnectionController.subscribeKey('wcUri', val => {
                this.uri = val;
                if (this.isRetrying && this.onRetry) {
                    this.isRetrying = false;
                    this.onConnect?.();
                }
            }),
            ConnectionController.subscribeKey('wcError', val => (this.error = val))
        ]);
        if ((CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari()) &&
            CoreHelperUtil.isIos() &&
            ConnectionController.state.wcUri) {
            this.onConnect?.();
        }
    }
    firstUpdated() {
        this.onAutoConnect?.();
        this.showRetry = !this.onAutoConnect;
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        ConnectionController.setWcError(false);
        clearTimeout(this.timeout);
    }
    render() {
        this.onRender?.();
        this.onShowRetry();
        const subLabel = this.error
            ? 'Connection can be declined if a previous request is still active'
            : this.secondaryLabel;
        let label = `Continue in ${this.name}`;
        if (this.error) {
            label = 'Connection declined';
        }
        return html `
      <wui-flex
        data-error=${ifDefined(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${ifDefined(this.imageSrc)}></wui-wallet-image>

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
          <wui-text variant="paragraph-500" color=${this.error ? 'error-100' : 'fg-100'}>
            ${label}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${subLabel}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel
            ? html `
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying || this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `
            : null}
      </wui-flex>

      ${this.isWalletConnect
            ? html `
            <wui-flex .padding=${['0', 'xl', 'xl', 'xl']} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `
            : null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
    onShowRetry() {
        if (this.error && !this.showRetry) {
            this.showRetry = true;
            const retryButton = this.shadowRoot?.querySelector('wui-button');
            retryButton?.animate([{ opacity: 0 }, { opacity: 1 }], {
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    onTryAgain() {
        ConnectionController.setWcError(false);
        if (this.onRetry) {
            this.isRetrying = true;
            this.onRetry?.();
        }
        else {
            this.onConnect?.();
        }
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return html `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
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
}
W3mConnectingWidget.styles = styles;
__decorate([
    state()
], W3mConnectingWidget.prototype, "isRetrying", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "uri", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "error", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "ready", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "showRetry", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "secondaryBtnLabel", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "secondaryLabel", void 0);
__decorate([
    state()
], W3mConnectingWidget.prototype, "isLoading", void 0);
__decorate([
    property({ type: Boolean })
], W3mConnectingWidget.prototype, "isMobile", void 0);
__decorate([
    property()
], W3mConnectingWidget.prototype, "onRetry", void 0);
//# sourceMappingURL=index.js.map