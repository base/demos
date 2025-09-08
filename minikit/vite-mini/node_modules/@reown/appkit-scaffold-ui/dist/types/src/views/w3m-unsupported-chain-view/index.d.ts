import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-list-network';
import '@reown/appkit-ui/wui-separator';
import '@reown/appkit-ui/wui-text';
export declare class W3mUnsupportedChainView extends LitElement {
    static styles: import("lit").CSSResult;
    protected readonly swapUnsupportedChain: boolean | undefined;
    private unsubscribe;
    private disconecting;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private descriptionTemplate;
    private networksTemplate;
    private onDisconnect;
    private onSwitchNetwork;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-unsupported-chain-view': W3mUnsupportedChainView;
    }
}
