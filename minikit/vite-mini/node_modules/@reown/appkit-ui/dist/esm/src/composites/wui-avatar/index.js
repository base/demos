var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-image/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiAvatar = class WuiAvatar extends LitElement {
    constructor() {
        super(...arguments);
        this.imageSrc = undefined;
        this.alt = undefined;
        this.address = undefined;
        this.size = 'xl';
    }
    render() {
        this.style.cssText = `
    --local-width: var(--wui-icon-box-size-${this.size});
    --local-height: var(--wui-icon-box-size-${this.size});
    `;
        return html `${this.visualTemplate()}`;
    }
    visualTemplate() {
        if (this.imageSrc) {
            this.dataset['variant'] = 'image';
            return html `<wui-image src=${this.imageSrc} alt=${this.alt ?? 'avatar'}></wui-image>`;
        }
        else if (this.address) {
            this.dataset['variant'] = 'generated';
            const cssColors = UiHelperUtil.generateAvatarColors(this.address);
            this.style.cssText += `\n ${cssColors}`;
            return null;
        }
        this.dataset['variant'] = 'default';
        return null;
    }
};
WuiAvatar.styles = [resetStyles, styles];
__decorate([
    property()
], WuiAvatar.prototype, "imageSrc", void 0);
__decorate([
    property()
], WuiAvatar.prototype, "alt", void 0);
__decorate([
    property()
], WuiAvatar.prototype, "address", void 0);
__decorate([
    property()
], WuiAvatar.prototype, "size", void 0);
WuiAvatar = __decorate([
    customElement('wui-avatar')
], WuiAvatar);
export { WuiAvatar };
//# sourceMappingURL=index.js.map