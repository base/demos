import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import type { AccountEntryType, IconType, SizeType } from '../../utils/TypeUtil.js';
import '../wui-icon-box/index.js';
export declare class WuiListItem extends LitElement {
    static styles: import("lit").CSSResult[];
    icon?: IconType;
    iconSize?: SizeType;
    tabIdx?: number;
    variant: AccountEntryType;
    iconVariant?: 'blue' | 'overlay' | 'square' | 'square-blue';
    disabled: boolean;
    imageSrc?: string;
    alt?: string;
    chevron: boolean;
    loading: boolean;
    render(): import("lit").TemplateResult<1>;
    visualTemplate(): import("lit").TemplateResult<1> | null;
    loadingTemplate(): import("lit").TemplateResult<1>;
    chevronTemplate(): import("lit").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-item': WuiListItem;
    }
}
