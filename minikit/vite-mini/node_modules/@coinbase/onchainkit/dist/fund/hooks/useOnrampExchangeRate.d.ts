import { OnrampError } from '../types';
export declare const useOnrampExchangeRate: ({ asset, currency, country, subdivision, setExchangeRate, onError, }: {
    asset: string;
    currency: string;
    country: string;
    subdivision?: string;
    setExchangeRate: (exchangeRate: number) => void;
    onError?: (error: OnrampError) => void;
}) => {
    fetchExchangeRate: () => Promise<void>;
};
//# sourceMappingURL=useOnrampExchangeRate.d.ts.map