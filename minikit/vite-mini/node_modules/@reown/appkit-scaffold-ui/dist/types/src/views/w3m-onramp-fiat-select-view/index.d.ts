import { LitElement } from 'lit';
import type { PaymentCurrency } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-text';
import '../../partials/w3m-legal-checkbox/index.js';
import '../../partials/w3m-legal-footer/index.js';
export declare class W3mOnrampFiatSelectView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    selectedCurrency: PaymentCurrency;
    currencies: PaymentCurrency[];
    private currencyImages;
    private checked;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private currenciesTemplate;
    private selectCurrency;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-fiat-select-view': W3mOnrampFiatSelectView;
    }
}
