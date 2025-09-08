import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-chip-button';
import '@reown/appkit-ui/wui-compatible-network';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-qr-code';
import '@reown/appkit-ui/wui-text';
export declare class W3mWalletReceiveView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private address;
    private profileName;
    private network;
    private preferredAccountTypes;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    networkTemplate(): import("lit").TemplateResult<1> | null;
    onReceiveClick(): void;
    onCopyClick(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-receive-view': W3mWalletReceiveView;
    }
}
