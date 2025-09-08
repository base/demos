import type { CaipNetwork } from '@reown/appkit-common';
import type { Exchange } from '../../src/types/exchange.js';
import type { PaymentAsset } from '../../src/types/options.js';
export declare const mockExchanges: Exchange[];
export declare const mockPaymentAsset: PaymentAsset;
export declare const mockConnectionState: {
    status: string;
    caipAddress: string;
    connectedWalletInfo: {
        name: string;
        icon: string;
    };
};
export declare const mockRequestedCaipNetworks: CaipNetwork[];
