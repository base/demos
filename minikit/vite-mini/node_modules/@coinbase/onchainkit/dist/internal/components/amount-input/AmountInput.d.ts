type AmountInputProps = {
    asset: string;
    currency: string;
    fiatAmount: string;
    cryptoAmount: string;
    selectedInputType: 'fiat' | 'crypto';
    setFiatAmount: (value: string) => void;
    setCryptoAmount: (value: string) => void;
    exchangeRate: string;
    delayMs?: number;
    className?: string;
    textClassName?: string;
};
export declare function AmountInput({ fiatAmount, cryptoAmount, asset, selectedInputType, currency, setFiatAmount, setCryptoAmount, exchangeRate, delayMs, className, textClassName, }: AmountInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AmountInput.d.ts.map