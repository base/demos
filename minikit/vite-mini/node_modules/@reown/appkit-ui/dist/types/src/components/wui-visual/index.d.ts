import type { TemplateResult } from 'lit';
import { LitElement } from 'lit';
import type { VisualSize, VisualType } from '../../utils/TypeUtil.js';
export declare class WuiVisual extends LitElement {
    static styles: import("lit").CSSResult[];
    name: VisualType;
    size: VisualSize;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-visual': WuiVisual;
    }
}
