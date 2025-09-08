import { LitElement } from 'lit';
import type { PurchaseCurrency } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-text';
import '../../partials/w3m-legal-checkbox/index.js';
import '../../partials/w3m-legal-footer/index.js';
export declare class W3mOnrampTokensView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    selectedCurrency: PurchaseCurrency[];
    tokens: PurchaseCurrency[];
    private tokenImages;
    private checked;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private currenciesTemplate;
    private selectToken;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-token-select-view': W3mOnrampTokensView;
    }
}
