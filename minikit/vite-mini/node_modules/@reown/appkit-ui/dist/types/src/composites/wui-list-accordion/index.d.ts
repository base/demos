import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiListAccordion extends LitElement {
    static styles: import("lit").CSSResult[];
    textTitle: string;
    overflowedContent: string;
    toggled: boolean;
    enableAccordion: boolean;
    scrollElement?: Element;
    scrollHeightElement: number;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private checkHeight;
    render(): import("lit").TemplateResult<1>;
    private onClick;
    chevronTemplate(): import("lit").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-accordion': WuiListAccordion;
    }
}
