import { LitElement } from 'lit';
export declare class WuiInputNumeric extends LitElement {
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    value: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-input-numeric': WuiInputNumeric;
    }
}
