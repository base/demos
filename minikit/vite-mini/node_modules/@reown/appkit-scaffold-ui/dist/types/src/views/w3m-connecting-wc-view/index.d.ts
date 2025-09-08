import { LitElement } from 'lit';
import '../../partials/w3m-connecting-header/index.js';
import '../../partials/w3m-connecting-wc-browser/index.js';
import '../../partials/w3m-connecting-wc-desktop/index.js';
import '../../partials/w3m-connecting-wc-mobile/index.js';
import '../../partials/w3m-connecting-wc-qrcode/index.js';
import '../../partials/w3m-connecting-wc-unsupported/index.js';
import '../../partials/w3m-connecting-wc-web/index.js';
export declare class W3mConnectingWcView extends LitElement {
    private wallet;
    private unsubscribe;
    private platform?;
    private platforms;
    private isSiwxEnabled;
    private remoteFeatures;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private reownBrandingTemplate;
    private initializeConnection;
    private determinePlatforms;
    private platformTemplate;
    private headerTemplate;
    private onSelectPlatform;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-view': W3mConnectingWcView;
    }
}
