import { ReactNode } from 'react';
import { WalletContextType } from '../types';
export type WalletProviderReact = {
    children: ReactNode;
    /** Whether to sponsor transactions for Send feature of advanced wallet implementation */
    isSponsored?: boolean;
};
export declare function WalletProvider({ children, isSponsored }: WalletProviderReact): import("react/jsx-runtime").JSX.Element;
export declare function useWalletContext(): WalletContextType;
//# sourceMappingURL=WalletProvider.d.ts.map