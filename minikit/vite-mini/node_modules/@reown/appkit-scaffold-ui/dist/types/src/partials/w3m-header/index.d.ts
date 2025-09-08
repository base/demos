import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-select';
import '@reown/appkit-ui/wui-tag';
import '@reown/appkit-ui/wui-text';
export declare class W3mHeader extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private heading;
    private network;
    private networkImage;
    private showBack;
    private prevHistoryLength;
    private view;
    private viewDirection;
    private headerText;
    constructor();
    disconnectCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private onWalletHelp;
    private onClose;
    private rightHeaderTemplate;
    private closeButtonTemplate;
    private titleTemplate;
    private leftHeaderTemplate;
    private onNetworks;
    private isAllowedNetworkSwitch;
    private getPadding;
    private onViewChange;
    private onHistoryChange;
    private onGoBack;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-header': W3mHeader;
    }
}
