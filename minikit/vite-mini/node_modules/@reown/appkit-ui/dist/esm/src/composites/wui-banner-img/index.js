var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-avatar/index.js';
import styles from './styles.js';
let WuiBannerImg = class WuiBannerImg extends LitElement {
    constructor() {
        super(...arguments);
        this.imageSrc = '';
        this.text = '';
        this.size = '';
    }
    render() {
        return html `
      <wui-flex gap="1xs" alignItems="center">
        <wui-avatar size=${this.size} imageSrc=${this.imageSrc}></wui-avatar>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `;
    }
};
WuiBannerImg.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiBannerImg.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiBannerImg.prototype, "text", void 0);
__decorate([
    property()
], WuiBannerImg.prototype, "size", void 0);
WuiBannerImg = __decorate([
    customElement('wui-banner-img')
], WuiBannerImg);
export { WuiBannerImg };
//# sourceMappingURL=index.js.map