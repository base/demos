import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-item';
export declare class W3mGetWalletView extends LitElement {
    render(): import("lit").TemplateResult<1>;
    private recommendedWalletsTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-get-wallet-view': W3mGetWalletView;
    }
}
