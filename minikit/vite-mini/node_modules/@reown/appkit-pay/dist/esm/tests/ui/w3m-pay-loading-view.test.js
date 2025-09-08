import { elementUpdated, fixture } from '@open-wc/testing';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';
import { ConnectionController, ModalController, ThemeController } from '@reown/appkit-controllers';
import { PayController } from '../../src/controllers/PayController';
import { AppKitPayErrorCodes } from '../../src/types/errors';
import { W3mPayLoadingView } from '../../src/ui/w3m-pay-loading-view';
describe('W3mPayLoadingView', () => {
    beforeAll(() => {
        if (!customElements.get('w3m-pay-loading-view')) {
            customElements.define('w3m-pay-loading-view', W3mPayLoadingView);
        }
    });
    beforeEach(() => {
        PayController.state.isPaymentInProgress = true;
        PayController.state.error = null;
        vi.spyOn(ConnectionController, 'state', 'get').mockReturnValue({
            ...ConnectionController.state,
            status: 'connected'
        });
        vi.spyOn(ThemeController, 'state', 'get').mockReturnValue({
            ...ThemeController.state,
            themeVariables: {
                '--w3m-border-radius-master': '8px'
            }
        });
        const originalSubscribeKey = PayController.subscribeKey;
        vi.spyOn(PayController, 'subscribeKey').mockImplementation((key, callback) => {
            if (key === 'isPaymentInProgress') {
                paymentProgressCallback = (inProgress) => {
                    ;
                    callback(inProgress);
                    if (!inProgress) {
                        setTimeout(() => { }, 0);
                    }
                };
            }
            else if (key === 'error') {
                errorCallback = callback;
            }
            else {
                return originalSubscribeKey(key, callback);
            }
            return vi.fn();
        });
        vi.useRealTimers();
        vi.spyOn(ModalController, 'close').mockImplementation(() => { });
    });
    let paymentProgressCallback = null;
    let errorCallback = null;
    test('should render in-progress state by default', async () => {
        const element = await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        await elementUpdated(element);
        const loadingMessage = element.shadowRoot?.querySelector('wui-text[color="fg-100"]');
        const subMessage = element.shadowRoot?.querySelector('wui-text[color="fg-200"]');
        const loadingThumbnail = element.shadowRoot?.querySelector('wui-loading-thumbnail');
        expect(loadingMessage?.textContent?.trim()).toBe('Awaiting payment confirmation');
        expect(subMessage?.textContent?.trim()).toBe('Please confirm the payment transaction in your wallet');
        expect(loadingThumbnail).not.toBeNull();
    });
    test('should update to completed state when payment is finished successfully', async () => {
        const element = await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        await elementUpdated(element);
        PayController.state.currentPayment = { type: 'wallet', result: '0xSuccessHash' };
        if (paymentProgressCallback) {
            paymentProgressCallback(false);
        }
        await elementUpdated(element);
        const loadingMessage = element.shadowRoot?.querySelector('wui-text[color="fg-100"]');
        const subMessage = element.shadowRoot?.querySelector('wui-text[color="fg-200"]');
        const successIcon = element.shadowRoot?.querySelector('wui-icon[name="checkmark"]');
        expect(loadingMessage?.textContent?.trim()).toBe('Payment completed');
        expect(subMessage?.textContent?.trim()).toBe('Your transaction has been successfully processed');
        expect(successIcon).not.toBeNull();
    });
    test('should update to error state when payment fails', async () => {
        const element = await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        await elementUpdated(element);
        PayController.state.error = AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR;
        PayController.state.currentPayment = undefined;
        if (errorCallback) {
            errorCallback(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);
        }
        await elementUpdated(element);
        const loadingMessage = element.shadowRoot?.querySelector('wui-text[color="fg-100"]');
        const subMessage = element.shadowRoot?.querySelector('wui-text[color="fg-200"]');
        const errorIcon = element.shadowRoot?.querySelector('wui-icon[name="close"]');
        expect(loadingMessage?.textContent?.trim()).toBe('Payment failed');
        expect(subMessage?.textContent?.trim()).toBe('There was an error processing your transaction');
        expect(errorIcon).not.toBeNull();
    });
    test('should also update to error state when payment finishes with error', async () => {
        const element = await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        await elementUpdated(element);
        PayController.state.error = AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR;
        PayController.state.currentPayment = undefined;
        if (paymentProgressCallback) {
            paymentProgressCallback(false);
        }
        await elementUpdated(element);
        const loadingMessage = element.shadowRoot?.querySelector('wui-text[color="fg-100"]');
        const subMessage = element.shadowRoot?.querySelector('wui-text[color="fg-200"]');
        const errorIcon = element.shadowRoot?.querySelector('wui-icon[name="close"]');
        expect(loadingMessage?.textContent?.trim()).toBe('Payment failed');
        expect(subMessage?.textContent?.trim()).toBe('There was an error processing your transaction');
        expect(errorIcon).not.toBeNull();
    });
    test('should close modal after 3 seconds when payment completes', async () => {
        vi.useFakeTimers();
        await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        if (paymentProgressCallback) {
            paymentProgressCallback(false);
        }
        vi.advanceTimersByTime(3000);
        expect(ModalController.close).toHaveBeenCalledOnce();
        vi.useRealTimers();
    });
    test('should close modal after 3 seconds when payment fails', async () => {
        vi.useFakeTimers();
        await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        if (paymentProgressCallback) {
            paymentProgressCallback(false);
        }
        vi.advanceTimersByTime(3000);
        expect(ModalController.close).toHaveBeenCalledOnce();
        vi.useRealTimers();
    });
    test('should not close modal if user is disconnected', async () => {
        vi.useFakeTimers();
        vi.spyOn(ConnectionController, 'state', 'get').mockReturnValue({
            ...ConnectionController.state,
            status: 'disconnected'
        });
        await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        if (paymentProgressCallback) {
            paymentProgressCallback(false);
        }
        vi.advanceTimersByTime(3000);
        expect(ModalController.close).not.toHaveBeenCalled();
        vi.useRealTimers();
    });
    test('should properly render loading thumbnail with theme radius', async () => {
        const element = await fixture(html `<w3m-pay-loading-view></w3m-pay-loading-view>`);
        await elementUpdated(element);
        const loadingThumbnail = element.shadowRoot?.querySelector('wui-loading-thumbnail');
        expect(loadingThumbnail?.getAttribute('radius')).toBe('72');
    });
});
//# sourceMappingURL=w3m-pay-loading-view.test.js.map