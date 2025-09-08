import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-ens-input';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-tag';
import '@reown/appkit-ui/wui-text';
export declare class W3mRegisterAccountNameView extends LitElement {
    static styles: import("lit").CSSResult;
    private formRef;
    private usubscribe;
    errorMessage?: string;
    private name;
    private error;
    private loading;
    private suggestions;
    private registered;
    private profileName;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private submitButtonTemplate;
    private onDebouncedNameInputChange;
    private onSelectSuggestion;
    private onNameInputChange;
    private nameSuggestionTagTemplate;
    private templateSuggestions;
    private availableNameTemplate;
    private isAllowedToSubmit;
    private onSubmitName;
    private onEnterKey;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-register-account-name-view': W3mRegisterAccountNameView;
    }
}
