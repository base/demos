var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { state } from 'lit/decorators/state.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectionController, ConnectorController, CoreHelperUtil, OptionsController, OptionsStateController, RouterController } from '@reown/appkit-controllers';
import { MathUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-button';
import '@reown/appkit-ui/wui-separator';
import { ConstantsUtil as AppKitConstantsUtil } from '@reown/appkit-utils';
import '../../partials/w3m-email-login-widget/index.js';
import '../../partials/w3m-legal-checkbox/index.js';
import '../../partials/w3m-legal-footer/index.js';
import '../../partials/w3m-social-login-widget/index.js';
import '../../partials/w3m-wallet-guide/index.js';
import '../../partials/w3m-wallet-login-list/index.js';
import { WalletUtil } from '../../utils/WalletUtil.js';
import styles from './styles.js';
const SCROLL_THRESHOLD = 470;
let W3mConnectView = class W3mConnectView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.connectors = ConnectorController.state.connectors;
        this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        this.features = OptionsController.state.features;
        this.remoteFeatures = OptionsController.state.remoteFeatures;
        this.enableWallets = OptionsController.state.enableWallets;
        this.noAdapters = ChainController.state.noAdapters;
        this.walletGuide = 'get-started';
        this.checked = OptionsStateController.state.isLegalCheckboxChecked;
        this.isEmailEnabled = this.remoteFeatures?.email && !ChainController.state.noAdapters;
        this.isSocialEnabled = this.remoteFeatures?.socials &&
            this.remoteFeatures.socials.length > 0 &&
            !ChainController.state.noAdapters;
        this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => {
            this.connectors = val;
            this.authConnector = this.connectors.find(c => c.type === 'AUTH');
            this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
        }), OptionsController.subscribeKey('features', val => {
            this.features = val;
        }), OptionsController.subscribeKey('remoteFeatures', val => {
            this.remoteFeatures = val;
            this.setEmailAndSocialEnableCheck(this.noAdapters, this.remoteFeatures);
        }), OptionsController.subscribeKey('enableWallets', val => (this.enableWallets = val)), ChainController.subscribeKey('noAdapters', val => this.setEmailAndSocialEnableCheck(val, this.remoteFeatures)), OptionsStateController.subscribeKey('isLegalCheckboxChecked', val => (this.checked = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.resizeObserver?.disconnect();
        const connectEl = this.shadowRoot?.querySelector('.connect');
        connectEl?.removeEventListener('scroll', this.handleConnectListScroll.bind(this));
    }
    firstUpdated() {
        const connectEl = this.shadowRoot?.querySelector('.connect');
        if (connectEl) {
            requestAnimationFrame(this.handleConnectListScroll.bind(this));
            connectEl?.addEventListener('scroll', this.handleConnectListScroll.bind(this));
            this.resizeObserver = new ResizeObserver(() => {
                this.handleConnectListScroll();
            });
            this.resizeObserver?.observe(connectEl);
            this.handleConnectListScroll();
        }
    }
    render() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
        const isLegalCheckbox = OptionsController.state.features?.legalCheckbox;
        const legalUrl = termsConditionsUrl || privacyPolicyUrl;
        const isShowLegalCheckbox = Boolean(legalUrl) && Boolean(isLegalCheckbox) && this.walletGuide === 'get-started';
        const isDisabled = isShowLegalCheckbox && !this.checked;
        const classes = {
            connect: true,
            disabled: isDisabled
        };
        const isEnableWalletGuide = OptionsController.state.enableWalletGuide;
        const isEnableWallets = this.enableWallets;
        const socialOrEmailLoginEnabled = this.isSocialEnabled || this.authConnector;
        const tabIndex = isDisabled ? -1 : undefined;
        return html `
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${classMap(classes)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${socialOrEmailLoginEnabled &&
            isEnableWallets &&
            isEnableWalletGuide &&
            this.walletGuide === 'get-started'
            ? ['3xs', 's', '0', 's']
            : ['3xs', 's', 's', 's']}
          >
            ${this.renderConnectMethod(tabIndex)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(isDisabled)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `;
    }
    setEmailAndSocialEnableCheck(noAdapters, remoteFeatures) {
        this.isEmailEnabled = remoteFeatures?.email && !noAdapters;
        this.isSocialEnabled =
            remoteFeatures?.socials && remoteFeatures.socials.length > 0 && !noAdapters;
        this.remoteFeatures = remoteFeatures;
        this.noAdapters = noAdapters;
    }
    checkIfAuthEnabled(connectors) {
        const namespacesWithAuthConnector = connectors
            .filter(c => c.type === AppKitConstantsUtil.CONNECTOR_TYPE_AUTH)
            .map(i => i.chain);
        const authSupportedNamespaces = ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS;
        return authSupportedNamespaces.some(ns => namespacesWithAuthConnector.includes(ns));
    }
    renderConnectMethod(tabIndex) {
        const connectMethodsOrder = WalletUtil.getConnectOrderMethod(this.features, this.connectors);
        return html `${connectMethodsOrder.map((method, index) => {
            switch (method) {
                case 'email':
                    return html `${this.emailTemplate(tabIndex)} ${this.separatorTemplate(index, 'email')}`;
                case 'social':
                    return html `${this.socialListTemplate(tabIndex)}
          ${this.separatorTemplate(index, 'social')}`;
                case 'wallet':
                    return html `${this.walletListTemplate(tabIndex)}
          ${this.separatorTemplate(index, 'wallet')}`;
                default:
                    return null;
            }
        })}`;
    }
    checkMethodEnabled(name) {
        switch (name) {
            case 'wallet':
                return this.enableWallets;
            case 'social':
                return this.isSocialEnabled && this.isAuthEnabled;
            case 'email':
                return this.isEmailEnabled && this.isAuthEnabled;
            default:
                return null;
        }
    }
    checkIsThereNextMethod(currentIndex) {
        const connectMethodsOrder = WalletUtil.getConnectOrderMethod(this.features, this.connectors);
        const nextMethod = connectMethodsOrder[currentIndex + 1];
        if (!nextMethod) {
            return undefined;
        }
        const isNextMethodEnabled = this.checkMethodEnabled(nextMethod);
        if (isNextMethodEnabled) {
            return nextMethod;
        }
        return this.checkIsThereNextMethod(currentIndex + 1);
    }
    separatorTemplate(index, type) {
        const nextEnabledMethod = this.checkIsThereNextMethod(index);
        const isExplore = this.walletGuide === 'explore';
        switch (type) {
            case 'wallet': {
                const isWalletEnable = this.enableWallets;
                return isWalletEnable && nextEnabledMethod && !isExplore
                    ? html `<wui-separator data-testid="wui-separator" text="or"></wui-separator>`
                    : null;
            }
            case 'email': {
                const isNextMethodSocial = nextEnabledMethod === 'social';
                return this.isAuthEnabled && this.isEmailEnabled && !isNextMethodSocial && nextEnabledMethod
                    ? html `<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`
                    : null;
            }
            case 'social': {
                const isNextMethodEmail = nextEnabledMethod === 'email';
                return this.isAuthEnabled && this.isSocialEnabled && !isNextMethodEmail && nextEnabledMethod
                    ? html `<wui-separator data-testid="wui-separator" text="or"></wui-separator>`
                    : null;
            }
            default:
                return null;
        }
    }
    emailTemplate(tabIndex) {
        if (!this.isEmailEnabled || !this.isAuthEnabled) {
            return null;
        }
        return html `<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${ifDefined(tabIndex)}
    ></w3m-email-login-widget>`;
    }
    socialListTemplate(tabIndex) {
        if (!this.isSocialEnabled || !this.isAuthEnabled) {
            return null;
        }
        return html `<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${ifDefined(tabIndex)}
    ></w3m-social-login-widget>`;
    }
    walletListTemplate(tabIndex) {
        const isEnableWallets = this.enableWallets;
        const isCollapseWalletsOldProp = this.features?.emailShowWallets === false;
        const isCollapseWallets = this.features?.collapseWallets;
        const shouldCollapseWallets = isCollapseWalletsOldProp || isCollapseWallets;
        if (!isEnableWallets) {
            return null;
        }
        if (CoreHelperUtil.isTelegram() && (CoreHelperUtil.isSafari() || CoreHelperUtil.isIos())) {
            ConnectionController.connectWalletConnect().catch(_e => ({}));
        }
        if (this.walletGuide === 'explore') {
            return null;
        }
        const hasOtherMethods = this.isAuthEnabled && (this.isEmailEnabled || this.isSocialEnabled);
        if (hasOtherMethods && shouldCollapseWallets) {
            return html `<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${ifDefined(tabIndex)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`;
        }
        return html `<w3m-wallet-login-list tabIdx=${ifDefined(tabIndex)}></w3m-wallet-login-list>`;
    }
    guideTemplate(disabled = false) {
        const isEnableWalletGuide = OptionsController.state.enableWalletGuide;
        if (!isEnableWalletGuide) {
            return null;
        }
        const classes = {
            guide: true,
            disabled
        };
        const tabIndex = disabled ? -1 : undefined;
        if (!this.authConnector && !this.isSocialEnabled) {
            return null;
        }
        return html `
      ${this.walletGuide === 'explore' && !ChainController.state.noAdapters
            ? html `<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`
            : null}
      <w3m-wallet-guide
        class=${classMap(classes)}
        tabIdx=${ifDefined(tabIndex)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `;
    }
    legalCheckboxTemplate() {
        if (this.walletGuide === 'explore') {
            return null;
        }
        return html `<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`;
    }
    handleConnectListScroll() {
        const connectEl = this.shadowRoot?.querySelector('.connect');
        if (!connectEl) {
            return;
        }
        const shouldApplyMask = connectEl.scrollHeight > SCROLL_THRESHOLD;
        if (shouldApplyMask) {
            connectEl.style.setProperty('--connect-mask-image', `linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`);
            connectEl.style.setProperty('--connect-scroll--top-opacity', MathUtil.interpolate([0, 50], [0, 1], connectEl.scrollTop).toString());
            connectEl.style.setProperty('--connect-scroll--bottom-opacity', MathUtil.interpolate([0, 50], [0, 1], connectEl.scrollHeight - connectEl.scrollTop - connectEl.offsetHeight).toString());
        }
        else {
            connectEl.style.setProperty('--connect-mask-image', 'none');
            connectEl.style.setProperty('--connect-scroll--top-opacity', '0');
            connectEl.style.setProperty('--connect-scroll--bottom-opacity', '0');
        }
    }
    onContinueWalletClick() {
        RouterController.push('ConnectWallets');
    }
};
W3mConnectView.styles = styles;
__decorate([
    state()
], W3mConnectView.prototype, "connectors", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "authConnector", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "features", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "remoteFeatures", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "enableWallets", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "noAdapters", void 0);
__decorate([
    property()
], W3mConnectView.prototype, "walletGuide", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "checked", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "isEmailEnabled", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "isSocialEnabled", void 0);
__decorate([
    state()
], W3mConnectView.prototype, "isAuthEnabled", void 0);
W3mConnectView = __decorate([
    customElement('w3m-connect-view')
], W3mConnectView);
export { W3mConnectView };
//# sourceMappingURL=index.js.map