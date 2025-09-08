import { PayController } from './controllers/PayController.js';
export async function openPay(options) {
    return PayController.handleOpenPay(options);
}
export function getAvailableExchanges(params) {
    return PayController.getAvailableExchanges(params);
}
export function getPayUrl(exchangeId, params) {
    return PayController.getPayUrl(exchangeId, params, true);
}
export function openPayUrl(exchangeId, params, openInNewTab) {
    return PayController.openPayUrl({ exchangeId, openInNewTab }, params, true);
}
export function getExchanges() {
    return PayController.getExchanges();
}
export function getPayResult() {
    return PayController.state.currentPayment?.result;
}
export function getPayError() {
    return PayController.state.error;
}
export function getIsPaymentInProgress() {
    return PayController.state.isPaymentInProgress;
}
export function subscribeStateKey(key, callback) {
    return PayController.subscribeKey(key, callback);
}
//# sourceMappingURL=client.js.map