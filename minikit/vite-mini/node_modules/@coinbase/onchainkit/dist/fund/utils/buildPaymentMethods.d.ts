import { OnrampOptionsResponseData, PaymentMethod } from '../types';
/**
 * Coinbase payment method description is built using the available payment methods and adding Cash and Crypto Balance to the end of the array.
 * i.e. If the API returns Card and ACH, the description will be "Card, ACH, Cash, Crypto Balance".
 */
export declare const buildCoinbasePaymentMethodDescription: (paymentMethodLimits: Array<{
    id: string;
}>) => string;
export declare const buildPaymentMethods: (paymentOptions: OnrampOptionsResponseData, currency: string, country: string) => PaymentMethod[];
//# sourceMappingURL=buildPaymentMethods.d.ts.map