var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { NumberUtil } from '@reown/appkit-common';
import { RouterController, SendController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-input-amount';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
import styles from './styles.js';
let W3mInputToken = class W3mInputToken extends LitElement {
    render() {
        return html ` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${['xl', 's', 'l', 'l']}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token && true}
          .value=${this.sendTokenAmount ? String(this.sendTokenAmount) : ''}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`;
    }
    buttonTemplate() {
        if (this.token) {
            return html `<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`;
        }
        return html `<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`;
    }
    handleSelectButtonClick() {
        RouterController.push('WalletSendSelectToken');
    }
    sendValueTemplate() {
        if (this.token && this.sendTokenAmount) {
            const price = this.token.price;
            const totalValue = price * this.sendTokenAmount;
            return html `<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${totalValue
                ? `$${UiHelperUtil.formatNumberToLocalString(totalValue, 2)}`
                : 'Incorrect value'}</wui-text
      >`;
        }
        return null;
    }
    maxAmountTemplate() {
        if (this.token) {
            if (this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric)) {
                return html ` <wui-text variant="small-400" color="error-100">
          ${UiHelperUtil.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
        </wui-text>`;
            }
            return html ` <wui-text variant="small-400" color="fg-200">
        ${UiHelperUtil.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
      </wui-text>`;
        }
        return null;
    }
    actionTemplate() {
        if (this.token) {
            if (this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric)) {
                return html `<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`;
            }
            return html `<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`;
        }
        return null;
    }
    onInputChange(event) {
        SendController.setTokenAmount(event.detail);
    }
    onMaxClick() {
        if (this.token) {
            const maxValue = NumberUtil.bigNumber(this.token.quantity.numeric);
            SendController.setTokenAmount(Number(maxValue.toFixed(20)));
        }
    }
    onBuyClick() {
        RouterController.push('OnRampProviders');
    }
};
W3mInputToken.styles = styles;
__decorate([
    property({ type: Object })
], W3mInputToken.prototype, "token", void 0);
__decorate([
    property({ type: Number })
], W3mInputToken.prototype, "sendTokenAmount", void 0);
W3mInputToken = __decorate([
    customElement('w3m-input-token')
], W3mInputToken);
export { W3mInputToken };
//# sourceMappingURL=index.js.map