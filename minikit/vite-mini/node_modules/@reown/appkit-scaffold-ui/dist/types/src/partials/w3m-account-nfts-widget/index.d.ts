import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
export declare class W3mAccountNftsWidget extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private nftTemplate;
    private onReceiveClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-nfts-widget': W3mAccountNftsWidget;
    }
}
