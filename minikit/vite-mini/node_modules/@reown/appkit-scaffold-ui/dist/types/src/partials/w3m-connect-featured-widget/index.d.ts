import { LitElement } from 'lit';
import type { WcWallet } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
export declare class W3mConnectFeaturedWidget extends LitElement {
    tabIdx?: number;
    wallets: WcWallet[];
    render(): import("lit").TemplateResult<1> | null;
    private onConnectWallet;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connect-featured-widget': W3mConnectFeaturedWidget;
    }
}
