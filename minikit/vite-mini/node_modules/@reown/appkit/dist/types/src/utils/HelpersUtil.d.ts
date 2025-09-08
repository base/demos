import type { SessionTypes } from '@walletconnect/types';
import type { Namespace, NamespaceConfig } from '@walletconnect/universal-provider';
import type { CaipNetwork, CaipNetworkId, ChainNamespace } from '@reown/appkit-common';
import { type OptionsControllerState } from '@reown/appkit-controllers';
export declare const DEFAULT_METHODS: {
    solana: string[];
    eip155: string[];
    bip122: string[];
};
export declare const WcHelpersUtil: {
    getMethodsByChainNamespace(chainNamespace: ChainNamespace): string[];
    createDefaultNamespace(chainNamespace: ChainNamespace): Namespace;
    applyNamespaceOverrides(baseNamespaces: NamespaceConfig, overrides?: OptionsControllerState["universalProviderConfigOverride"]): NamespaceConfig;
    createNamespaces(caipNetworks: CaipNetwork[], configOverride?: OptionsControllerState["universalProviderConfigOverride"]): NamespaceConfig;
    resolveReownName: (name: string) => Promise<string | false>;
    getChainsFromNamespaces(namespaces?: SessionTypes.Namespaces): CaipNetworkId[];
    isSessionEventData(data: unknown): data is WcHelpersUtil.SessionEventData;
    isOriginAllowed(currentOrigin: string, allowedPatterns: string[], defaultAllowedOrigins: string[]): boolean;
};
export declare namespace WcHelpersUtil {
    type SessionEventData = {
        id: string;
        topic: string;
        params: {
            chainId: string;
            event: {
                data: unknown;
                name: string;
            };
        };
    };
}
