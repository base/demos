import { LitElement } from 'lit';
import { type Ref } from 'lit/directives/ref.js';
export declare class WuiInputAmount extends LitElement {
    static styles: import("lit").CSSResult[];
    inputElementRef: Ref<HTMLInputElement>;
    disabled: boolean;
    value: string;
    placeholder: string;
    render(): import("lit").TemplateResult<1>;
    private dispatchInputChangeEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-input-amount': WuiInputAmount;
    }
}
