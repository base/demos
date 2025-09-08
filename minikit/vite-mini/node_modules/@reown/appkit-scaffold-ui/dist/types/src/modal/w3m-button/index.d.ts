import { LitElement } from 'lit';
import type { ChainNamespace } from '@reown/appkit-common';
import type { W3mAccountButton } from '../w3m-account-button/index.js';
import type { W3mConnectButton } from '../w3m-connect-button/index.js';
declare class W3mButtonBase extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    disabled?: W3mAccountButton['disabled'];
    balance?: W3mAccountButton['balance'];
    size?: W3mConnectButton['size'];
    label?: W3mConnectButton['label'];
    loadingLabel?: W3mConnectButton['loadingLabel'];
    charsStart?: W3mAccountButton['charsStart'];
    charsEnd?: W3mAccountButton['charsEnd'];
    namespace?: ChainNamespace;
    private caipAddress;
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
export declare class W3mButton extends W3mButtonBase {
}
export declare class AppKitButton extends W3mButtonBase {
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-button': W3mButton;
        'appkit-button': AppKitButton;
    }
}
export {};
