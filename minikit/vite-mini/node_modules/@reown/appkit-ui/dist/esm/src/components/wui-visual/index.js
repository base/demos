var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { bitcoinSvg } from '../../assets/visual/bitcoin.js';
import { browserSvg } from '../../assets/visual/browser.js';
import { coinbaseSvg } from '../../assets/visual/coinbase.js';
import { daoSvg } from '../../assets/visual/dao.js';
import { defiSvg } from '../../assets/visual/defi.js';
import { defiAltSvg } from '../../assets/visual/defiAlt.js';
import { ethSvg } from '../../assets/visual/eth.js';
import { googleSvg } from '../../assets/visual/google.js';
import { layersSvg } from '../../assets/visual/layers.js';
import { lightbulbSvg } from '../../assets/visual/lightbulb.js';
import { lockSvg } from '../../assets/visual/lock.js';
import { loginSvg } from '../../assets/visual/login.js';
import { meldSvg } from '../../assets/visual/meld.js';
import { moonpaySvg } from '../../assets/visual/moonpay.js';
import { networkSvg } from '../../assets/visual/network.js';
import { nftSvg } from '../../assets/visual/nft.js';
import { nounSvg } from '../../assets/visual/noun.js';
import { onrampCardSvg } from '../../assets/visual/onramp-card.js';
import { paypalSvg } from '../../assets/visual/paypal.js';
import { pencilSvg } from '../../assets/visual/pencil.js';
import { profileSvg } from '../../assets/visual/profile.js';
import { solanaSvg } from '../../assets/visual/solana.js';
import { stripeSvg } from '../../assets/visual/stripe.js';
import { systemSvg } from '../../assets/visual/system.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
const svgOptions = {
    browser: browserSvg,
    dao: daoSvg,
    defi: defiSvg,
    defiAlt: defiAltSvg,
    eth: ethSvg,
    layers: layersSvg,
    lock: lockSvg,
    login: loginSvg,
    network: networkSvg,
    nft: nftSvg,
    noun: nounSvg,
    profile: profileSvg,
    system: systemSvg,
    coinbase: coinbaseSvg,
    meld: meldSvg,
    onrampCard: onrampCardSvg,
    moonpay: moonpaySvg,
    stripe: stripeSvg,
    paypal: paypalSvg,
    google: googleSvg,
    pencil: pencilSvg,
    lightbulb: lightbulbSvg,
    solana: solanaSvg,
    bitcoin: bitcoinSvg
};
let WuiVisual = class WuiVisual extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'browser';
        this.size = 'md';
    }
    render() {
        this.style.cssText = `
       --local-size: var(--wui-visual-size-${this.size});
   `;
        return html `${svgOptions[this.name]}`;
    }
};
WuiVisual.styles = [resetStyles, styles];
__decorate([
    property()
], WuiVisual.prototype, "name", void 0);
__decorate([
    property()
], WuiVisual.prototype, "size", void 0);
WuiVisual = __decorate([
    customElement('wui-visual')
], WuiVisual);
export { WuiVisual };
//# sourceMappingURL=index.js.map