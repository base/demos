import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-banner';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-network';
export declare class W3mWalletCompatibleNetworksView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private preferredAccountTypes;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    networkTemplate(): import("lit").TemplateResult<1>[] | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-compatible-networks-view': W3mWalletCompatibleNetworksView;
    }
}
