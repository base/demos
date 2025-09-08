import type { CaipAddress } from '@reown/appkit-common';
export declare const tokensResponse: {
    tokens: {
        name: string;
        symbol: string;
        address: CaipAddress;
        decimals: number;
        logoUri: string;
        eip2612: boolean;
    }[];
};
export declare const networkTokenPriceResponse: {
    fungibles: {
        name: string;
        symbol: string;
        iconUrl: string;
        price: number;
    }[];
};
export declare const balanceResponse: {
    balances: ({
        name: string;
        symbol: string;
        chainId: string;
        value: number;
        price: number;
        quantity: {
            decimals: string;
            numeric: string;
        };
        iconUrl: string;
        address?: undefined;
    } | {
        name: string;
        symbol: string;
        chainId: string;
        address: string;
        value: number;
        price: number;
        quantity: {
            decimals: string;
            numeric: string;
        };
        iconUrl: string;
    })[];
};
export declare const allowanceResponse: {
    allowance: string;
};
export declare const swapQuoteResponse: {
    quotes: {
        id: null;
        fromAmount: string;
        fromAccount: string;
        toAmount: string;
        toAccount: string;
    }[];
};
export declare const swapCalldataResponse: {
    tx: {
        from: CaipAddress;
        to: CaipAddress;
        data: `0x${string}`;
        amount: string;
        eip155: {
            gas: string;
            gasPrice: string;
        };
    };
};
export declare const gasPriceResponse: {
    standard: string;
    fast: string;
    instant: string;
};
