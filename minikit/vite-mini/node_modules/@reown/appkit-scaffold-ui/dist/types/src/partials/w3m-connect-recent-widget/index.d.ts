import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
export declare class W3mConnectRecentWidget extends LitElement {
    private unsubscribe;
    tabIdx?: number;
    private connectors;
    private loading;
    constructor();
    render(): import("lit").TemplateResult<1> | null;
    private onConnectWallet;
    private hasWalletConnector;
    private isWalletCompatibleWithCurrentChain;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-recent-widget': W3mConnectRecentWidget;
    }
}
