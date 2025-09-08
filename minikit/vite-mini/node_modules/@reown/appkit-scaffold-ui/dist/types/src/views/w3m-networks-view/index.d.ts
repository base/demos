import { LitElement } from 'lit';
import { type CaipNetwork } from '@reown/appkit-common';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-input-text';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-list-network';
import '@reown/appkit-ui/wui-separator';
import '@reown/appkit-ui/wui-text';
export declare class W3mNetworksView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    network: CaipNetwork | undefined;
    requestedCaipNetworks: CaipNetwork[];
    private filteredNetworks?;
    private search;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private templateSearchInput;
    private onInputChange;
    private onDebouncedSearch;
    private onNetworkHelp;
    private networksTemplate;
    private getNetworkDisabled;
    private onSwitchNetwork;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-networks-view': W3mNetworksView;
    }
}
