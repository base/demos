import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-onramp-provider-item/index.js';
import '../../partials/w3m-onramp-providers-footer/index.js';
export declare class W3mOnRampProvidersView extends LitElement {
    private unsubscribe;
    private providers;
    constructor();
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private onRampProvidersTemplate;
    private onClickProvider;
    private getCoinbaseOnRampURL;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-onramp-providers-view': W3mOnRampProvidersView;
    }
}
