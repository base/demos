import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-loading-thumbnail';
import '@reown/appkit-ui/wui-logo';
import '@reown/appkit-ui/wui-qr-code';
import '@reown/appkit-ui/wui-shimmer';
import '@reown/appkit-ui/wui-text';
export declare class W3mConnectingFarcasterView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    protected timeout?: ReturnType<typeof setTimeout>;
    private socialProvider;
    protected uri: string | undefined;
    protected ready: boolean;
    protected loading: boolean;
    authConnector: import("@reown/appkit-controllers").AuthConnector | undefined;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private platformTemplate;
    private desktopTemplate;
    private qrTemplate;
    private loadingTemplate;
    private mobileTemplate;
    private loaderTemplate;
    private connectFarcaster;
    private mobileLinkTemplate;
    private onRenderProxy;
    private qrCodeTemplate;
    private copyTemplate;
    private forceUpdate;
    protected onCopyUri(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-farcaster-view': W3mConnectingFarcasterView;
    }
}
