import { LitElement } from 'lit';
export declare class WuiBalance extends LitElement {
    static styles: import("lit").CSSResult[];
    dollars: string;
    pennies: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-balance': WuiBalance;
    }
}
