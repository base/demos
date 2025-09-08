import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-activity-list/index.js';
export declare class W3mTransactionsView extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-transactions-view': W3mTransactionsView;
    }
}
