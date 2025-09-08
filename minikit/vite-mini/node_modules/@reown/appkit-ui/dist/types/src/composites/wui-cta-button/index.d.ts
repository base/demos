import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../composites/wui-chip-button/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiCtaButton extends LitElement {
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    label: string;
    buttonLabel: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-cta-button': WuiCtaButton;
    }
}
