var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { OptionsController, OptionsStateController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-checkbox';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mLegalCheckbox = class W3mLegalCheckbox extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.checked = OptionsStateController.state.isLegalCheckboxChecked;
        this.unsubscribe.push(OptionsStateController.subscribeKey('isLegalCheckboxChecked', val => {
            this.checked = val;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
        const legalCheckbox = OptionsController.state.features?.legalCheckbox;
        if (!termsConditionsUrl && !privacyPolicyUrl) {
            return null;
        }
        if (!legalCheckbox) {
            return null;
        }
        return html `
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="fg-250" variant="small-400" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `;
    }
    andTemplate() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
        return termsConditionsUrl && privacyPolicyUrl ? 'and' : '';
    }
    termsTemplate() {
        const { termsConditionsUrl } = OptionsController.state;
        if (!termsConditionsUrl) {
            return null;
        }
        return html `<a rel="noreferrer" target="_blank" href=${termsConditionsUrl}>terms of service</a>`;
    }
    privacyTemplate() {
        const { privacyPolicyUrl } = OptionsController.state;
        if (!privacyPolicyUrl) {
            return null;
        }
        return html `<a rel="noreferrer" target="_blank" href=${privacyPolicyUrl}>privacy policy</a>`;
    }
    onCheckboxChange() {
        OptionsStateController.setIsLegalCheckboxChecked(!this.checked);
    }
};
W3mLegalCheckbox.styles = [styles];
__decorate([
    state()
], W3mLegalCheckbox.prototype, "checked", void 0);
W3mLegalCheckbox = __decorate([
    customElement('w3m-legal-checkbox')
], W3mLegalCheckbox);
export { W3mLegalCheckbox };
//# sourceMappingURL=index.js.map