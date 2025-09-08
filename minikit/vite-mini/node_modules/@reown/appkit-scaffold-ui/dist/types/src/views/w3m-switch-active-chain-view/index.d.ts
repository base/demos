import { LitElement } from 'lit';
import { type ChainNamespace } from '@reown/appkit-common';
export declare class W3mSwitchActiveChainView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    protected readonly switchToChain: ChainNamespace | undefined;
    protected readonly caipNetwork: import("@reown/appkit-common").CaipNetwork | undefined;
    activeChain: ChainNamespace | undefined;
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private switchActiveChain;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-switch-active-chain-view': W3mSwitchActiveChainView;
    }
}
