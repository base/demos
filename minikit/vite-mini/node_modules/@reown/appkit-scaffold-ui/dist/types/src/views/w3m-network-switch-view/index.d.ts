import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-box';
import '@reown/appkit-ui/wui-loading-hexagon';
import '@reown/appkit-ui/wui-network-image';
import '@reown/appkit-ui/wui-text';
export declare class W3mNetworkSwitchView extends LitElement {
    static styles: import("lit").CSSResult;
    private network;
    private unsubscribe;
    private showRetry;
    error: boolean;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private getSubLabel;
    private getLabel;
    private onShowRetry;
    private onSwitchNetwork;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-network-switch-view': W3mNetworkSwitchView;
    }
}
