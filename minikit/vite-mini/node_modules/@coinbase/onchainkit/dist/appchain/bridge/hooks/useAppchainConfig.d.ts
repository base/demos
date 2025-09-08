import { AppchainConfig } from '../types';
export interface ChainConfigParams {
    l2ChainId: number;
    appchainChainId: number;
}
export declare function useChainConfig(params: ChainConfigParams): {
    config: AppchainConfig | undefined;
    isLoading: boolean;
    isError: boolean;
    error: import('viem').ReadContractErrorType | null;
};
//# sourceMappingURL=useAppchainConfig.d.ts.map