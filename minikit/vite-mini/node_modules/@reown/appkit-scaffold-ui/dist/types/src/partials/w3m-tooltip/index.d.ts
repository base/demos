import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
export declare class W3mTooltip extends LitElement {
    static styles: import("lit").CSSResult[];
    private unsubscribe;
    private open;
    private message;
    private triggerRect;
    private variant;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-tooltip': W3mTooltip;
    }
}
