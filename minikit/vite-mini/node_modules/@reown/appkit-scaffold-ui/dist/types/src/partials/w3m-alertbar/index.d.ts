import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-alertbar';
export declare const presets: {
    readonly info: {
        readonly backgroundColor: "fg-350";
        readonly iconColor: "fg-325";
        readonly icon: "info";
    };
    readonly success: {
        readonly backgroundColor: "success-glass-reown-020";
        readonly iconColor: "success-125";
        readonly icon: "checkmark";
    };
    readonly warning: {
        readonly backgroundColor: "warning-glass-reown-020";
        readonly iconColor: "warning-100";
        readonly icon: "warningCircle";
    };
    readonly error: {
        readonly backgroundColor: "error-glass-reown-020";
        readonly iconColor: "error-125";
        readonly icon: "exclamationTriangle";
    };
};
export declare class W3mAlertBar extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private open;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private onOpen;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-alertbar': W3mAlertBar;
    }
}
