var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { CoreHelperUtil, RouterController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-cta-button';
import styles from './styles.js';
let W3mMobileDownloadLinks = class W3mMobileDownloadLinks extends LitElement {
    constructor() {
        super(...arguments);
        this.wallet = undefined;
    }
    render() {
        if (!this.wallet) {
            this.style.display = 'none';
            return null;
        }
        const { name, app_store, play_store, chrome_store, homepage } = this.wallet;
        const isMobile = CoreHelperUtil.isMobile();
        const isIos = CoreHelperUtil.isIos();
        const isAndroid = CoreHelperUtil.isAndroid();
        const isMultiple = [app_store, play_store, homepage, chrome_store].filter(Boolean).length > 1;
        const shortName = UiHelperUtil.getTruncateString({
            string: name,
            charsStart: 12,
            charsEnd: 0,
            truncate: 'end'
        });
        if (isMultiple && !isMobile) {
            return html `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${() => RouterController.push('Downloads', { wallet: this.wallet })}
        ></wui-cta-button>
      `;
        }
        if (!isMultiple && homepage) {
            return html `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `;
        }
        if (app_store && isIos) {
            return html `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `;
        }
        if (play_store && isAndroid) {
            return html `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `;
        }
        this.style.display = 'none';
        return null;
    }
    onAppStore() {
        if (this.wallet?.app_store) {
            CoreHelperUtil.openHref(this.wallet.app_store, '_blank');
        }
    }
    onPlayStore() {
        if (this.wallet?.play_store) {
            CoreHelperUtil.openHref(this.wallet.play_store, '_blank');
        }
    }
    onHomePage() {
        if (this.wallet?.homepage) {
            CoreHelperUtil.openHref(this.wallet.homepage, '_blank');
        }
    }
};
W3mMobileDownloadLinks.styles = [styles];
__decorate([
    property({ type: Object })
], W3mMobileDownloadLinks.prototype, "wallet", void 0);
W3mMobileDownloadLinks = __decorate([
    customElement('w3m-mobile-download-links')
], W3mMobileDownloadLinks);
export { W3mMobileDownloadLinks };
//# sourceMappingURL=index.js.map