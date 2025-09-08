/**
 * Browser entry point for Base Account SDK
 * This file exposes the account interface to the global window object
 */
import { createBaseAccountSDK } from './interface/builder/core/createBaseAccountSDK.js';
import { base } from './interface/payment/base.js';
import { CHAIN_IDS, TOKENS } from './interface/payment/constants.js';
import { getPaymentStatus } from './interface/payment/getPaymentStatus.js';
import { pay } from './interface/payment/pay.js';
// Expose to global window object
if (typeof window !== 'undefined') {
    window.base = base;
    window.createBaseAccountSDK = createBaseAccountSDK;
}
export { createBaseAccountSDK } from './interface/builder/core/createBaseAccountSDK.js';
export { getCryptoKeyAccount, removeCryptoKey } from './kms/crypto-key/index.js';
export { base, CHAIN_IDS, getPaymentStatus, pay, TOKENS };
//# sourceMappingURL=browser-entry.js.map