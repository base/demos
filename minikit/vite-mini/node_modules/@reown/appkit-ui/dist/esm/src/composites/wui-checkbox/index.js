var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import '../../components/wui-icon/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiCheckBox = class WuiCheckBox extends LitElement {
    constructor() {
        super(...arguments);
        this.inputElementRef = createRef();
        this.checked = undefined;
    }
    render() {
        return html `
      <label>
        <input
          ${ref(this.inputElementRef)}
          ?checked=${ifDefined(this.checked)}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" color="inverse-100" size="xxs"></wui-icon>
        </span>
        <slot></slot>
      </label>
    `;
    }
    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('checkboxChange', {
            detail: this.inputElementRef.value?.checked,
            bubbles: true,
            composed: true
        }));
    }
};
WuiCheckBox.styles = [resetStyles, styles];
__decorate([
    property({ type: Boolean })
], WuiCheckBox.prototype, "checked", void 0);
WuiCheckBox = __decorate([
    customElement('wui-checkbox')
], WuiCheckBox);
export { WuiCheckBox };
//# sourceMappingURL=index.js.map