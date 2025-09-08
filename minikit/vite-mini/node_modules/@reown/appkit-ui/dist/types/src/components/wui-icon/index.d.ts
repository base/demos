import type { TemplateResult } from 'lit';
import { LitElement } from 'lit';
import type { ColorType, IconType, SizeType } from '../../utils/TypeUtil.js';
export declare class WuiIcon extends LitElement {
    static styles: import("lit").CSSResult[];
    size: SizeType;
    name: IconType;
    color: ColorType;
    aspectRatio: string;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-icon': WuiIcon;
    }
}
