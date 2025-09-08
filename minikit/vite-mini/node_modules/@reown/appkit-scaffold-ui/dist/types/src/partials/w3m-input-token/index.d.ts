import { LitElement } from 'lit';
import type { Balance } from '@reown/appkit-common';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-input-amount';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
export declare class W3mInputToken extends LitElement {
    static styles: import("lit").CSSResult;
    token?: Balance;
    sendTokenAmount?: number;
    render(): import("lit").TemplateResult<1>;
    private buttonTemplate;
    private handleSelectButtonClick;
    private sendValueTemplate;
    private maxAmountTemplate;
    private actionTemplate;
    private onInputChange;
    private onMaxClick;
    private onBuyClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-input-token': W3mInputToken;
    }
}
