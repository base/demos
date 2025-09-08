import { LitElement } from 'lit';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import '../wui-input-text/index.js';
export declare class WuiEnsInput extends LitElement {
    static styles: import("lit").CSSResult[];
    errorMessage?: string;
    disabled: boolean;
    value?: string;
    loading: boolean;
    render(): import("lit").TemplateResult<1>;
    private baseNameTemplate;
    private loadingTemplate;
    private errorTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-ens-input': WuiEnsInput;
    }
}
