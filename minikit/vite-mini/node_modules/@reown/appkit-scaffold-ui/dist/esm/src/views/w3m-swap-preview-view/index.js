var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { AccountController, ChainController, RouterController, SwapController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-token-button';
import '../../partials/w3m-swap-details/index.js';
import styles from './styles.js';
let W3mSwapPreviewView = class W3mSwapPreviewView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.detailsOpen = true;
        this.approvalTransaction = SwapController.state.approvalTransaction;
        this.swapTransaction = SwapController.state.swapTransaction;
        this.sourceToken = SwapController.state.sourceToken;
        this.sourceTokenAmount = SwapController.state.sourceTokenAmount ?? '';
        this.sourceTokenPriceInUSD = SwapController.state.sourceTokenPriceInUSD;
        this.toToken = SwapController.state.toToken;
        this.toTokenAmount = SwapController.state.toTokenAmount ?? '';
        this.toTokenPriceInUSD = SwapController.state.toTokenPriceInUSD;
        this.caipNetwork = ChainController.state.activeCaipNetwork;
        this.balanceSymbol = AccountController.state.balanceSymbol;
        this.inputError = SwapController.state.inputError;
        this.loadingQuote = SwapController.state.loadingQuote;
        this.loadingApprovalTransaction = SwapController.state.loadingApprovalTransaction;
        this.loadingBuildTransaction = SwapController.state.loadingBuildTransaction;
        this.loadingTransaction = SwapController.state.loadingTransaction;
        this.unsubscribe.push(...[
            AccountController.subscribeKey('balanceSymbol', newBalanceSymbol => {
                if (this.balanceSymbol !== newBalanceSymbol) {
                    RouterController.goBack();
                }
            }),
            ChainController.subscribeKey('activeCaipNetwork', newCaipNetwork => {
                if (this.caipNetwork !== newCaipNetwork) {
                    this.caipNetwork = newCaipNetwork;
                }
            }),
            SwapController.subscribe(newState => {
                this.approvalTransaction = newState.approvalTransaction;
                this.swapTransaction = newState.swapTransaction;
                this.sourceToken = newState.sourceToken;
                this.toToken = newState.toToken;
                this.toTokenPriceInUSD = newState.toTokenPriceInUSD;
                this.sourceTokenAmount = newState.sourceTokenAmount ?? '';
                this.toTokenAmount = newState.toTokenAmount ?? '';
                this.inputError = newState.inputError;
                if (newState.inputError) {
                    RouterController.goBack();
                }
                this.loadingQuote = newState.loadingQuote;
                this.loadingApprovalTransaction = newState.loadingApprovalTransaction;
                this.loadingBuildTransaction = newState.loadingBuildTransaction;
                this.loadingTransaction = newState.loadingTransaction;
            })
        ]);
    }
    firstUpdated() {
        SwapController.getTransaction();
        this.refreshTransaction();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe?.());
        clearInterval(this.interval);
    }
    render() {
        return html `
      <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `;
    }
    refreshTransaction() {
        this.interval = setInterval(() => {
            if (!SwapController.getApprovalLoadingState()) {
                SwapController.getTransaction();
            }
        }, 10_000);
    }
    templateSwap() {
        const sourceTokenText = `${UiHelperUtil.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`;
        const toTokenText = `${UiHelperUtil.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`;
        const sourceTokenValue = parseFloat(this.sourceTokenAmount) * this.sourceTokenPriceInUSD;
        const toTokenValue = parseFloat(this.toTokenAmount) * this.toTokenPriceInUSD;
        const sentPrice = UiHelperUtil.formatNumberToLocalString(sourceTokenValue);
        const receivePrice = UiHelperUtil.formatNumberToLocalString(toTokenValue);
        const loading = this.loadingQuote ||
            this.loadingBuildTransaction ||
            this.loadingTransaction ||
            this.loadingApprovalTransaction;
        return html `
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${sentPrice}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${sourceTokenText}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${receivePrice}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${toTokenText}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${loading}
            ?disabled=${loading}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
    }
    templateDetails() {
        if (!this.sourceToken || !this.toToken || this.inputError) {
            return null;
        }
        return html `<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
    }
    actionButtonLabel() {
        if (this.loadingApprovalTransaction) {
            return 'Approving...';
        }
        if (this.approvalTransaction) {
            return 'Approve';
        }
        return 'Swap';
    }
    onCancelTransaction() {
        RouterController.goBack();
    }
    onSendTransaction() {
        if (this.approvalTransaction) {
            SwapController.sendTransactionForApproval(this.approvalTransaction);
        }
        else {
            SwapController.sendTransactionForSwap(this.swapTransaction);
        }
    }
};
W3mSwapPreviewView.styles = styles;
__decorate([
    state()
], W3mSwapPreviewView.prototype, "interval", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "detailsOpen", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "approvalTransaction", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "swapTransaction", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "sourceToken", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "sourceTokenAmount", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "sourceTokenPriceInUSD", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "toToken", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "toTokenAmount", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "toTokenPriceInUSD", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "caipNetwork", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "balanceSymbol", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "inputError", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "loadingQuote", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "loadingApprovalTransaction", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "loadingBuildTransaction", void 0);
__decorate([
    state()
], W3mSwapPreviewView.prototype, "loadingTransaction", void 0);
W3mSwapPreviewView = __decorate([
    customElement('w3m-swap-preview-view')
], W3mSwapPreviewView);
export { W3mSwapPreviewView };
//# sourceMappingURL=index.js.map