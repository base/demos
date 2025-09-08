import { LitElement } from 'lit';
import { type Connector } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
export declare class W3mConnectingMultiChainView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    protected activeConnector: Connector | undefined;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private networksTemplate;
    private onConnector;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-multi-chain-view': W3mConnectingMultiChainView;
    }
}
