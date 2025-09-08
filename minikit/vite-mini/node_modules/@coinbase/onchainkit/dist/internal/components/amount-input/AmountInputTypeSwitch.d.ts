type AmountInputTypeSwitchPropsReact = {
    selectedInputType: 'fiat' | 'crypto';
    setSelectedInputType: (type: 'fiat' | 'crypto') => void;
    asset: string;
    fiatAmount: string;
    cryptoAmount: string;
    exchangeRate: number;
    exchangeRateLoading: boolean;
    loadingDisplay?: React.ReactNode;
    currency: string;
    className?: string;
};
export declare function AmountInputTypeSwitch({ selectedInputType, setSelectedInputType, asset, fiatAmount, cryptoAmount, exchangeRate, exchangeRateLoading, currency, loadingDisplay, className, }: AmountInputTypeSwitchPropsReact): string | number | boolean | Iterable<import('react').ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=AmountInputTypeSwitch.d.ts.map