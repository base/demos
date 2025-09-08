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
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiListContent = class WuiListContent extends LitElement {
    constructor() {
        super(...arguments);
        this.imageSrc = undefined;
        this.textTitle = '';
        this.textValue = undefined;
    }
    render() {
        return html `
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue ? 'fg-200' : 'fg-100'}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `;
    }
    templateContent() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`;
        }
        else if (this.textValue) {
            return html ` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>`;
        }
        return html `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiListContent.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListContent.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiListContent.prototype, "textTitle", void 0);
__decorate([
    property()
], WuiListContent.prototype, "textValue", void 0);
WuiListContent = __decorate([
    customElement('wui-list-content')
], WuiListContent);
export { WuiListContent };
//# sourceMappingURL=index.js.map