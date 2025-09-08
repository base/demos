var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-icon-box/index.js';
import styles from './styles.js';
let WuiListItem = class WuiListItem extends LitElement {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.variant = 'icon';
        this.disabled = false;
        this.imageSrc = undefined;
        this.alt = undefined;
        this.chevron = false;
        this.loading = false;
    }
    render() {
        return html `
      <button
        ?disabled=${this.loading ? true : Boolean(this.disabled)}
        data-loading=${this.loading}
        data-iconvariant=${ifDefined(this.iconVariant)}
        tabindex=${ifDefined(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `;
    }
    visualTemplate() {
        if (this.variant === 'image' && this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.alt ?? 'list item'}></wui-image>`;
        }
        if (this.iconVariant === 'square' && this.icon && this.variant === 'icon') {
            return html `<wui-icon name=${this.icon}></wui-icon>`;
        }
        if (this.variant === 'icon' && this.icon && this.iconVariant) {
            const color = ['blue', 'square-blue'].includes(this.iconVariant) ? 'accent-100' : 'fg-200';
            const size = this.iconVariant === 'square-blue' ? 'mdl' : 'md';
            const iconSize = this.iconSize ? this.iconSize : size;
            return html `
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${iconSize}
          background="transparent"
          iconColor=${color}
          backgroundColor=${color}
          size=${size}
        ></wui-icon-box>
      `;
        }
        return null;
    }
    loadingTemplate() {
        if (this.loading) {
            return html `<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`;
        }
        return html ``;
    }
    chevronTemplate() {
        if (this.chevron) {
            return html `<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`;
        }
        return null;
    }
};
WuiListItem.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListItem.prototype, "icon", void 0);
__decorate([
    property()
], WuiListItem.prototype, "iconSize", void 0);
__decorate([
    property()
], WuiListItem.prototype, "tabIdx", void 0);
__decorate([
    property()
], WuiListItem.prototype, "variant", void 0);
__decorate([
    property()
], WuiListItem.prototype, "iconVariant", void 0);
__decorate([
    property({ type: Boolean })
], WuiListItem.prototype, "disabled", void 0);
__decorate([
    property()
], WuiListItem.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiListItem.prototype, "alt", void 0);
__decorate([
    property({ type: Boolean })
], WuiListItem.prototype, "chevron", void 0);
__decorate([
    property({ type: Boolean })
], WuiListItem.prototype, "loading", void 0);
WuiListItem = __decorate([
    customElement('wui-list-item')
], WuiListItem);
export { WuiListItem };
//# sourceMappingURL=index.js.map