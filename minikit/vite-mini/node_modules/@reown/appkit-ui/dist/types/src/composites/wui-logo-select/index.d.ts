import { LitElement } from 'lit';
import type { LogoType } from '../../utils/TypeUtil.js';
import '../wui-logo/index.js';
export declare class WuiLogoSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    logo: LogoType;
    disabled: boolean;
    tabIdx?: number;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-logo-select': WuiLogoSelect;
    }
}
