import { EASSchemaUid } from './identity/types';
import { ReactNode } from 'react';
import { Address } from 'viem';
import { Chain } from 'wagmi/chains';
import { AppConfig } from './core/types';
/**
 * Note: exported as public Type
 */
export type OnchainKitProviderReact = {
    address?: Address;
    analytics?: boolean;
    apiKey?: string;
    chain: Chain;
    children: ReactNode;
    config?: AppConfig;
    sessionId?: string;
    projectId?: string;
    rpcUrl?: string;
    schemaId?: EASSchemaUid;
};
//# sourceMappingURL=types.d.ts.map