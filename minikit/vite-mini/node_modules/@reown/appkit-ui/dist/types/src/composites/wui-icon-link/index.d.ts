import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import type { ColorType, IconType, SizeType } from '../../utils/TypeUtil.js';
export declare class WuiIconLink extends LitElement {
    static styles: import("lit").CSSResult[];
    size: SizeType;
    disabled: boolean;
    icon: IconType;
    iconColor: ColorType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-icon-link': WuiIconLink;
    }
}
