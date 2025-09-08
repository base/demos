import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-visual-thumbnail';
export declare class W3mSIWXSignMessageThumbnails extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly dappImageUrl;
    private readonly walletImageUrl;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private createAnimation;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-siwx-sign-message-thumbnails': W3mSIWXSignMessageThumbnails;
    }
}
