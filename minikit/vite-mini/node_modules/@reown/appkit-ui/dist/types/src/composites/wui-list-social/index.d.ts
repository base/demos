import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import type { LogoType } from '../../utils/TypeUtil.js';
import '../wui-logo/index.js';
export declare class WuiListSocial extends LitElement {
    static styles: import("lit").CSSResult[];
    logo: LogoType;
    name: string;
    align: 'left' | 'center';
    tabIdx?: boolean;
    disabled: boolean;
    render(): import("lit").TemplateResult<1>;
    private templatePlacement;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-social': WuiListSocial;
    }
}
