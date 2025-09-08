var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-network-image/index.js';
import '../wui-wallet-image/index.js';
import styles from './styles.js';
let WuiCardSelect = class WuiCardSelect extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Unknown';
        this.type = 'wallet';
        this.imageSrc = undefined;
        this.disabled = false;
        this.selected = false;
        this.installed = false;
    }
    render() {
        return html `
      <button data-selected=${ifDefined(this.selected)} ?disabled=${this.disabled}>
        ${this.imageTemplate()}
        <wui-text variant="tiny-500" color=${this.selected ? 'accent-100' : 'inherit'}>
          ${this.name}
        </wui-text>
      </button>
    `;
    }
    imageTemplate() {
        if (this.type === 'network') {
            return html `
        <wui-network-image
          .selected=${this.selected}
          imageSrc=${ifDefined(this.imageSrc)}
          name=${this.name}
        >
        </wui-network-image>
      `;
        }
        return html `
      <wui-wallet-image
        size="md"
        imageSrc=${ifDefined(this.imageSrc)}
        name=${this.name}
        .installed=${this.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
    }
};
WuiCardSelect.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiCardSelect.prototype, "name", void 0);
__decorate([
    property()
], WuiCardSelect.prototype, "type", void 0);
__decorate([
    property()
], WuiCardSelect.prototype, "imageSrc", void 0);
__decorate([
    property({ type: Boolean })
], WuiCardSelect.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WuiCardSelect.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], WuiCardSelect.prototype, "installed", void 0);
WuiCardSelect = __decorate([
    customElement('wui-card-select')
], WuiCardSelect);
export { WuiCardSelect };
//# sourceMappingURL=index.js.map