import type { MutateOptions } from '@tanstack/query-core';
import { type SwitchChainErrorType, type SwitchChainParameters, type SwitchChainReturnType } from '../actions/switchChain.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
export declare function switchChainMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: {
        connector?: import("../createConfig.js").Connector | undefined;
        chainId: config["chains"][number]["id"];
        addEthereumChainParameter?: {
            chainName?: string | undefined;
            nativeCurrency?: {
                name: string;
                symbol: string;
                decimals: number;
            } | undefined | undefined;
            rpcUrls?: readonly string[] | undefined;
            blockExplorerUrls?: string[] | undefined | undefined;
            iconUrls?: string[] | undefined | undefined;
        } | undefined;
    }) => Promise<Extract<config["chains"][number], {
        id: Config extends config ? number : config["chains"][number]["id"];
    }>>;
    readonly mutationKey: readonly ["switchChain"];
};
export type SwitchChainData<config extends Config, chainId extends config['chains'][number]['id']> = Compute<SwitchChainReturnType<config, chainId>>;
export type SwitchChainVariables<config extends Config, chainId extends config['chains'][number]['id']> = Compute<SwitchChainParameters<config, chainId>>;
export type SwitchChainMutate<config extends Config, context = unknown> = <chainId extends config['chains'][number]['id']>(variables: SwitchChainVariables<config, chainId>, options?: Compute<MutateOptions<SwitchChainData<config, chainId>, SwitchChainErrorType, Compute<SwitchChainVariables<config, chainId>>, context>> | undefined) => void;
export type SwitchChainMutateAsync<config extends Config, context = unknown> = <chainId extends config['chains'][number]['id']>(variables: SwitchChainVariables<config, chainId>, options?: Compute<MutateOptions<SwitchChainData<config, chainId>, SwitchChainErrorType, Compute<SwitchChainVariables<config, chainId>>, context>> | undefined) => Promise<SwitchChainData<config, chainId>>;
//# sourceMappingURL=switchChain.d.ts.map