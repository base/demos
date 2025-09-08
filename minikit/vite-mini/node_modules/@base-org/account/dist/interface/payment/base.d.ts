import { getPaymentStatus } from './getPaymentStatus.js';
import { pay } from './pay.js';
import type { PaymentOptions, PaymentResult, PaymentStatus, PaymentStatusOptions } from './types.js';
/**
 * Base payment interface
 */
export declare const base: {
    pay: typeof pay;
    getPaymentStatus: typeof getPaymentStatus;
    constants: {
        CHAIN_IDS: {
            readonly base: 8453;
            readonly baseSepolia: 84532;
        };
        TOKENS: {
            readonly USDC: {
                readonly decimals: 6;
                readonly addresses: {
                    readonly base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
                    readonly baseSepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
                };
            };
        };
    };
    types: {
        PaymentOptions: PaymentOptions;
        PaymentResult: PaymentResult;
        PaymentStatusOptions: PaymentStatusOptions;
        PaymentStatus: PaymentStatus;
    };
};
//# sourceMappingURL=base.d.ts.map