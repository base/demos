var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { CoreHelperUtil, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-item';
import '@reown/appkit-ui/wui-text';
let W3mDownloadsView = class W3mDownloadsView extends LitElement {
    constructor() {
        super(...arguments);
        this.wallet = RouterController.state.data?.wallet;
    }
    render() {
        if (!this.wallet) {
            throw new Error('w3m-downloads-view');
        }
        return html `
      <wui-flex gap="xs" flexDirection="column" .padding=${['s', 's', 'l', 's']}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
    }
    chromeTemplate() {
        if (!this.wallet?.chrome_store) {
            return null;
        }
        return html `<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`;
    }
    iosTemplate() {
        if (!this.wallet?.app_store) {
            return null;
        }
        return html `<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`;
    }
    androidTemplate() {
        if (!this.wallet?.play_store) {
            return null;
        }
        return html `<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`;
    }
    homepageTemplate() {
        if (!this.wallet?.homepage) {
            return null;
        }
        return html `
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `;
    }
    onChromeStore() {
        if (this.wallet?.chrome_store) {
            CoreHelperUtil.openHref(this.wallet.chrome_store, '_blank');
        }
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
W3mDownloadsView = __decorate([
    customElement('w3m-downloads-view')
], W3mDownloadsView);
export { W3mDownloadsView };
//# sourceMappingURL=index.js.map