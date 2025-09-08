import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import type { ColorType } from '../../utils/TypeUtil.js';
export declare class WuiLink extends LitElement {
    static styles: import("lit").CSSResult[];
    tabIdx?: number;
    disabled: boolean;
    color: ColorType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-link': WuiLink;
    }
}
