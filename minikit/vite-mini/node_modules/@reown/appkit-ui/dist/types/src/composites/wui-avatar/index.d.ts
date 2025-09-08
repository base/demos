import { LitElement } from 'lit';
import '../../components/wui-image/index.js';
import type { SizeType } from '../../utils/TypeUtil.js';
export declare class WuiAvatar extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc?: string;
    alt?: string;
    address?: string;
    size?: SizeType;
    render(): import("lit").TemplateResult<1>;
    visualTemplate(): import("lit").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-avatar': WuiAvatar;
    }
}
