import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-checkbox';
import '@reown/appkit-ui/wui-text';
export declare class W3mLegalCheckbox extends LitElement {
    static styles: import("lit").CSSResult[];
    private unsubscribe;
    private checked;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private andTemplate;
    private termsTemplate;
    private privacyTemplate;
    private onCheckboxChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-legal-checkbox': W3mLegalCheckbox;
    }
}
