var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ApiController, ChainController, ConnectorController, CoreHelperUtil, ModalController, ModalUtil, OptionsController, RouterController, SIWXUtil, SnackController, ThemeController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement, initializeTheming } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-card';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-alertbar/index.js';
import '../../partials/w3m-header/index.js';
import '../../partials/w3m-snackbar/index.js';
import '../../partials/w3m-tooltip/index.js';
import '../w3m-router/index.js';
import styles from './styles.js';
const SCROLL_LOCK = 'scroll-lock';
export class W3mModalBase extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.abortController = undefined;
        this.hasPrefetched = false;
        this.enableEmbedded = OptionsController.state.enableEmbedded;
        this.open = ModalController.state.open;
        this.caipAddress = ChainController.state.activeCaipAddress;
        this.caipNetwork = ChainController.state.activeCaipNetwork;
        this.shake = ModalController.state.shake;
        this.filterByNamespace = ConnectorController.state.filterByNamespace;
        this.initializeTheming();
        ApiController.prefetchAnalyticsConfig();
        this.unsubscribe.push(...[
            ModalController.subscribeKey('open', val => (val ? this.onOpen() : this.onClose())),
            ModalController.subscribeKey('shake', val => (this.shake = val)),
            ChainController.subscribeKey('activeCaipNetwork', val => this.onNewNetwork(val)),
            ChainController.subscribeKey('activeCaipAddress', val => this.onNewAddress(val)),
            OptionsController.subscribeKey('enableEmbedded', val => (this.enableEmbedded = val)),
            ConnectorController.subscribeKey('filterByNamespace', val => {
                if (this.filterByNamespace !== val && !ChainController.getAccountData(val)?.caipAddress) {
                    ApiController.fetchRecommendedWallets();
                    this.filterByNamespace = val;
                }
            })
        ]);
    }
    firstUpdated() {
        if (this.caipAddress) {
            if (this.enableEmbedded) {
                ModalController.close();
                this.prefetch();
                return;
            }
            this.onNewAddress(this.caipAddress);
        }
        if (this.open) {
            this.onOpen();
        }
        if (this.enableEmbedded) {
            this.prefetch();
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.onRemoveKeyboardListener();
    }
    render() {
        this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? 'clamp(0px, var(--wui-border-radius-l), 44px)' : '0px'};
    `;
        if (this.enableEmbedded) {
            return html `${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `;
        }
        return this.open
            ? html `
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `
            : null;
    }
    contentTemplate() {
        return html ` <wui-card
      shake="${this.shake}"
      data-embedded="${ifDefined(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
    }
    async onOverlayClick(event) {
        if (event.target === event.currentTarget) {
            await this.handleClose();
        }
    }
    async handleClose() {
        await ModalUtil.safeClose();
    }
    initializeTheming() {
        const { themeVariables, themeMode } = ThemeController.state;
        const defaultThemeMode = UiHelperUtil.getColorTheme(themeMode);
        initializeTheming(themeVariables, defaultThemeMode);
    }
    onClose() {
        this.open = false;
        this.classList.remove('open');
        this.onScrollUnlock();
        SnackController.hide();
        this.onRemoveKeyboardListener();
    }
    onOpen() {
        this.open = true;
        this.classList.add('open');
        this.onScrollLock();
        this.onAddKeyboardListener();
    }
    onScrollLock() {
        const styleTag = document.createElement('style');
        styleTag.dataset['w3m'] = SCROLL_LOCK;
        styleTag.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `;
        document.head.appendChild(styleTag);
    }
    onScrollUnlock() {
        const styleTag = document.head.querySelector(`style[data-w3m="${SCROLL_LOCK}"]`);
        if (styleTag) {
            styleTag.remove();
        }
    }
    onAddKeyboardListener() {
        this.abortController = new AbortController();
        const card = this.shadowRoot?.querySelector('wui-card');
        card?.focus();
        window.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.handleClose();
            }
            else if (event.key === 'Tab') {
                const { tagName } = event.target;
                if (tagName && !tagName.includes('W3M-') && !tagName.includes('WUI-')) {
                    card?.focus();
                }
            }
        }, this.abortController);
    }
    onRemoveKeyboardListener() {
        this.abortController?.abort();
        this.abortController = undefined;
    }
    async onNewAddress(caipAddress) {
        const isSwitchingNamespace = ChainController.state.isSwitchingNamespace;
        const nextConnected = CoreHelperUtil.getPlainAddress(caipAddress);
        const isDisconnectedInSameNamespace = !nextConnected && !isSwitchingNamespace;
        const isSwitchingNamespaceAndConnected = isSwitchingNamespace && nextConnected;
        if (isDisconnectedInSameNamespace) {
            ModalController.close();
        }
        else if (isSwitchingNamespaceAndConnected) {
            RouterController.goBack();
        }
        await SIWXUtil.initializeIfEnabled();
        this.caipAddress = caipAddress;
        ChainController.setIsSwitchingNamespace(false);
    }
    onNewNetwork(nextCaipNetwork) {
        const prevCaipNetwork = this.caipNetwork;
        const prevCaipNetworkId = prevCaipNetwork?.caipNetworkId?.toString();
        const prevChainNamespace = prevCaipNetwork?.chainNamespace;
        const nextNetworkId = nextCaipNetwork?.caipNetworkId?.toString();
        const nextChainNamespace = nextCaipNetwork?.chainNamespace;
        const networkIdChanged = prevCaipNetworkId !== nextNetworkId;
        const namespaceChanged = prevChainNamespace !== nextChainNamespace;
        const isNetworkChangedInSameNamespace = networkIdChanged && !namespaceChanged;
        const wasUnsupportedNetwork = prevCaipNetwork?.name === CommonConstantsUtil.UNSUPPORTED_NETWORK_NAME;
        const isConnectingExternal = RouterController.state.view === 'ConnectingExternal';
        const isNotConnected = !ChainController.getAccountData(nextCaipNetwork?.chainNamespace)
            ?.caipAddress;
        const isUnsupportedNetworkScreen = RouterController.state.view === 'UnsupportedChain';
        const isModalOpen = ModalController.state.open;
        let shouldGoBack = false;
        if (isModalOpen && !isConnectingExternal) {
            if (isNotConnected) {
                if (networkIdChanged) {
                    shouldGoBack = true;
                }
            }
            else if (isUnsupportedNetworkScreen) {
                shouldGoBack = true;
            }
            else if (isNetworkChangedInSameNamespace && !wasUnsupportedNetwork) {
                shouldGoBack = true;
            }
        }
        if (shouldGoBack && RouterController.state.view !== 'SIWXSignMessage') {
            RouterController.goBack();
        }
        this.caipNetwork = nextCaipNetwork;
    }
    prefetch() {
        if (!this.hasPrefetched) {
            ApiController.prefetch();
            ApiController.fetchWalletsByPage({ page: 1 });
            this.hasPrefetched = true;
        }
    }
}
W3mModalBase.styles = styles;
__decorate([
    property({ type: Boolean })
], W3mModalBase.prototype, "enableEmbedded", void 0);
__decorate([
    state()
], W3mModalBase.prototype, "open", void 0);
__decorate([
    state()
], W3mModalBase.prototype, "caipAddress", void 0);
__decorate([
    state()
], W3mModalBase.prototype, "caipNetwork", void 0);
__decorate([
    state()
], W3mModalBase.prototype, "shake", void 0);
__decorate([
    state()
], W3mModalBase.prototype, "filterByNamespace", void 0);
let W3mModal = class W3mModal extends W3mModalBase {
};
W3mModal = __decorate([
    customElement('w3m-modal')
], W3mModal);
export { W3mModal };
let AppKitModal = class AppKitModal extends W3mModalBase {
};
AppKitModal = __decorate([
    customElement('appkit-modal')
], AppKitModal);
export { AppKitModal };
//# sourceMappingURL=index.js.map