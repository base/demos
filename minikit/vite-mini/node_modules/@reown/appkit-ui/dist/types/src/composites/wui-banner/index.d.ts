import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import type { IconType } from '../../utils/TypeUtil.js';
import '../wui-icon-box/index.js';
export declare class WuiBanner extends LitElement {
    static styles: import("lit").CSSResult[];
    icon: IconType;
    text: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-banner': WuiBanner;
    }
}
