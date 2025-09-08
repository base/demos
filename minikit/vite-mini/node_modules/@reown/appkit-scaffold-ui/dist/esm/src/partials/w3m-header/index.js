var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AccountController, AssetController, AssetUtil, ChainController, ConnectorController, EventsController, ModalUtil, OptionsController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-select';
import '@reown/appkit-ui/wui-tag';
import '@reown/appkit-ui/wui-text';
import { ConstantsUtil } from '../../utils/ConstantsUtil.js';
import styles from './styles.js';
const BETA_SCREENS = ['SmartSessionList'];
function headings() {
    const connectorName = RouterController.state.data?.connector?.name;
    const walletName = RouterController.state.data?.wallet?.name;
    const networkName = RouterController.state.data?.network?.name;
    const name = walletName ?? connectorName;
    const connectors = ConnectorController.getConnectors();
    const isEmail = connectors.length === 1 && connectors[0]?.id === 'w3m-email';
    return {
        Connect: `Connect ${isEmail ? 'Email' : ''} Wallet`,
        Create: 'Create Wallet',
        ChooseAccountName: undefined,
        Account: undefined,
        AccountSettings: undefined,
        AllWallets: 'All Wallets',
        ApproveTransaction: 'Approve Transaction',
        BuyInProgress: 'Buy',
        ConnectingExternal: name ?? 'Connect Wallet',
        ConnectingWalletConnect: name ?? 'WalletConnect',
        ConnectingWalletConnectBasic: 'WalletConnect',
        ConnectingSiwe: 'Sign In',
        Convert: 'Convert',
        ConvertSelectToken: 'Select token',
        ConvertPreview: 'Preview convert',
        Downloads: name ? `Get ${name}` : 'Downloads',
        EmailLogin: 'Email Login',
        EmailVerifyOtp: 'Confirm Email',
        EmailVerifyDevice: 'Register Device',
        GetWallet: 'Get a wallet',
        Networks: 'Choose Network',
        OnRampProviders: 'Choose Provider',
        OnRampActivity: 'Activity',
        OnRampTokenSelect: 'Select Token',
        OnRampFiatSelect: 'Select Currency',
        Pay: 'How you pay',
        Profile: undefined,
        SwitchNetwork: networkName ?? 'Switch Network',
        SwitchAddress: 'Switch Address',
        Transactions: 'Activity',
        UnsupportedChain: 'Switch Network',
        UpgradeEmailWallet: 'Upgrade your Wallet',
        UpdateEmailWallet: 'Edit Email',
        UpdateEmailPrimaryOtp: 'Confirm Current Email',
        UpdateEmailSecondaryOtp: 'Confirm New Email',
        WhatIsABuy: 'What is Buy?',
        RegisterAccountName: 'Choose name',
        RegisterAccountNameSuccess: '',
        WalletReceive: 'Receive',
        WalletCompatibleNetworks: 'Compatible Networks',
        Swap: 'Swap',
        SwapSelectToken: 'Select token',
        SwapPreview: 'Preview swap',
        WalletSend: 'Send',
        WalletSendPreview: 'Review send',
        WalletSendSelectToken: 'Select Token',
        WhatIsANetwork: 'What is a network?',
        WhatIsAWallet: 'What is a wallet?',
        ConnectWallets: 'Connect wallet',
        ConnectSocials: 'All socials',
        ConnectingSocial: AccountController.state.socialProvider
            ? AccountController.state.socialProvider
            : 'Connect Social',
        ConnectingMultiChain: 'Select chain',
        ConnectingFarcaster: 'Farcaster',
        SwitchActiveChain: 'Switch chain',
        SmartSessionCreated: undefined,
        SmartSessionList: 'Smart Sessions',
        SIWXSignMessage: 'Sign In',
        PayLoading: 'Payment in progress'
    };
}
let W3mHeader = class W3mHeader extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.heading = headings()[RouterController.state.view];
        this.network = ChainController.state.activeCaipNetwork;
        this.networkImage = AssetUtil.getNetworkImage(this.network);
        this.showBack = false;
        this.prevHistoryLength = 1;
        this.view = RouterController.state.view;
        this.viewDirection = '';
        this.headerText = headings()[RouterController.state.view];
        this.unsubscribe.push(AssetController.subscribeNetworkImages(() => {
            this.networkImage = AssetUtil.getNetworkImage(this.network);
        }), RouterController.subscribeKey('view', val => {
            setTimeout(() => {
                this.view = val;
                this.headerText = headings()[val];
            }, ConstantsUtil.ANIMATION_DURATIONS.HeaderText);
            this.onViewChange();
            this.onHistoryChange();
        }), ChainController.subscribeKey('activeCaipNetwork', val => {
            this.network = val;
            this.networkImage = AssetUtil.getNetworkImage(this.network);
        }));
    }
    disconnectCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
    }
    onWalletHelp() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_WALLET_HELP' });
        RouterController.push('WhatIsAWallet');
    }
    async onClose() {
        await ModalUtil.safeClose();
    }
    rightHeaderTemplate() {
        const isSmartSessionsEnabled = OptionsController?.state?.features?.smartSessions;
        if (RouterController.state.view !== 'Account' || !isSmartSessionsEnabled) {
            return this.closeButtonTemplate();
        }
        return html `<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${() => RouterController.push('SmartSessionList')}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `;
    }
    closeButtonTemplate() {
        return html `
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `;
    }
    titleTemplate() {
        const isBeta = BETA_SCREENS.includes(this.view);
        return html `
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${isBeta ? html `<wui-tag variant="main">Beta</wui-tag>` : null}
      </wui-flex>
    `;
    }
    leftHeaderTemplate() {
        const { view } = RouterController.state;
        const isConnectHelp = view === 'Connect';
        const isEmbeddedEnable = OptionsController.state.enableEmbedded;
        const isApproveTransaction = view === 'ApproveTransaction';
        const isConnectingSIWEView = view === 'ConnectingSiwe';
        const isAccountView = view === 'Account';
        const enableNetworkSwitch = OptionsController.state.enableNetworkSwitch;
        const shouldHideBack = isApproveTransaction || isConnectingSIWEView || (isConnectHelp && isEmbeddedEnable);
        if (isAccountView && enableNetworkSwitch) {
            return html `<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${ifDefined(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${ifDefined(this.networkImage)}
      ></wui-select>`;
        }
        if (this.showBack && !shouldHideBack) {
            return html `<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`;
        }
        return html `<wui-icon-link
      data-hidden=${!isConnectHelp}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`;
    }
    onNetworks() {
        if (this.isAllowedNetworkSwitch()) {
            EventsController.sendEvent({ type: 'track', event: 'CLICK_NETWORKS' });
            RouterController.push('Networks');
        }
    }
    isAllowedNetworkSwitch() {
        const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
        const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
        const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id);
        return isMultiNetwork || !isValidNetwork;
    }
    getPadding() {
        if (this.heading) {
            return ['l', '2l', 'l', '2l'];
        }
        return ['0', '2l', '0', '2l'];
    }
    onViewChange() {
        const { history } = RouterController.state;
        let direction = ConstantsUtil.VIEW_DIRECTION.Next;
        if (history.length < this.prevHistoryLength) {
            direction = ConstantsUtil.VIEW_DIRECTION.Prev;
        }
        this.prevHistoryLength = history.length;
        this.viewDirection = direction;
    }
    async onHistoryChange() {
        const { history } = RouterController.state;
        const buttonEl = this.shadowRoot?.querySelector('#dynamic');
        if (history.length > 1 && !this.showBack && buttonEl) {
            await buttonEl.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            }).finished;
            this.showBack = true;
            buttonEl.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            });
        }
        else if (history.length <= 1 && this.showBack && buttonEl) {
            await buttonEl.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            }).finished;
            this.showBack = false;
            buttonEl.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    onGoBack() {
        RouterController.goBack();
    }
};
W3mHeader.styles = styles;
__decorate([
    state()
], W3mHeader.prototype, "heading", void 0);
__decorate([
    state()
], W3mHeader.prototype, "network", void 0);
__decorate([
    state()
], W3mHeader.prototype, "networkImage", void 0);
__decorate([
    state()
], W3mHeader.prototype, "showBack", void 0);
__decorate([
    state()
], W3mHeader.prototype, "prevHistoryLength", void 0);
__decorate([
    state()
], W3mHeader.prototype, "view", void 0);
__decorate([
    state()
], W3mHeader.prototype, "viewDirection", void 0);
__decorate([
    state()
], W3mHeader.prototype, "headerText", void 0);
W3mHeader = __decorate([
    customElement('w3m-header')
], W3mHeader);
export { W3mHeader };
//# sourceMappingURL=index.js.map