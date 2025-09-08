import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import type { LogoType } from '../../utils/TypeUtil.js';
export declare class WuiLogo extends LitElement {
    static styles: import("lit").CSSResult[];
    logo: LogoType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-logo': WuiLogo;
    }
}
