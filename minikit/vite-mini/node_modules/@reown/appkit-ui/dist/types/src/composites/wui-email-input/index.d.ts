import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../wui-input-text/index.js';
export declare class WuiEmailInput extends LitElement {
    static styles: import("lit").CSSResult[];
    errorMessage?: string;
    disabled: boolean;
    value?: string;
    tabIdx?: number;
    render(): import("lit").TemplateResult<1>;
    private templateError;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-email-input': WuiEmailInput;
    }
}
