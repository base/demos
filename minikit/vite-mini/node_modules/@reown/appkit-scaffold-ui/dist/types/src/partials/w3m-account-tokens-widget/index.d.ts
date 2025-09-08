import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-description';
import '@reown/appkit-ui/wui-list-token';
export declare class W3mAccountTokensWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private tokenBalance;
    private remoteFeatures;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private tokenTemplate;
    private onRampTemplate;
    private tokenItemTemplate;
    private onReceiveClick;
    private onBuyClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-tokens-widget': W3mAccountTokensWidget;
    }
}
