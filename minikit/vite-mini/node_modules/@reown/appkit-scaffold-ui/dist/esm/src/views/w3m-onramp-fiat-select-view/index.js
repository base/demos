var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetController, ModalController, OnRampController, OptionsController, OptionsStateController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-text';
import '../../partials/w3m-legal-checkbox/index.js';
import '../../partials/w3m-legal-footer/index.js';
import styles from './styles.js';
let W3mOnrampFiatSelectView = class W3mOnrampFiatSelectView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.selectedCurrency = OnRampController.state.paymentCurrency;
        this.currencies = OnRampController.state.paymentCurrencies;
        this.currencyImages = AssetController.state.currencyImages;
        this.checked = OptionsStateController.state.isLegalCheckboxChecked;
        this.unsubscribe.push(...[
            OnRampController.subscribe(val => {
                this.selectedCurrency = val.paymentCurrency;
                this.currencies = val.paymentCurrencies;
            }),
            AssetController.subscribeKey('currencyImages', val => (this.currencyImages = val)),
            OptionsStateController.subscribeKey('isLegalCheckboxChecked', val => {
                this.checked = val;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
        const legalCheckbox = OptionsController.state.features?.legalCheckbox;
        const legalUrl = termsConditionsUrl || privacyPolicyUrl;
        const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
        const disabled = showLegalCheckbox && !this.checked;
        return html `
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${['0', 's', 's', 's']}
        gap="xs"
        class=${ifDefined(disabled ? 'disabled' : undefined)}
      >
        ${this.currenciesTemplate(disabled)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
    currenciesTemplate(disabled = false) {
        return this.currencies.map(currency => html `
        <wui-list-item
          imageSrc=${ifDefined(this.currencyImages?.[currency.id])}
          @click=${() => this.selectCurrency(currency)}
          variant="image"
          tabIdx=${ifDefined(disabled ? -1 : undefined)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${currency.id}</wui-text>
        </wui-list-item>
      `);
    }
    selectCurrency(currency) {
        if (!currency) {
            return;
        }
        OnRampController.setPaymentCurrency(currency);
        ModalController.close();
    }
};
W3mOnrampFiatSelectView.styles = styles;
__decorate([
    state()
], W3mOnrampFiatSelectView.prototype, "selectedCurrency", void 0);
__decorate([
    state()
], W3mOnrampFiatSelectView.prototype, "currencies", void 0);
__decorate([
    state()
], W3mOnrampFiatSelectView.prototype, "currencyImages", void 0);
__decorate([
    state()
], W3mOnrampFiatSelectView.prototype, "checked", void 0);
W3mOnrampFiatSelectView = __decorate([
    customElement('w3m-onramp-fiat-select-view')
], W3mOnrampFiatSelectView);
export { W3mOnrampFiatSelectView };
//# sourceMappingURL=index.js.map