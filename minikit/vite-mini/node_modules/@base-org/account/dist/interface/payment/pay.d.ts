import type { PaymentOptions, PaymentResult } from './types.js';
/**
 * Pay a specified address with USDC on Base network using an ephemeral wallet
 *
 * @param options - Payment options
 * @param options.amount - Amount of USDC to send as a string (e.g., "10.50")
 * @param options.to - Ethereum address to send payment to
 * @param options.testnet - Whether to use Base Sepolia testnet (default: false)
 * @param options.payerInfo - Optional payer information configuration for data callbacks
 * @returns Promise<PaymentResult> - Result of the payment transaction
 *
 * @example
 * ```typescript
 * const payment = await pay({
 *   amount: "10.50",
 *   to: "0xFe21034794A5a574B94fE4fDfD16e005F1C96e51",
 *   testnet: true
 * });
 *
 * if (payment.success) {
 *   console.log(`Payment sent! Transaction ID: ${payment.id}`);
 * } else {
 *   console.error(`Payment failed: ${payment.error}`);
 * }
 * ```
 */
export declare function pay(options: PaymentOptions): Promise<PaymentResult>;
//# sourceMappingURL=pay.d.ts.map