import { LitElement } from 'lit';
import type { SizeType } from '../../utils/TypeUtil.js';
export declare class WuiImage extends LitElement {
    static styles: import("lit").CSSResult[];
    src: string;
    alt: string;
    size?: SizeType;
    render(): import("lit").TemplateResult<1>;
    private handleImageError;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-image': WuiImage;
    }
}
