var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetController, ModalController, OnRampController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-input-text';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mInputCurrency = class W3mInputCurrency extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.type = 'Token';
        this.value = 0;
        this.currencies = [];
        this.selectedCurrency = this.currencies?.[0];
        this.currencyImages = AssetController.state.currencyImages;
        this.tokenImages = AssetController.state.tokenImages;
        this.unsubscribe.push(OnRampController.subscribeKey('purchaseCurrency', val => {
            if (!val || this.type === 'Fiat') {
                return;
            }
            this.selectedCurrency = this.formatPurchaseCurrency(val);
        }), OnRampController.subscribeKey('paymentCurrency', val => {
            if (!val || this.type === 'Token') {
                return;
            }
            this.selectedCurrency = this.formatPaymentCurrency(val);
        }), OnRampController.subscribe(val => {
            if (this.type === 'Fiat') {
                this.currencies = val.purchaseCurrencies.map(this.formatPurchaseCurrency);
            }
            else {
                this.currencies = val.paymentCurrencies.map(this.formatPaymentCurrency);
            }
        }), AssetController.subscribe(val => {
            this.currencyImages = { ...val.currencyImages };
            this.tokenImages = { ...val.tokenImages };
        }));
    }
    firstUpdated() {
        OnRampController.getAvailableCurrencies();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const symbol = this.selectedCurrency?.symbol || '';
        const image = this.currencyImages[symbol] || this.tokenImages[symbol];
        return html `<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency
            ? html ` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${() => ModalController.open({ view: `OnRamp${this.type}Select` })}
          >
            <wui-image src=${ifDefined(image)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`
            : html `<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`;
    }
    formatPaymentCurrency(currency) {
        return {
            name: currency.id,
            symbol: currency.id
        };
    }
    formatPurchaseCurrency(currency) {
        return {
            name: currency.name,
            symbol: currency.symbol
        };
    }
};
W3mInputCurrency.styles = styles;
__decorate([
    property({ type: String })
], W3mInputCurrency.prototype, "type", void 0);
__decorate([
    property({ type: Number })
], W3mInputCurrency.prototype, "value", void 0);
__decorate([
    state()
], W3mInputCurrency.prototype, "currencies", void 0);
__decorate([
    state()
], W3mInputCurrency.prototype, "selectedCurrency", void 0);
__decorate([
    state()
], W3mInputCurrency.prototype, "currencyImages", void 0);
__decorate([
    state()
], W3mInputCurrency.prototype, "tokenImages", void 0);
W3mInputCurrency = __decorate([
    customElement('w3m-onramp-input')
], W3mInputCurrency);
export { W3mInputCurrency };
//# sourceMappingURL=index.js.map