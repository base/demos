import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-shimmer';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
export declare class W3mAllWalletsListItem extends LitElement {
    static styles: import("lit").CSSResult;
    private observer;
    private visible;
    private imageSrc;
    private imageLoading;
    private wallet;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private imageTemplate;
    private shimmerTemplate;
    private fetchImageSrc;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-list-item': W3mAllWalletsListItem;
    }
}
