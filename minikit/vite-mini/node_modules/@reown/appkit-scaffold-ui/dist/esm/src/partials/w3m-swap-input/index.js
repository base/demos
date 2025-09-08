var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { InputUtil, NumberUtil } from '@reown/appkit-common';
import { EventsController, RouterController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
import styles from './styles.js';
const MINIMUM_USD_VALUE_TO_CONVERT = 0.00005;
let W3mSwapInput = class W3mSwapInput extends LitElement {
    constructor() {
        super(...arguments);
        this.focused = false;
        this.price = 0;
        this.target = 'sourceToken';
        this.onSetAmount = null;
        this.onSetMaxValue = null;
    }
    render() {
        const marketValue = this.marketValue || '0';
        const isMarketValueGreaterThanZero = NumberUtil.bigNumber(marketValue).gt('0');
        return html `
      <wui-flex class="${this.focused ? 'focus' : ''}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${() => this.onFocusChange(true)}
            @focusout=${() => this.onFocusChange(false)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${isMarketValueGreaterThanZero
            ? `$${UiHelperUtil.formatNumberToLocalString(this.marketValue, 2)}`
            : null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
    }
    handleKeydown(event) {
        return InputUtil.numericInputKeyDown(event, this.value, (value) => this.onSetAmount?.(this.target, value));
    }
    dispatchInputChangeEvent(event) {
        if (!this.onSetAmount) {
            return;
        }
        const value = event.target.value.replace(/[^0-9.]/gu, '');
        if (value === ',' || value === '.') {
            this.onSetAmount(this.target, '0.');
        }
        else if (value.endsWith(',')) {
            this.onSetAmount(this.target, value.replace(',', '.'));
        }
        else {
            this.onSetAmount(this.target, value);
        }
    }
    setMaxValueToInput() {
        this.onSetMaxValue?.(this.target, this.balance);
    }
    templateTokenSelectButton() {
        if (!this.token) {
            return html ` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`;
        }
        return html `
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `;
    }
    tokenBalanceTemplate() {
        const balanceValueInUSD = NumberUtil.multiply(this.balance, this.price);
        const haveBalance = balanceValueInUSD
            ? balanceValueInUSD?.gt(MINIMUM_USD_VALUE_TO_CONVERT)
            : false;
        return html `
      ${haveBalance
            ? html `<wui-text variant="small-400" color="fg-200">
            ${UiHelperUtil.formatNumberToLocalString(this.balance, 2)}
          </wui-text>`
            : null}
      ${this.target === 'sourceToken' ? this.tokenActionButtonTemplate(haveBalance) : null}
    `;
    }
    tokenActionButtonTemplate(haveBalance) {
        if (haveBalance) {
            return html ` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>`;
        }
        return html ` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`;
    }
    onFocusChange(state) {
        this.focused = state;
    }
    onSelectToken() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_SELECT_TOKEN_TO_SWAP' });
        RouterController.push('SwapSelectToken', {
            target: this.target
        });
    }
    onBuyToken() {
        RouterController.push('OnRampProviders');
    }
};
W3mSwapInput.styles = [styles];
__decorate([
    property()
], W3mSwapInput.prototype, "focused", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "balance", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "value", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "price", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "marketValue", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "disabled", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "target", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "token", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "onSetAmount", void 0);
__decorate([
    property()
], W3mSwapInput.prototype, "onSetMaxValue", void 0);
W3mSwapInput = __decorate([
    customElement('w3m-swap-input')
], W3mSwapInput);
export { W3mSwapInput };
//# sourceMappingURL=index.js.map