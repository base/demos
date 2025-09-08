import type { PaymentStatus, PaymentStatusOptions } from './types.js';
/**
 * Check the status of a payment transaction using its transaction ID (userOp hash)
 *
 * @param options - Payment status check options
 * @returns Promise<PaymentStatus> - Status information about the payment
 *
 * @example
 * const status = await getPaymentStatus({
 *   id: "0x1234...5678",
 *   testnet: true
 * })
 *
 * @note The id is the userOp hash returned from the pay function
 */
export declare function getPaymentStatus(options: PaymentStatusOptions): Promise<PaymentStatus>;
//# sourceMappingURL=getPaymentStatus.d.ts.map