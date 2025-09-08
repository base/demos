var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { NumberUtil } from '@reown/appkit-common';
import { ChainController, ConstantsUtil, SwapController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
import '../w3m-tooltip-trigger/index.js';
import '../w3m-tooltip/index.js';
import styles from './styles.js';
const slippageRate = ConstantsUtil.CONVERT_SLIPPAGE_TOLERANCE;
let WuiSwapDetails = class WuiSwapDetails extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.networkName = ChainController.state.activeCaipNetwork?.name;
        this.detailsOpen = false;
        this.sourceToken = SwapController.state.sourceToken;
        this.toToken = SwapController.state.toToken;
        this.toTokenAmount = SwapController.state.toTokenAmount;
        this.sourceTokenPriceInUSD = SwapController.state.sourceTokenPriceInUSD;
        this.toTokenPriceInUSD = SwapController.state.toTokenPriceInUSD;
        this.priceImpact = SwapController.state.priceImpact;
        this.maxSlippage = SwapController.state.maxSlippage;
        this.networkTokenSymbol = SwapController.state.networkTokenSymbol;
        this.inputError = SwapController.state.inputError;
        this.unsubscribe.push(...[
            SwapController.subscribe(newState => {
                this.sourceToken = newState.sourceToken;
                this.toToken = newState.toToken;
                this.toTokenAmount = newState.toTokenAmount;
                this.priceImpact = newState.priceImpact;
                this.maxSlippage = newState.maxSlippage;
                this.sourceTokenPriceInUSD = newState.sourceTokenPriceInUSD;
                this.toTokenPriceInUSD = newState.toTokenPriceInUSD;
                this.inputError = newState.inputError;
            })
        ]);
    }
    render() {
        const minReceivedAmount = this.toTokenAmount && this.maxSlippage
            ? NumberUtil.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString()
            : null;
        if (!this.sourceToken || !this.toToken || this.inputError) {
            return null;
        }
        const toTokenSwappedAmount = this.sourceTokenPriceInUSD && this.toTokenPriceInUSD
            ? (1 / this.toTokenPriceInUSD) * this.sourceTokenPriceInUSD
            : 0;
        return html `
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${['0', 'xs', '0', 'xs']}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${UiHelperUtil.formatNumberToLocalString(toTokenSwappedAmount, 3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${UiHelperUtil.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen
            ? html `
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact
                ? html ` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${UiHelperUtil.formatNumberToLocalString(this.priceImpact, 3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`
                : null}
                  ${this.maxSlippage && this.sourceToken.symbol
                ? html `<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${minReceivedAmount
                    ? `Transaction will be reversed if you receive less than ${UiHelperUtil.formatNumberToLocalString(minReceivedAmount, 6)} ${this.toToken.symbol} due to price changes.`
                    : ''}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${UiHelperUtil.formatNumberToLocalString(this.maxSlippage, 6)}
                              ${this.toToken.symbol} ${slippageRate}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`
                : null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `
            : null}
        </wui-flex>
      </wui-flex>
    `;
    }
    toggleDetails() {
        this.detailsOpen = !this.detailsOpen;
    }
};
WuiSwapDetails.styles = [styles];
__decorate([
    state()
], WuiSwapDetails.prototype, "networkName", void 0);
__decorate([
    property()
], WuiSwapDetails.prototype, "detailsOpen", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "sourceToken", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "toToken", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "toTokenAmount", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "sourceTokenPriceInUSD", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "toTokenPriceInUSD", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "priceImpact", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "maxSlippage", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "networkTokenSymbol", void 0);
__decorate([
    state()
], WuiSwapDetails.prototype, "inputError", void 0);
WuiSwapDetails = __decorate([
    customElement('w3m-swap-details')
], WuiSwapDetails);
export { WuiSwapDetails };
//# sourceMappingURL=index.js.map