var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { AccountController, ChainController, ConnectionController, ConnectorController, ConstantsUtil as CoreConstantsUtil, CoreHelperUtil, EventsController, ModalController, OptionsController, RouterController, SnackController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-avatar';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-notice-card';
import '@reown/appkit-ui/wui-profile-button-v2';
import '@reown/appkit-ui/wui-tabs';
import '@reown/appkit-ui/wui-tag';
import '@reown/appkit-ui/wui-text';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import '../w3m-account-auth-button/index.js';
import styles from './styles.js';
let W3mAccountDefaultWidget = class W3mAccountDefaultWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.caipAddress = AccountController.state.caipAddress;
        this.address = CoreHelperUtil.getPlainAddress(AccountController.state.caipAddress);
        this.allAccounts = AccountController.state.allAccounts;
        this.profileImage = AccountController.state.profileImage;
        this.profileName = AccountController.state.profileName;
        this.disconnecting = false;
        this.balance = AccountController.state.balance;
        this.balanceSymbol = AccountController.state.balanceSymbol;
        this.features = OptionsController.state.features;
        this.remoteFeatures = OptionsController.state.remoteFeatures;
        this.namespace = ChainController.state.activeChain;
        this.chainId = ChainController.state.activeCaipNetwork?.id;
        this.unsubscribe.push(...[
            AccountController.subscribeKey('caipAddress', val => {
                this.address = CoreHelperUtil.getPlainAddress(val);
                this.caipAddress = val;
            }),
            AccountController.subscribeKey('balance', val => (this.balance = val)),
            AccountController.subscribeKey('balanceSymbol', val => (this.balanceSymbol = val)),
            AccountController.subscribeKey('profileName', val => (this.profileName = val)),
            AccountController.subscribeKey('profileImage', val => (this.profileImage = val)),
            OptionsController.subscribeKey('features', val => (this.features = val)),
            OptionsController.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)),
            AccountController.subscribeKey('allAccounts', allAccounts => {
                this.allAccounts = allAccounts;
            }),
            OptionsController.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)),
            ChainController.subscribeKey('activeChain', val => (this.namespace = val)),
            ChainController.subscribeKey('activeCaipNetwork', val => {
                if (val) {
                    const [namespace, chainId] = val?.caipNetworkId?.split(':') || [];
                    if (namespace && chainId) {
                        this.namespace = namespace;
                        this.chainId = chainId;
                    }
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.caipAddress) {
            return null;
        }
        const shouldShowMultiAccount = ChainController.state.activeChain !== ConstantsUtil.CHAIN.SOLANA &&
            this.allAccounts.length > 1;
        return html `<wui-flex
        flexDirection="column"
        .padding=${['0', 'xl', 'm', 'xl']}
        alignItems="center"
        gap="l"
      >
        ${shouldShowMultiAccount ? this.multiAccountTemplate() : this.singleAccountTemplate()}
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${CoreHelperUtil.formatBalance(this.balance, this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${['0', 's', 's', 's']}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${false}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`;
    }
    onrampTemplate() {
        if (!this.namespace) {
            return null;
        }
        const isOnrampEnabled = this.remoteFeatures?.onramp;
        const hasNetworkSupport = CoreConstantsUtil.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
        if (!isOnrampEnabled || !hasNetworkSupport) {
            return null;
        }
        return html `
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${true}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `;
    }
    orderedFeaturesTemplate() {
        const featuresOrder = this.features?.walletFeaturesOrder || CoreConstantsUtil.DEFAULT_FEATURES.walletFeaturesOrder;
        return featuresOrder.map(feature => {
            switch (feature) {
                case 'onramp':
                    return this.onrampTemplate();
                case 'swaps':
                    return this.swapsTemplate();
                case 'send':
                    return this.sendTemplate();
                default:
                    return null;
            }
        });
    }
    activityTemplate() {
        if (!this.namespace) {
            return null;
        }
        const isEnabled = this.remoteFeatures?.activity &&
            CoreConstantsUtil.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace);
        return isEnabled
            ? html ` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${true}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`
            : null;
    }
    swapsTemplate() {
        const isSwapsEnabled = this.remoteFeatures?.swaps;
        const isEvm = ChainController.state.activeChain === ConstantsUtil.CHAIN.EVM;
        if (!isSwapsEnabled || !isEvm) {
            return null;
        }
        return html `
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${true}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
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
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${true}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `;
    }
    authCardTemplate() {
        const namespace = ChainController.state.activeChain;
        const connectorId = ConnectorController.getConnectorId(namespace);
        const authConnector = ConnectorController.getAuthConnector();
        const { origin } = location;
        if (!authConnector ||
            connectorId !== ConstantsUtil.CONNECTOR_ID.AUTH ||
            origin.includes(CoreConstantsUtil.SECURE_SITE)) {
            return null;
        }
        return html `
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
    }
    handleSwitchAccountsView() {
        RouterController.push('SwitchAddress');
    }
    handleClickPay() {
        RouterController.push('OnRampProviders');
    }
    handleClickSwap() {
        RouterController.push('Swap');
    }
    handleClickSend() {
        RouterController.push('WalletSend');
    }
    explorerBtnTemplate() {
        const addressExplorerUrl = AccountController.state.addressExplorerUrl;
        if (!addressExplorerUrl) {
            return null;
        }
        return html `
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `;
    }
    singleAccountTemplate() {
        return html `
      <wui-avatar
        alt=${ifDefined(this.caipAddress)}
        address=${ifDefined(CoreHelperUtil.getPlainAddress(this.caipAddress))}
        imageSrc=${ifDefined(this.profileImage === null ? undefined : this.profileImage)}
        data-testid="single-account-avatar"
      ></wui-avatar>
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex gap="3xs" alignItems="center" justifyContent="center">
          <wui-text variant="large-600" color="fg-100">
            ${this.profileName
            ? UiHelperUtil.getTruncateString({
                string: this.profileName,
                charsStart: 20,
                charsEnd: 0,
                truncate: 'end'
            })
            : UiHelperUtil.getTruncateString({
                string: this.address || '',
                charsStart: 4,
                charsEnd: 4,
                truncate: 'middle'
            })}
          </wui-text>
          <wui-icon-link
            size="md"
            icon="copy"
            iconColor="fg-200"
            @click=${this.onCopyAddress}
          ></wui-icon-link> </wui-flex
      ></wui-flex>
    `;
    }
    multiAccountTemplate() {
        if (!this.address) {
            throw new Error('w3m-account-view: No account provided');
        }
        const account = this.allAccounts.find(acc => acc.address === this.address);
        const label = AccountController.state.addressLabels.get(this.address);
        if (this.namespace === 'bip122') {
            return this.btcAccountsTemplate();
        }
        return html `
      <wui-profile-button-v2
        .onProfileClick=${this.handleSwitchAccountsView.bind(this)}
        address=${ifDefined(this.address)}
        icon="${account?.type === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT &&
            ChainController.state.activeChain === ConstantsUtil.CHAIN.EVM
            ? 'lightbulb'
            : 'mail'}"
        avatarSrc=${ifDefined(this.profileImage ? this.profileImage : undefined)}
        profileName=${ifDefined(label ? label : this.profileName)}
        .onCopyClick=${this.onCopyAddress.bind(this)}
      ></wui-profile-button-v2>
    `;
    }
    btcAccountsTemplate() {
        return html `<wui-flex gap="m" alignItems="center" flexDirection="column">
      <wui-avatar
        .imageSrc=${ifDefined(this.profileImage ? this.profileImage : undefined)}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>
      <wui-tabs
        .tabs=${[{ label: 'Payment' }, { label: 'Ordinals' }]}
        .onTabChange=${(index) => AccountController.setCaipAddress(`bip122:${this.chainId}:${this.allAccounts[index]?.address || ''}`, this.namespace)}
      ></wui-tabs>
      <wui-flex gap="xs" alignItems="center" justifyContent="center">
        <wui-text variant="large-600" color="fg-100">
          ${UiHelperUtil.getTruncateString({
            string: this.profileName || this.address || '',
            charsStart: this.profileName ? 18 : 4,
            charsEnd: this.profileName ? 0 : 4,
            truncate: this.profileName ? 'end' : 'middle'
        })}
        </wui-text>
        <wui-icon-link
          size="md"
          icon="copy"
          iconColor="fg-200"
          @click=${this.onCopyAddress}
        ></wui-icon-link>
      </wui-flex>
    </wui-flex>`;
    }
    onCopyAddress() {
        try {
            if (this.address) {
                CoreHelperUtil.copyToClopboard(this.address);
                SnackController.showSuccess('Address copied');
            }
        }
        catch {
            SnackController.showError('Failed to copy');
        }
    }
    onTransactions() {
        const activeChainNamespace = ChainController.state.activeChain;
        EventsController.sendEvent({
            type: 'track',
            event: 'CLICK_TRANSACTIONS',
            properties: {
                isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController.push('Transactions');
    }
    async onDisconnect() {
        try {
            this.disconnecting = true;
            await ConnectionController.disconnect();
            ModalController.close();
        }
        catch {
            EventsController.sendEvent({ type: 'track', event: 'DISCONNECT_ERROR' });
            SnackController.showError('Failed to disconnect');
        }
        finally {
            this.disconnecting = false;
        }
    }
    onExplorer() {
        const addressExplorerUrl = AccountController.state.addressExplorerUrl;
        if (addressExplorerUrl) {
            CoreHelperUtil.openHref(addressExplorerUrl, '_blank');
        }
    }
    onGoToUpgradeView() {
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_UPGRADE_FROM_MODAL' });
        RouterController.push('UpgradeEmailWallet');
    }
};
W3mAccountDefaultWidget.styles = styles;
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "caipAddress", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "address", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "allAccounts", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "profileName", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "disconnecting", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "balance", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "balanceSymbol", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "features", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "remoteFeatures", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "namespace", void 0);
__decorate([
    state()
], W3mAccountDefaultWidget.prototype, "chainId", void 0);
W3mAccountDefaultWidget = __decorate([
    customElement('w3m-account-default-widget')
], W3mAccountDefaultWidget);
export { W3mAccountDefaultWidget };
//# sourceMappingURL=index.js.map