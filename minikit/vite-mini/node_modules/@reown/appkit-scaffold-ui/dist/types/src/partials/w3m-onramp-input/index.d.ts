import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-image';
import '@reown/appkit-ui/wui-input-text';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-text';
type Currency = {
    name: string;
    symbol: string;
};
export declare class W3mInputCurrency extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    type: 'Token' | 'Fiat';
    value: number;
    currencies: Currency[] | null;
    selectedCurrency: Currency | undefined;
    private currencyImages;
    private tokenImages;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private formatPaymentCurrency;
    private formatPurchaseCurrency;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-input': W3mInputCurrency;
    }
}
export {};
