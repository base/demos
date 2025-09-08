var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-text/index.js';
import '../../composites/wui-chip-button/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiCtaButton = class WuiCtaButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.label = '';
        this.buttonLabel = '';
    }
    render() {
        return html `
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${['1xs', '2l', '1xs', '2l']}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `;
    }
};
WuiCtaButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Boolean })
], WuiCtaButton.prototype, "disabled", void 0);
__decorate([
    property()
], WuiCtaButton.prototype, "label", void 0);
__decorate([
    property()
], WuiCtaButton.prototype, "buttonLabel", void 0);
WuiCtaButton = __decorate([
    customElement('wui-cta-button')
], WuiCtaButton);
export { WuiCtaButton };
//# sourceMappingURL=index.js.map