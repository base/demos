var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ChainController, CoreHelperUtil, RouterController, SendController, SwapController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '../../partials/w3m-input-address/index.js';
import '../../partials/w3m-input-token/index.js';
import styles from './styles.js';
let W3mWalletSendView = class W3mWalletSendView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.token = SendController.state.token;
        this.sendTokenAmount = SendController.state.sendTokenAmount;
        this.receiverAddress = SendController.state.receiverAddress;
        this.receiverProfileName = SendController.state.receiverProfileName;
        this.loading = SendController.state.loading;
        this.message = 'Preview Send';
        this.fetchNetworkPrice();
        this.fetchBalances();
        this.unsubscribe.push(...[
            SendController.subscribe(val => {
                this.token = val.token;
                this.sendTokenAmount = val.sendTokenAmount;
                this.receiverAddress = val.receiverAddress;
                this.receiverProfileName = val.receiverProfileName;
                this.loading = val.loading;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        this.getMessage();
        return html ` <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName ? this.receiverProfileName : this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${['l', '0', '0', '0']}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith('Preview Send')}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`;
    }
    async fetchBalances() {
        await SendController.fetchTokenBalance();
        SendController.fetchNetworkBalance();
    }
    async fetchNetworkPrice() {
        await SwapController.getNetworkTokenPrice();
    }
    onButtonClick() {
        RouterController.push('WalletSendPreview');
    }
    getMessage() {
        this.message = 'Preview Send';
        if (this.receiverAddress &&
            !CoreHelperUtil.isAddress(this.receiverAddress, ChainController.state.activeChain)) {
            this.message = 'Invalid Address';
        }
        if (!this.receiverAddress) {
            this.message = 'Add Address';
        }
        if (this.sendTokenAmount &&
            this.token &&
            this.sendTokenAmount > Number(this.token.quantity.numeric)) {
            this.message = 'Insufficient Funds';
        }
        if (!this.sendTokenAmount) {
            this.message = 'Add Amount';
        }
        if (this.sendTokenAmount && this.token?.price) {
            const value = this.sendTokenAmount * this.token.price;
            if (!value) {
                this.message = 'Incorrect Value';
            }
        }
        if (!this.token) {
            this.message = 'Select Token';
        }
    }
};
W3mWalletSendView.styles = styles;
__decorate([
    state()
], W3mWalletSendView.prototype, "token", void 0);
__decorate([
    state()
], W3mWalletSendView.prototype, "sendTokenAmount", void 0);
__decorate([
    state()
], W3mWalletSendView.prototype, "receiverAddress", void 0);
__decorate([
    state()
], W3mWalletSendView.prototype, "receiverProfileName", void 0);
__decorate([
    state()
], W3mWalletSendView.prototype, "loading", void 0);
__decorate([
    state()
], W3mWalletSendView.prototype, "message", void 0);
W3mWalletSendView = __decorate([
    customElement('w3m-wallet-send-view')
], W3mWalletSendView);
export { W3mWalletSendView };
//# sourceMappingURL=index.js.map