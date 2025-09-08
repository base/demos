import { LifecycleStatus, SignatureProviderProps } from '../types';
type SignatureContextType = {
    lifecycleStatus: LifecycleStatus;
    handleSign: () => Promise<void>;
};
export declare function useSignatureContext(): SignatureContextType;
export declare function SignatureProvider({ children, onSuccess, onError, onStatus, domain, types, message, primaryType, resetAfter, }: SignatureProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SignatureProvider.d.ts.map