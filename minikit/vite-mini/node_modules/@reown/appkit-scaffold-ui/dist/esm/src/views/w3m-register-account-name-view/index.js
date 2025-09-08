var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { AccountController, ChainController, CoreHelperUtil, EnsController, EventsController, SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-ens-input';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-icon-link';
import '@reown/appkit-ui/wui-loading-spinner';
import '@reown/appkit-ui/wui-tag';
import '@reown/appkit-ui/wui-text';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import styles from './styles.js';
let W3mRegisterAccountNameView = class W3mRegisterAccountNameView extends LitElement {
    constructor() {
        super();
        this.formRef = createRef();
        this.usubscribe = [];
        this.name = '';
        this.error = '';
        this.loading = EnsController.state.loading;
        this.suggestions = EnsController.state.suggestions;
        this.registered = false;
        this.profileName = AccountController.state.profileName;
        this.onDebouncedNameInputChange = CoreHelperUtil.debounce((value) => {
            if (EnsController.validateName(value)) {
                this.error = '';
                this.name = value;
                EnsController.getSuggestions(value);
                EnsController.isNameRegistered(value).then(registered => {
                    this.registered = registered;
                });
            }
            else if (value.length < 4) {
                this.error = 'Name must be at least 4 characters long';
            }
            else {
                this.error = 'Can only contain letters, numbers and - characters';
            }
        });
        this.usubscribe.push(...[
            EnsController.subscribe(val => {
                this.suggestions = val.suggestions;
                this.loading = val.loading;
            }),
            AccountController.subscribeKey('profileName', val => {
                this.profileName = val;
                if (val) {
                    this.error = 'You already own a name';
                }
            })
        ]);
    }
    firstUpdated() {
        this.formRef.value?.addEventListener('keydown', this.onEnterKey.bind(this));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.usubscribe.forEach(unsub => unsub());
        this.formRef.value?.removeEventListener('keydown', this.onEnterKey.bind(this));
    }
    render() {
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${['0', 's', 'm', 's']}
      >
        <form ${ref(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `;
    }
    submitButtonTemplate() {
        const showSubmit = this.isAllowedToSubmit();
        return showSubmit
            ? html `
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitName.bind(this)}
          >
          </wui-icon-link>
        `
            : null;
    }
    onSelectSuggestion(name) {
        return () => {
            this.name = name;
            this.registered = false;
            this.requestUpdate();
        };
    }
    onNameInputChange(event) {
        this.onDebouncedNameInputChange(event.detail);
    }
    nameSuggestionTagTemplate() {
        if (this.loading) {
            return html `<wui-loading-spinner size="lg" color="fg-100"></wui-loading-spinner>`;
        }
        return this.registered
            ? html `<wui-tag variant="shade" size="lg">Registered</wui-tag>`
            : html `<wui-tag variant="success" size="lg">Available</wui-tag>`;
    }
    templateSuggestions() {
        if (!this.name || this.name.length < 4 || this.error) {
            return null;
        }
        const suggestions = this.registered ? this.suggestions.filter(s => s.name !== this.name) : [];
        return html `<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      <wui-flex
        data-testid="account-name-suggestion"
        .padding=${['m', 'm', 'm', 'm']}
        justifyContent="space-between"
        class="suggestion"
        @click=${this.onSubmitName.bind(this)}
      >
        <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
          ${this.name}</wui-text
        >${this.nameSuggestionTagTemplate()}
      </wui-flex>
      ${suggestions.map(suggestion => this.availableNameTemplate(suggestion.name))}
    </wui-flex>`;
    }
    availableNameTemplate(suggestion) {
        return html ` <wui-flex
      data-testid="account-name-suggestion"
      .padding=${['m', 'm', 'm', 'm']}
      justifyContent="space-between"
      class="suggestion"
      @click=${this.onSelectSuggestion(suggestion)}
    >
      <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
        ${suggestion}
      </wui-text>
      <wui-tag variant="success" size="lg">Available</wui-tag>
    </wui-flex>`;
    }
    isAllowedToSubmit() {
        return (!this.loading &&
            !this.registered &&
            !this.error &&
            !this.profileName &&
            EnsController.validateName(this.name));
    }
    async onSubmitName() {
        const activeChainNamespace = ChainController.state.activeChain;
        try {
            if (!this.isAllowedToSubmit()) {
                return;
            }
            const ensName = `${this.name}${ConstantsUtil.WC_NAME_SUFFIX}`;
            EventsController.sendEvent({
                type: 'track',
                event: 'REGISTER_NAME_INITIATED',
                properties: {
                    isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
                    ensName
                }
            });
            await EnsController.registerName(ensName);
            EventsController.sendEvent({
                type: 'track',
                event: 'REGISTER_NAME_SUCCESS',
                properties: {
                    isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
                    ensName
                }
            });
        }
        catch (error) {
            SnackController.showError(error.message);
            EventsController.sendEvent({
                type: 'track',
                event: 'REGISTER_NAME_ERROR',
                properties: {
                    isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
                    ensName: `${this.name}${ConstantsUtil.WC_NAME_SUFFIX}`,
                    error: error?.message || 'Unknown error'
                }
            });
        }
    }
    onEnterKey(event) {
        if (event.key === 'Enter' && this.isAllowedToSubmit()) {
            this.onSubmitName();
        }
    }
};
W3mRegisterAccountNameView.styles = styles;
__decorate([
    property()
], W3mRegisterAccountNameView.prototype, "errorMessage", void 0);
__decorate([
    state()
], W3mRegisterAccountNameView.prototype, "name", void 0);
__decorate([
    state()
], W3mRegisterAccountNameView.prototype, "error", void 0);
__decorate([
    state()
], W3mRegisterAccountNameView.prototype, "loading", void 0);
__decorate([
    state()
], W3mRegisterAccountNameView.prototype, "suggestions", void 0);
__decorate([
    state()
], W3mRegisterAccountNameView.prototype, "registered", void 0);
__decorate([
    state()
], W3mRegisterAccountNameView.prototype, "profileName", void 0);
W3mRegisterAccountNameView = __decorate([
    customElement('w3m-register-account-name-view')
], W3mRegisterAccountNameView);
export { W3mRegisterAccountNameView };
//# sourceMappingURL=index.js.map