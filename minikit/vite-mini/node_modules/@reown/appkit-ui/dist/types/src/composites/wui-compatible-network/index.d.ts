import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiCompatibleNetwork extends LitElement {
    static styles: import("lit").CSSResult[];
    networkImages: string[];
    text: string;
    render(): import("lit").TemplateResult<1>;
    private networksTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-compatible-network': WuiCompatibleNetwork;
    }
}
