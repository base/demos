import { type GetAccountReturnType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { ConfigParameter } from '../types/properties.js';
export type UseAccountEffectParameters = Compute<{
    onConnect?(data: Compute<Pick<Extract<GetAccountReturnType, {
        status: 'connected';
    }>, 'address' | 'addresses' | 'chain' | 'chainId' | 'connector'> & {
        isReconnected: boolean;
    }>): void;
    onDisconnect?(): void;
} & ConfigParameter>;
/** https://wagmi.sh/react/api/hooks/useAccountEffect */
export declare function useAccountEffect(parameters?: UseAccountEffectParameters): void;
//# sourceMappingURL=useAccountEffect.d.ts.map