import { LitElement } from 'lit';
import type { ColorType, SizeType } from '../../utils/TypeUtil.js';
export declare class WuiLoadingSpinner extends LitElement {
    static styles: import("lit").CSSResult[];
    color: ColorType;
    size: Exclude<SizeType, 'inherit' | 'xs' | 'xxs' | 'mdl'>;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-loading-spinner': WuiLoadingSpinner;
    }
}
