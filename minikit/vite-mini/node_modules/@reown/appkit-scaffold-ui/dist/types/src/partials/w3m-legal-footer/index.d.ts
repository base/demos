import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-ux-by-reown';
export declare class W3mLegalFooter extends LitElement {
    static styles: import("lit").CSSResult[];
    private unsubscribe;
    private remoteFeatures;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private andTemplate;
    private termsTemplate;
    private privacyTemplate;
    private reownBrandingTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-legal-footer': W3mLegalFooter;
    }
}
