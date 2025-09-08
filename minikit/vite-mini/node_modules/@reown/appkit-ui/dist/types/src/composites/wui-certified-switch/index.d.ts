import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../wui-switch/index.js';
export declare class WuiCertifiedSwitch extends LitElement {
    static styles: import("lit").CSSResult[];
    checked?: boolean;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-certified-switch': WuiCertifiedSwitch;
    }
}
