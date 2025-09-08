import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import type { ColorType, IconType } from '../../utils/TypeUtil.js';
export declare class WuiAlertBar extends LitElement {
    static styles: import("lit").CSSResult[];
    message: string;
    backgroundColor: ColorType;
    iconColor: ColorType;
    icon: IconType;
    render(): import("lit").TemplateResult<1>;
    private onClose;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-alertbar': WuiAlertBar;
    }
}
