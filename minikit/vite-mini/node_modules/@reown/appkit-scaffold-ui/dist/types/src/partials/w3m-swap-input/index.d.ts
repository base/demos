import { LitElement } from 'lit';
import { type SwapInputTarget, type SwapToken } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
export declare class W3mSwapInput extends LitElement {
    static styles: import("lit").CSSResult[];
    focused: boolean;
    balance: string | undefined;
    value?: string;
    price: number;
    marketValue?: string;
    disabled?: boolean;
    target: SwapInputTarget;
    token?: SwapToken;
    onSetAmount: ((target: SwapInputTarget, value: string) => void) | null;
    onSetMaxValue: ((target: SwapInputTarget, balance: string | undefined) => void) | null;
    render(): import("lit").TemplateResult<1>;
    private handleKeydown;
    private dispatchInputChangeEvent;
    private setMaxValueToInput;
    private templateTokenSelectButton;
    private tokenBalanceTemplate;
    private tokenActionButtonTemplate;
    private onFocusChange;
    private onSelectToken;
    private onBuyToken;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-input': W3mSwapInput;
    }
}
