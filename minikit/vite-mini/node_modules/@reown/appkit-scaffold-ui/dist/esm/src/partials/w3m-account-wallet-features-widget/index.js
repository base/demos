var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { AccountController, AssetController, AssetUtil, ChainController, ConstantsUtil as CoreConstantsUtil, CoreHelperUtil, EventsController, ModalController, OptionsController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-balance';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-button';
import '@reown/appkit-ui/wui-profile-button';
import '@reown/appkit-ui/wui-tabs';
import '@reown/appkit-ui/wui-tooltip';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import { HelpersUtil } from '../../utils/HelpersUtil.js';
import '../w3m-account-activity-widget/index.js';
import '../w3m-account-nfts-widget/index.js';
import '../w3m-account-tokens-widget/index.js';
import '../w3m-tooltip-trigger/index.js';
import '../w3m-tooltip/index.js';
import styles from './styles.js';
const TABS_PADDING = 48;
const MODAL_MOBILE_VIEW_PX = 430;
let W3mAccountWalletFeaturesWidget = class W3mAccountWalletFeaturesWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.address = AccountController.state.address;
        this.profileImage = AccountController.state.profileImage;
        this.profileName = AccountController.state.profileName;
        this.network = ChainController.state.activeCaipNetwork;
        this.currentTab = AccountController.state.currentTab;
        this.tokenBalance = AccountController.state.tokenBalance;
        this.features = OptionsController.state.features;
        this.remoteFeatures = OptionsController.state.remoteFeatures;
        this.networkImage = AssetUtil.getNetworkImage(this.network);
        this.unsubscribe.push(...[
            AssetController.subscribeNetworkImages(() => {
                this.networkImage = AssetUtil.getNetworkImage(this.network);
            }),
            AccountController.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileImage = val.profileImage;
                    this.profileName = val.profileName;
                    this.currentTab = val.currentTab;
                    this.tokenBalance = val.tokenBalance;
                }
                else {
                    ModalController.close();
                }
            })
        ], ChainController.subscribeKey('activeCaipNetwork', val => {
            this.network = val;
            this.networkImage = AssetUtil.getNetworkImage(this.network);
        }), OptionsController.subscribeKey('features', val => (this.features = val)), OptionsController.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)));
        this.watchSwapValues();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        clearInterval(this.watchTokenBalance);
    }
    firstUpdated() {
        AccountController.fetchTokenBalance();
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-account-view: No account provided');
        }
        return html `<wui-flex
      flexDirection="column"
      .padding=${['0', 'xl', 'm', 'xl']}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${ifDefined(this.address)}
        networkSrc=${ifDefined(this.networkImage)}
        icon="chevronBottom"
        avatarSrc=${ifDefined(this.profileImage ? this.profileImage : undefined)}
        profileName=${ifDefined(this.profileName ?? undefined)}
        data-testid="w3m-profile-button"
      ></wui-profile-button>

      ${this.tokenBalanceTemplate()} ${this.orderedWalletFeatures()} ${this.tabsTemplate()}
      ${this.listContentTemplate()}
    </wui-flex>`;
    }
    orderedWalletFeatures() {
        const walletFeaturesOrder = this.features?.walletFeaturesOrder || CoreConstantsUtil.DEFAULT_FEATURES.walletFeaturesOrder;
        const isAllDisabled = walletFeaturesOrder.every(feature => {
            if (feature === 'send' || feature === 'receive') {
                return !this.features?.[feature];
            }
            if (feature === 'swaps' || feature === 'onramp') {
                return !this.remoteFeatures?.[feature];
            }
            return true;
        });
        if (isAllDisabled) {
            return null;
        }
        return html `<wui-flex gap="s">
      ${walletFeaturesOrder.map(feature => {
            switch (feature) {
                case 'onramp':
                    return this.onrampTemplate();
                case 'swaps':
                    return this.swapsTemplate();
                case 'receive':
                    return this.receiveTemplate();
                case 'send':
                    return this.sendTemplate();
                default:
                    return null;
            }
        })}
    </wui-flex>`;
    }
    onrampTemplate() {
        const isOnrampEnabled = this.remoteFeatures?.onramp;
        if (!isOnrampEnabled) {
            return null;
        }
        return html `
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    swapsTemplate() {
        const isSwapsEnabled = this.remoteFeatures?.swaps;
        const isEvm = ChainController.state.activeChain === CommonConstantsUtil.CHAIN.EVM;
        if (!isSwapsEnabled || !isEvm) {
            return null;
        }
        return html `
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    receiveTemplate() {
        const isReceiveEnabled = this.features?.receive;
        if (!isReceiveEnabled) {
            return null;
        }
        return html `
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    sendTemplate() {
        const isSendEnabled = this.features?.send;
        const activeNamespace = ChainController.state.activeChain;
        const isSendSupported = CoreConstantsUtil.SEND_SUPPORTED_NAMESPACES.includes(activeNamespace);
        if (!isSendEnabled || !isSendSupported) {
            return null;
        }
        return html `
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    watchSwapValues() {
        this.watchTokenBalance = setInterval(() => AccountController.fetchTokenBalance(error => this.onTokenBalanceError(error)), 10_000);
    }
    onTokenBalanceError(error) {
        if (error instanceof Error && error.cause instanceof Response) {
            const statusCode = error.cause.status;
            if (statusCode === CommonConstantsUtil.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE) {
                clearInterval(this.watchTokenBalance);
            }
        }
    }
    listContentTemplate() {
        if (this.currentTab === 0) {
            return html `<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
        }
        if (this.currentTab === 1) {
            return html `<w3m-account-nfts-widget></w3m-account-nfts-widget>`;
        }
        if (this.currentTab === 2) {
            return html `<w3m-account-activity-widget></w3m-account-activity-widget>`;
        }
        return html `<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
    }
    tokenBalanceTemplate() {
        if (this.tokenBalance && this.tokenBalance?.length >= 0) {
            const value = CoreHelperUtil.calculateBalance(this.tokenBalance);
            const { dollars = '0', pennies = '00' } = CoreHelperUtil.formatTokenBalance(value);
            return html `<wui-balance dollars=${dollars} pennies=${pennies}></wui-balance>`;
        }
        return html `<wui-balance dollars="0" pennies="00"></wui-balance>`;
    }
    tabsTemplate() {
        const tabsByNamespace = HelpersUtil.getTabsByNamespace(ChainController.state.activeChain);
        if (tabsByNamespace.length === 0) {
            return null;
        }
        const isMobileAndSmall = CoreHelperUtil.isMobile() && window.innerWidth < MODAL_MOBILE_VIEW_PX;
        let localTabWidth = '104px';
        if (isMobileAndSmall) {
            localTabWidth = `${(window.innerWidth - TABS_PADDING) / tabsByNamespace.length}px`;
        }
        else if (tabsByNamespace.length === 2) {
            localTabWidth = '156px';
        }
        else {
            localTabWidth = '104px';
        }
        return html `<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${localTabWidth}
      .tabs=${tabsByNamespace}
    ></wui-tabs>`;
    }
    onTabChange(index) {
        AccountController.setCurrentTab(index);
    }
    onProfileButtonClick() {
        const { allAccounts } = AccountController.state;
        if (allAccounts.length > 1) {
            RouterController.push('Profile');
        }
        else {
            RouterController.push('AccountSettings');
        }
    }
    onBuyClick() {
        RouterController.push('OnRampProviders');
    }
    onSwapClick() {
        const activeChainNamespace = ChainController.state.activeChain;
        if (this.network?.caipNetworkId &&
            !CoreConstantsUtil.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)) {
            RouterController.push('UnsupportedChain', {
                swapUnsupportedChain: true
            });
        }
        else {
            EventsController.sendEvent({
                type: 'track',
                event: 'OPEN_SWAP',
                properties: {
                    network: this.network?.caipNetworkId || '',
                    isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            RouterController.push('Swap');
        }
    }
    onReceiveClick() {
        RouterController.push('WalletReceive');
    }
    onSendClick() {
        const activeChainNamespace = ChainController.state.activeChain;
        EventsController.sendEvent({
            type: 'track',
            event: 'OPEN_SEND',
            properties: {
                network: this.network?.caipNetworkId || '',
                isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController.push('WalletSend');
    }
};
W3mAccountWalletFeaturesWidget.styles = styles;
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "watchTokenBalance", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "address", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "profileName", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "network", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "currentTab", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "tokenBalance", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "features", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "remoteFeatures", void 0);
__decorate([
    state()
], W3mAccountWalletFeaturesWidget.prototype, "networkImage", void 0);
W3mAccountWalletFeaturesWidget = __decorate([
    customElement('w3m-account-wallet-features-widget')
], W3mAccountWalletFeaturesWidget);
export { W3mAccountWalletFeaturesWidget };
//# sourceMappingURL=index.js.map