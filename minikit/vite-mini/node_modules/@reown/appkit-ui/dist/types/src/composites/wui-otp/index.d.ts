import { LitElement } from 'lit';
import '../../layout/wui-flex/index.js';
import '../wui-input-numeric/index.js';
export declare class WuiOtp extends LitElement {
    static styles: import("lit").CSSResult[];
    length: number;
    otp: string;
    values: string[];
    private numerics;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private updateInput;
    private selectInput;
    private handleInput;
    private shouldInputBeEnabled;
    private handleKeyDown;
    private handlePaste;
    private focusInputField;
    private getInputElement;
    private dispatchInputChangeEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-otp': WuiOtp;
    }
}
