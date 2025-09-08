import { LitElement } from 'lit';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import type { SizeType } from '../../utils/TypeUtil.js';
export declare class WuiConnectButton extends LitElement {
    static styles: import("lit").CSSResult[];
    size: Exclude<SizeType, 'inherit' | 'xl' | 'lg' | 'xs' | 'xxs'>;
    loading: boolean;
    render(): import("lit").TemplateResult<1>;
    loadingTemplate(): import("lit").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-connect-button': WuiConnectButton;
    }
}
