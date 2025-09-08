import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import type { IconType } from '../../utils/TypeUtil.js';
export declare class WuiInputElement extends LitElement {
    static styles: import("lit").CSSResult[];
    icon: IconType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-input-element': WuiInputElement;
    }
}
