import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
import '../../partials/w3m-swap-details/index.js';
export declare class W3mSwapPreviewView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private interval?;
    private detailsOpen;
    private approvalTransaction;
    private swapTransaction;
    private sourceToken;
    private sourceTokenAmount;
    private sourceTokenPriceInUSD;
    private toToken;
    private toTokenAmount;
    private toTokenPriceInUSD;
    private caipNetwork;
    private balanceSymbol;
    private inputError;
    private loadingQuote;
    private loadingApprovalTransaction;
    private loadingBuildTransaction;
    private loadingTransaction;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private refreshTransaction;
    private templateSwap;
    private templateDetails;
    private actionButtonLabel;
    private onCancelTransaction;
    private onSendTransaction;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-preview-view': W3mSwapPreviewView;
    }
}
