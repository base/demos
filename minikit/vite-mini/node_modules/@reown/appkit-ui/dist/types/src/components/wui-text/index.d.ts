import { LitElement } from 'lit';
import type { ColorType, LineClamp, TextAlign, TextType } from '../../utils/TypeUtil.js';
export declare class WuiText extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: TextType;
    color: ColorType;
    align?: TextAlign;
    lineClamp?: LineClamp;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-text': WuiText;
    }
}
