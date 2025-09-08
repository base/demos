import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
import '../w3m-tooltip-trigger/index.js';
import '../w3m-tooltip/index.js';
export declare class WuiSwapDetails extends LitElement {
    static styles: import("lit").CSSResult[];
    private unsubscribe;
    networkName: string | undefined;
    detailsOpen: boolean;
    sourceToken: import("@reown/appkit-controllers").SwapTokenWithBalance | undefined;
    toToken: import("@reown/appkit-controllers").SwapTokenWithBalance | undefined;
    toTokenAmount: string;
    sourceTokenPriceInUSD: number;
    toTokenPriceInUSD: number;
    priceImpact: number | undefined;
    maxSlippage: number | undefined;
    networkTokenSymbol: string;
    inputError: string | undefined;
    constructor();
    render(): import("lit").TemplateResult<1> | null;
    private toggleDetails;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-w3m-details': WuiSwapDetails;
    }
}
