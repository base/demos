import { LitElement } from 'lit';
import type { BorderRadiusType } from '../../utils/TypeUtil.js';
type Variant = 'default' | 'light';
export declare class WuiShimmer extends LitElement {
    static styles: import("lit").CSSResult[];
    width: string;
    height: string;
    borderRadius: BorderRadiusType;
    variant: Variant;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-shimmer': WuiShimmer;
    }
}
export {};
