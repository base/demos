import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-snackbar';
export declare class W3mSnackBar extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private timeout?;
    private open;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private onOpen;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-snackbar': W3mSnackBar;
    }
}
