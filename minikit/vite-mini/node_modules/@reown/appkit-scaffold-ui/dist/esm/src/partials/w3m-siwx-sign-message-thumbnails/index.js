var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { AccountController, OptionsController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-visual-thumbnail';
import styles from './styles.js';
let W3mSIWXSignMessageThumbnails = class W3mSIWXSignMessageThumbnails extends LitElement {
    constructor() {
        super(...arguments);
        this.dappImageUrl = OptionsController.state.metadata?.icons;
        this.walletImageUrl = AccountController.state.connectedWalletInfo?.icon;
    }
    firstUpdated() {
        const visuals = this.shadowRoot?.querySelectorAll('wui-visual-thumbnail');
        if (visuals?.[0]) {
            this.createAnimation(visuals[0], 'translate(18px)');
        }
        if (visuals?.[1]) {
            this.createAnimation(visuals[1], 'translate(-18px)');
        }
    }
    render() {
        return html `
      <wui-visual-thumbnail
        ?borderRadiusFull=${true}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
    }
    createAnimation(element, translation) {
        element.animate([{ transform: 'translateX(0px)' }, { transform: translation }], {
            duration: 1600,
            easing: 'cubic-bezier(0.56, 0, 0.48, 1)',
            direction: 'alternate',
            iterations: Infinity
        });
    }
};
W3mSIWXSignMessageThumbnails.styles = styles;
W3mSIWXSignMessageThumbnails = __decorate([
    customElement('w3m-siwx-sign-message-thumbnails')
], W3mSIWXSignMessageThumbnails);
export { W3mSIWXSignMessageThumbnails };
//# sourceMappingURL=index.js.map