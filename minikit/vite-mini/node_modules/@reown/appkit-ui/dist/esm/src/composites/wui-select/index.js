var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../composites/wui-icon-box/index.js';
import { colorStyles, elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiSelect = class WuiSelect extends LitElement {
    constructor() {
        super(...arguments);
        this.imageSrc = '';
    }
    render() {
        return html `<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`;
    }
    imageTemplate() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;
        }
        return html `<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`;
    }
};
WuiSelect.styles = [resetStyles, elementStyles, colorStyles, styles];
__decorate([
    property()
], WuiSelect.prototype, "imageSrc", void 0);
WuiSelect = __decorate([
    customElement('wui-select')
], WuiSelect);
export { WuiSelect };
//# sourceMappingURL=index.js.map