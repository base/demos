import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import type { ColorType, IconType } from '../../utils/TypeUtil.js';
import '../wui-icon-box/index.js';
export declare class WuiSnackbar extends LitElement {
    static styles: import("lit").CSSResult[];
    backgroundColor: ColorType;
    iconColor: ColorType;
    icon: IconType;
    message: string;
    loading: boolean;
    iconType: 'default' | 'box';
    render(): import("lit").TemplateResult<1>;
    private templateIcon;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-snackbar': WuiSnackbar;
    }
}
