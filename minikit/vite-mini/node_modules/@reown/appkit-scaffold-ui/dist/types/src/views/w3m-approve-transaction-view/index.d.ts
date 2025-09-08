import { LitElement } from 'lit';
export declare class W3mApproveTransactionView extends LitElement {
    static styles: import("lit").CSSResult;
    private bodyObserver?;
    private unsubscribe;
    private iframe;
    ready: boolean;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    private onShowIframe;
    private onHideIframe;
    private syncTheme;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-approve-transaction-view': W3mApproveTransactionView;
    }
}
