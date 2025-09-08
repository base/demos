import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import type { BackgroundType, ColorType, IconBoxBorderType, IconType, SizeType } from '../../utils/TypeUtil.js';
export declare class WuiIconBox extends LitElement {
    static styles: import("lit").CSSResult[];
    size: SizeType;
    backgroundColor: ColorType;
    iconColor: ColorType;
    iconSize?: Exclude<SizeType, 'inherit'>;
    background: BackgroundType;
    border?: boolean | undefined;
    borderColor?: IconBoxBorderType;
    icon: IconType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-icon-box': WuiIconBox;
    }
}
