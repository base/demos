import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-network-button';
declare class W3mNetworkButtonBase extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    disabled?: boolean | undefined;
    label?: string;
    private network;
    private networkImage;
    private caipAddress;
    private loading;
    private isSupported;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private getLabel;
    private onClick;
}
export declare class W3mNetworkButton extends W3mNetworkButtonBase {
}
export declare class AppKitNetworkButton extends W3mNetworkButtonBase {
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-network-button': W3mNetworkButton;
        'appkit-network-button': AppKitNetworkButton;
    }
}
export {};
