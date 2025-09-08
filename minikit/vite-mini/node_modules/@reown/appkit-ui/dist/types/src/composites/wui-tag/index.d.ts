import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import type { TagType } from '../../utils/TypeUtil.js';
export declare class WuiTag extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: TagType;
    size: 'lg' | 'md';
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-tag': WuiTag;
    }
}
