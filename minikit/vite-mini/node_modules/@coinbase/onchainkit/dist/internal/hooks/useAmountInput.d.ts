type UseAmountInputParams = {
    setFiatAmount: (value: string) => void;
    setCryptoAmount: (value: string) => void;
    selectedInputType: 'fiat' | 'crypto';
    exchangeRate: string;
};
export declare const useAmountInput: ({ setFiatAmount, setCryptoAmount, selectedInputType, exchangeRate, }: UseAmountInputParams) => {
    handleChange: (value: string, onChange?: (value: string) => void) => void;
    handleFiatChange: (value: string) => void;
    handleCryptoChange: (value: string) => void;
};
export {};
//# sourceMappingURL=useAmountInput.d.ts.map