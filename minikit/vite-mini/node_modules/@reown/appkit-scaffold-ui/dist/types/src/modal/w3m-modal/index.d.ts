import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-card';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-alertbar/index.js';
import '../../partials/w3m-header/index.js';
import '../../partials/w3m-snackbar/index.js';
import '../../partials/w3m-tooltip/index.js';
import '../w3m-router/index.js';
export declare class W3mModalBase extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private abortController?;
    private hasPrefetched;
    private enableEmbedded;
    private open;
    private caipAddress;
    private caipNetwork;
    private shake;
    private filterByNamespace;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private contentTemplate;
    private onOverlayClick;
    private handleClose;
    private initializeTheming;
    private onClose;
    private onOpen;
    private onScrollLock;
    private onScrollUnlock;
    private onAddKeyboardListener;
    private onRemoveKeyboardListener;
    private onNewAddress;
    private onNewNetwork;
    private prefetch;
}
export declare class W3mModal extends W3mModalBase {
}
export declare class AppKitModal extends W3mModalBase {
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-modal': W3mModal;
        'appkit-modal': AppKitModal;
    }
}
