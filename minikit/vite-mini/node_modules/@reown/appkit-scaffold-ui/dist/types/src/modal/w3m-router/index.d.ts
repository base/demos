import { LitElement } from 'lit';
export declare class W3mRouter extends LitElement {
    static styles: import("lit").CSSResult;
    private resizeObserver?;
    private prevHeight;
    private prevHistoryLength;
    private unsubscribe;
    private view;
    private viewDirection;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private viewTemplate;
    private onViewChange;
    private getWrapper;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-router': W3mRouter;
    }
}
