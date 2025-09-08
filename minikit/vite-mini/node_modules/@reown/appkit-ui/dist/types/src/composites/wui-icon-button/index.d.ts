import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import type { IconType } from '../../utils/TypeUtil.js';
export declare class WuiIconButton extends LitElement {
    static styles: import("lit").CSSResult[];
    text: string;
    icon: IconType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-icon-button': WuiIconButton;
    }
}
