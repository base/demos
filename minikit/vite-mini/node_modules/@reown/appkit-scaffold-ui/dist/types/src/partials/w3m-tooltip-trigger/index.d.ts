import { LitElement } from 'lit';
export declare class WuiTooltipTrigger extends LitElement {
    static styles: import("lit").CSSResult[];
    private unsubscribe;
    text: string;
    open: boolean;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private renderChildren;
    private onMouseEnter;
    private onMouseLeave;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-tooltip-trigger': WuiTooltipTrigger;
    }
}
