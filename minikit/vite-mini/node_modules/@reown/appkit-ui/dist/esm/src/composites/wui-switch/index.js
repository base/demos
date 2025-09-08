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
import { colorStyles, elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiSwitch = class WuiSwitch extends LitElement {
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
          type="checkbox"
          ?checked=${ifDefined(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
    }
    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('switchChange', {
            detail: this.inputElementRef.value?.checked,
            bubbles: true,
            composed: true
        }));
    }
};
WuiSwitch.styles = [resetStyles, elementStyles, colorStyles, styles];
__decorate([
    property({ type: Boolean })
], WuiSwitch.prototype, "checked", void 0);
WuiSwitch = __decorate([
    customElement('wui-switch')
], WuiSwitch);
export { WuiSwitch };
//# sourceMappingURL=index.js.map