import { Token } from '../../token';
type WalletAdvancedTokenDetailsProps = {
    token: Token;
    tokenImageSize?: number;
    balance: number;
    valueInFiat: number;
    classNames?: {
        container?: string;
        tokenImage?: string;
        tokenName?: string;
        tokenBalance?: string;
        fiatValue?: string;
    };
};
type WalletAdvancedTokenHoldingsProps = {
    classNames?: {
        container?: string;
        tokenDetails?: WalletAdvancedTokenDetailsProps['classNames'];
    };
};
export declare function WalletAdvancedTokenHoldings({ classNames, }: WalletAdvancedTokenHoldingsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=WalletAdvancedTokenHoldings.d.ts.map