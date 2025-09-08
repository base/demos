import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-input-text';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
import '@reown/appkit-ui/wui-token-list-item';
export declare class W3mSwapSelectTokenView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private interval?;
    private targetToken;
    private sourceToken;
    private sourceTokenAmount;
    private toToken;
    private myTokensWithBalance;
    private popularTokens;
    private searchValue;
    constructor();
    updated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private onSelectToken;
    private templateSearchInput;
    private templateTokens;
    private templateSuggestedTokens;
    private onSearchInputChange;
    private handleSuggestedTokensScroll;
    private handleTokenListScroll;
    private filterTokensWithText;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-select-token-view': W3mSwapSelectTokenView;
    }
}
