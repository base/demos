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
import { AccountController, AssetController, ChainController, ConnectionController, ConnectorController, ConstantsUtil, CoreHelperUtil, EventsController, ModalController, RouterController, SendController, SnackController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-avatar';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-notice-card';
import '@reown/appkit-ui/wui-text';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import '../../partials/w3m-account-auth-button/index.js';
let W3mAccountSettingsView = class W3mAccountSettingsView extends LitElement {
    constructor() {
        super();
        this.usubscribe = [];
        this.networkImages = AssetController.state.networkImages;
        this.address = AccountController.state.address;
        this.profileImage = AccountController.state.profileImage;
        this.profileName = AccountController.state.profileName;
        this.network = ChainController.state.activeCaipNetwork;
        this.preferredAccountTypes = AccountController.state.preferredAccountTypes;
        this.disconnecting = false;
        this.loading = false;
        this.switched = false;
        this.text = '';
        this.usubscribe.push(...[
            AccountController.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileImage = val.profileImage;
                    this.profileName = val.profileName;
                    this.preferredAccountTypes = val.preferredAccountTypes;
                }
            }),
            AccountController.subscribeKey('preferredAccountTypes', val => (this.preferredAccountTypes = val)),
            ChainController.subscribeKey('activeCaipNetwork', val => {
                if (val?.id) {
                    this.network = val;
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.usubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-account-settings-view: No account provided');
        }
        const networkImage = this.networkImages[this.network?.assets?.imageId ?? ''];
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${['0', 'xl', 'm', 'xl']}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${ifDefined(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${UiHelperUtil.getTruncateString({
            string: this.address,
            charsStart: 4,
            charsEnd: 6,
            truncate: 'middle'
        })}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${['0', 'l', 'm', 'l']}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${networkImage ? 'image' : 'icon'}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${ifDefined(networkImage)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name ?? 'Unknown'}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
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
        </wui-flex>
      </wui-flex>
    `;
    }
    chooseNameButtonTemplate() {
        const namespace = this.network?.chainNamespace;
        const connectorId = ConnectorController.getConnectorId(namespace);
        const authConnector = ConnectorController.getAuthConnector();
        const hasNetworkSupport = ChainController.checkIfNamesSupported();
        if (!hasNetworkSupport ||
            !authConnector ||
            connectorId !== CommonConstantsUtil.CONNECTOR_ID.AUTH ||
            this.profileName) {
            return null;
        }
        return html `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${true}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `;
    }
    authCardTemplate() {
        const namespace = this.network?.chainNamespace;
        const connectorId = ConnectorController.getConnectorId(namespace);
        const authConnector = ConnectorController.getAuthConnector();
        const { origin } = location;
        if (!authConnector ||
            connectorId !== CommonConstantsUtil.CONNECTOR_ID.AUTH ||
            origin.includes(ConstantsUtil.SECURE_SITE)) {
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
    isAllowedNetworkSwitch() {
        const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
        const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
        const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id);
        return isMultiNetwork || !isValidNetwork;
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
    togglePreferredAccountBtnTemplate() {
        const namespace = this.network?.chainNamespace;
        const isNetworkEnabled = ChainController.checkIfSmartAccountEnabled();
        const connectorId = ConnectorController.getConnectorId(namespace);
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector ||
            connectorId !== CommonConstantsUtil.CONNECTOR_ID.AUTH ||
            !isNetworkEnabled) {
            return null;
        }
        if (!this.switched) {
            this.text =
                this.preferredAccountTypes?.[namespace] === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
                    ? 'Switch to your EOA'
                    : 'Switch to your smart account';
        }
        return html `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${true}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `;
    }
    onChooseName() {
        RouterController.push('ChooseAccountName');
    }
    async changePreferredAccountType() {
        const namespace = this.network?.chainNamespace;
        const isSmartAccountEnabled = ChainController.checkIfSmartAccountEnabled();
        const accountTypeTarget = this.preferredAccountTypes?.[namespace] ===
            W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT || !isSmartAccountEnabled
            ? W3mFrameRpcConstants.ACCOUNT_TYPES.EOA
            : W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT;
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector) {
            return;
        }
        this.loading = true;
        await ConnectionController.setPreferredAccountType(accountTypeTarget, namespace);
        this.text =
            accountTypeTarget === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
                ? 'Switch to your EOA'
                : 'Switch to your smart account';
        this.switched = true;
        SendController.resetSend();
        this.loading = false;
        this.requestUpdate();
    }
    onNetworks() {
        if (this.isAllowedNetworkSwitch()) {
            RouterController.push('Networks');
        }
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
    onGoToUpgradeView() {
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_UPGRADE_FROM_MODAL' });
        RouterController.push('UpgradeEmailWallet');
    }
};
__decorate([
    state()
], W3mAccountSettingsView.prototype, "address", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "profileName", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "network", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "preferredAccountTypes", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "disconnecting", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "loading", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "switched", void 0);
__decorate([
    state()
], W3mAccountSettingsView.prototype, "text", void 0);
W3mAccountSettingsView = __decorate([
    customElement('w3m-account-settings-view')
], W3mAccountSettingsView);
export { W3mAccountSettingsView };
//# sourceMappingURL=index.js.map