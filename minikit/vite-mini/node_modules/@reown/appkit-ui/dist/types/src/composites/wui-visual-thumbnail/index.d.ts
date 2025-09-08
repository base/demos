import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
export declare class WuiVisualThumbnail extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc?: string | null;
    alt?: string;
    borderRadiusFull?: boolean;
    render(): import("lit").TemplateResult<1>;
    private templateVisual;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-visual-thumbnail': WuiVisualThumbnail;
    }
}
