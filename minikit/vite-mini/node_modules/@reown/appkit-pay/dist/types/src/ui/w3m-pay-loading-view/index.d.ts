import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-loading-thumbnail';
import '@reown/appkit-ui/wui-text';
export declare class W3mPayLoadingView extends LitElement {
    static styles: import("lit").CSSResult;
    private loadingMessage;
    private subMessage;
    private paymentState;
    private exchangeSubscription?;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private updateMessages;
    private getStateIcon;
    private setupExchangeSubscription;
    private setupSubscription;
    private loaderTemplate;
    private successTemplate;
    private errorTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-pay-loading-view': W3mPayLoadingView;
    }
}
