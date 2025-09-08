var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ConnectionController, ModalController, ThemeController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-loading-thumbnail';
import '@reown/appkit-ui/wui-text';
import { PayController } from '../../controllers/PayController.js';
import styles from './styles.js';
const EXCHANGE_STATUS_CHECK_INTERVAL = 4000;
let W3mPayLoadingView = class W3mPayLoadingView extends LitElement {
    constructor() {
        super();
        this.loadingMessage = '';
        this.subMessage = '';
        this.paymentState = 'in-progress';
        this.paymentState = PayController.state.isPaymentInProgress ? 'in-progress' : 'completed';
        this.updateMessages();
        this.setupSubscription();
        this.setupExchangeSubscription();
    }
    disconnectedCallback() {
        clearInterval(this.exchangeSubscription);
    }
    render() {
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
    }
    updateMessages() {
        switch (this.paymentState) {
            case 'completed':
                this.loadingMessage = 'Payment completed';
                this.subMessage = 'Your transaction has been successfully processed';
                break;
            case 'error':
                this.loadingMessage = 'Payment failed';
                this.subMessage = 'There was an error processing your transaction';
                break;
            case 'in-progress':
            default:
                if (PayController.state.currentPayment?.type === 'exchange') {
                    this.loadingMessage = 'Payment initiated';
                    this.subMessage = `Please complete the payment on the exchange`;
                }
                else {
                    this.loadingMessage = 'Awaiting payment confirmation';
                    this.subMessage = 'Please confirm the payment transaction in your wallet';
                }
                break;
        }
    }
    getStateIcon() {
        switch (this.paymentState) {
            case 'completed':
                return this.successTemplate();
            case 'error':
                return this.errorTemplate();
            case 'in-progress':
            default:
                return this.loaderTemplate();
        }
    }
    setupExchangeSubscription() {
        if (PayController.state.currentPayment?.type !== 'exchange') {
            return;
        }
        this.exchangeSubscription = setInterval(async () => {
            const exchangeId = PayController.state.currentPayment?.exchangeId;
            const sessionId = PayController.state.currentPayment?.sessionId;
            if (exchangeId && sessionId) {
                await PayController.updateBuyStatus(exchangeId, sessionId);
                if (PayController.state.currentPayment?.status === 'SUCCESS') {
                    clearInterval(this.exchangeSubscription);
                }
            }
        }, EXCHANGE_STATUS_CHECK_INTERVAL);
    }
    setupSubscription() {
        PayController.subscribeKey('isPaymentInProgress', (inProgress) => {
            if (!inProgress && this.paymentState === 'in-progress') {
                if (PayController.state.error || !PayController.state.currentPayment?.result) {
                    this.paymentState = 'error';
                }
                else {
                    this.paymentState = 'completed';
                }
                this.updateMessages();
                setTimeout(() => {
                    if (ConnectionController.state.status === 'disconnected') {
                        return;
                    }
                    ModalController.close();
                }, 3000);
            }
        });
        PayController.subscribeKey('error', (error) => {
            if (error && this.paymentState === 'in-progress') {
                this.paymentState = 'error';
                this.updateMessages();
            }
        });
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return html `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
    }
    successTemplate() {
        return html `<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`;
    }
    errorTemplate() {
        return html `<wui-icon size="xl" color="error-100" name="close"></wui-icon>`;
    }
};
W3mPayLoadingView.styles = styles;
__decorate([
    state()
], W3mPayLoadingView.prototype, "loadingMessage", void 0);
__decorate([
    state()
], W3mPayLoadingView.prototype, "subMessage", void 0);
__decorate([
    state()
], W3mPayLoadingView.prototype, "paymentState", void 0);
W3mPayLoadingView = __decorate([
    customElement('w3m-pay-loading-view')
], W3mPayLoadingView);
export { W3mPayLoadingView };
//# sourceMappingURL=index.js.map