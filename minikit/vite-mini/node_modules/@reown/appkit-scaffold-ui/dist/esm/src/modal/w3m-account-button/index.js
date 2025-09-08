var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AccountController, AssetController, AssetUtil, ChainController, CoreHelperUtil, ModalController, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-account-button';
class W3mAccountButtonBase extends LitElement {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.disabled = false;
        this.balance = 'show';
        this.charsStart = 4;
        this.charsEnd = 6;
        this.namespace = undefined;
        this.caipAddress = ChainController.getAccountData(this.namespace)?.caipAddress;
        this.balanceVal = ChainController.getAccountData(this.namespace)?.balance;
        this.balanceSymbol = ChainController.getAccountData(this.namespace)?.balanceSymbol;
        this.profileName = ChainController.getAccountData(this.namespace)?.profileName;
        this.profileImage = ChainController.getAccountData(this.namespace)?.profileImage;
        this.network = ChainController.getNetworkData(this.namespace)?.caipNetwork;
        this.networkImage = AssetUtil.getNetworkImage(this.network);
        this.isSupported = OptionsController.state.allowUnsupportedChain
            ? true
            : ChainController.state.activeChain
                ? ChainController.checkIfSupportedNetwork(ChainController.state.activeChain)
                : true;
    }
    firstUpdated() {
        const namespace = this.namespace;
        if (namespace) {
            this.unsubscribe.push(ChainController.subscribeChainProp('accountState', val => {
                this.caipAddress = val?.caipAddress;
                this.balanceVal = val?.balance;
                this.balanceSymbol = val?.balanceSymbol;
                this.profileName = val?.profileName;
                this.profileImage = val?.profileImage;
            }, namespace), ChainController.subscribeChainProp('networkState', val => {
                this.network = val?.caipNetwork;
                this.isSupported = ChainController.checkIfSupportedNetwork(namespace, val?.caipNetwork);
                this.networkImage = AssetUtil.getNetworkImage(val?.caipNetwork);
            }, namespace));
        }
        else {
            this.unsubscribe.push(AssetController.subscribeNetworkImages(() => {
                this.networkImage = AssetUtil.getNetworkImage(this.network);
            }), ChainController.subscribeKey('activeCaipAddress', val => {
                this.caipAddress = val;
            }), AccountController.subscribeKey('balance', val => (this.balanceVal = val)), AccountController.subscribeKey('balanceSymbol', val => (this.balanceSymbol = val)), AccountController.subscribeKey('profileName', val => (this.profileName = val)), AccountController.subscribeKey('profileImage', val => (this.profileImage = val)), ChainController.subscribeKey('activeCaipNetwork', val => {
                this.network = val;
                this.networkImage = AssetUtil.getNetworkImage(val);
                this.isSupported = val?.chainNamespace
                    ? ChainController.checkIfSupportedNetwork(val?.chainNamespace)
                    : true;
                this.fetchNetworkImage(val);
            }));
        }
    }
    updated() {
        this.fetchNetworkImage(this.network);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!ChainController.state.activeChain) {
            return null;
        }
        const shouldShowBalance = this.balance === 'show';
        const shouldShowLoading = typeof this.balanceVal !== 'string';
        return html `
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        .isUnsupportedChain=${OptionsController.state.allowUnsupportedChain
            ? false
            : !this.isSupported}
        address=${ifDefined(CoreHelperUtil.getPlainAddress(this.caipAddress))}
        profileName=${ifDefined(this.profileName)}
        networkSrc=${ifDefined(this.networkImage)}
        avatarSrc=${ifDefined(this.profileImage)}
        balance=${shouldShowBalance
            ? CoreHelperUtil.formatBalance(this.balanceVal, this.balanceSymbol)
            : ''}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace ? `-${this.namespace}` : ''}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${shouldShowLoading}
      >
      </wui-account-button>
    `;
    }
    onClick() {
        if (this.isSupported || OptionsController.state.allowUnsupportedChain) {
            ModalController.open({ namespace: this.namespace });
        }
        else {
            ModalController.open({ view: 'UnsupportedChain' });
        }
    }
    async fetchNetworkImage(network) {
        if (network?.assets?.imageId) {
            this.networkImage = await AssetUtil.fetchNetworkImage(network?.assets?.imageId);
        }
    }
}
__decorate([
    property({ type: Boolean })
], W3mAccountButtonBase.prototype, "disabled", void 0);
__decorate([
    property()
], W3mAccountButtonBase.prototype, "balance", void 0);
__decorate([
    property()
], W3mAccountButtonBase.prototype, "charsStart", void 0);
__decorate([
    property()
], W3mAccountButtonBase.prototype, "charsEnd", void 0);
__decorate([
    property()
], W3mAccountButtonBase.prototype, "namespace", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "caipAddress", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "balanceVal", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "balanceSymbol", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "profileName", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "network", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "networkImage", void 0);
__decorate([
    state()
], W3mAccountButtonBase.prototype, "isSupported", void 0);
let W3mAccountButton = class W3mAccountButton extends W3mAccountButtonBase {
};
W3mAccountButton = __decorate([
    customElement('w3m-account-button')
], W3mAccountButton);
export { W3mAccountButton };
let AppKitAccountButton = class AppKitAccountButton extends W3mAccountButtonBase {
};
AppKitAccountButton = __decorate([
    customElement('appkit-account-button')
], AppKitAccountButton);
export { AppKitAccountButton };
//# sourceMappingURL=index.js.map