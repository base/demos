var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ChainController, ModalController, OnRampController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-onramp-input/index.js';
import styles from './styles.js';
const PAYMENT_CURRENCY_SYMBOLS = {
    USD: '$',
    EUR: '€',
    GBP: '£'
};
const BUY_PRESET_AMOUNTS = [100, 250, 500, 1000];
let W3mOnrampWidget = class W3mOnrampWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.disabled = false;
        this.caipAddress = ChainController.state.activeCaipAddress;
        this.loading = ModalController.state.loading;
        this.paymentCurrency = OnRampController.state.paymentCurrency;
        this.paymentAmount = OnRampController.state.paymentAmount;
        this.purchaseAmount = OnRampController.state.purchaseAmount;
        this.quoteLoading = OnRampController.state.quotesLoading;
        this.unsubscribe.push(...[
            ChainController.subscribeKey('activeCaipAddress', val => (this.caipAddress = val)),
            ModalController.subscribeKey('loading', val => {
                this.loading = val;
            }),
            OnRampController.subscribe(val => {
                this.paymentCurrency = val.paymentCurrency;
                this.paymentAmount = val.paymentAmount;
                this.purchaseAmount = val.purchaseAmount;
                this.quoteLoading = val.quotesLoading;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount || 0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount || 0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${BUY_PRESET_AMOUNTS.map(amount => html `<wui-button
                  variant=${this.paymentAmount === amount ? 'accent' : 'neutral'}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${() => this.selectPresetAmount(amount)}
                  >${`${PAYMENT_CURRENCY_SYMBOLS[this.paymentCurrency?.id || 'USD']} ${amount}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `;
    }
    templateButton() {
        return this.caipAddress
            ? html `<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`
            : html `<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`;
    }
    getQuotes() {
        if (!this.loading) {
            ModalController.open({ view: 'OnRampProviders' });
        }
    }
    openModal() {
        ModalController.open({ view: 'Connect' });
    }
    async onPaymentAmountChange(event) {
        OnRampController.setPaymentAmount(Number(event.detail));
        await OnRampController.getQuote();
    }
    async selectPresetAmount(amount) {
        OnRampController.setPaymentAmount(amount);
        await OnRampController.getQuote();
    }
};
W3mOnrampWidget.styles = styles;
__decorate([
    property({ type: Boolean })
], W3mOnrampWidget.prototype, "disabled", void 0);
__decorate([
    state()
], W3mOnrampWidget.prototype, "caipAddress", void 0);
__decorate([
    state()
], W3mOnrampWidget.prototype, "loading", void 0);
__decorate([
    state()
], W3mOnrampWidget.prototype, "paymentCurrency", void 0);
__decorate([
    state()
], W3mOnrampWidget.prototype, "paymentAmount", void 0);
__decorate([
    state()
], W3mOnrampWidget.prototype, "purchaseAmount", void 0);
__decorate([
    state()
], W3mOnrampWidget.prototype, "quoteLoading", void 0);
W3mOnrampWidget = __decorate([
    customElement('w3m-onramp-widget')
], W3mOnrampWidget);
export { W3mOnrampWidget };
//# sourceMappingURL=index.js.map