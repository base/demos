import { type CaipNetwork, type ChainNamespace } from '@reown/appkit-common';
import type { PaymentOptions } from '../types/options.js';
interface EnsureNetworkOptions {
    paymentAssetNetwork: string;
    activeCaipNetwork: CaipNetwork;
    approvedCaipNetworkIds: string[] | undefined;
    requestedCaipNetworks: CaipNetwork[] | undefined;
}
export declare function ensureCorrectNetwork(options: EnsureNetworkOptions): Promise<void>;
interface EvmPaymentParams {
    recipient: `0x${string}`;
    amount: number | string;
    fromAddress?: `0x${string}`;
}
export declare function processEvmNativePayment(paymentAsset: PaymentOptions['paymentAsset'], chainNamespace: ChainNamespace, params: EvmPaymentParams): Promise<string | undefined>;
export declare function processEvmErc20Payment(paymentAsset: PaymentOptions['paymentAsset'], params: EvmPaymentParams): Promise<string | undefined>;
export {};
