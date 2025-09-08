import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
export declare class WuiPromo extends LitElement {
    static styles: import("lit").CSSResult[];
    text: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-promo': WuiPromo;
    }
}
