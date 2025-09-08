import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-onramp-input/index.js';
export declare class W3mOnrampWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    disabled?: boolean | undefined;
    private caipAddress;
    private loading;
    private paymentCurrency;
    private paymentAmount;
    private purchaseAmount;
    private quoteLoading;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private templateButton;
    private getQuotes;
    private openModal;
    private onPaymentAmountChange;
    private selectPresetAmount;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-widget': W3mOnrampWidget;
    }
}
