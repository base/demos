import type { Config } from '../createConfig.js';
export type GetChainIdReturnType<config extends Config = Config> = config['chains'][number]['id'];
/** https://wagmi.sh/core/api/actions/getChainId */
export declare function getChainId<config extends Config>(config: config): GetChainIdReturnType<config>;
//# sourceMappingURL=getChainId.d.ts.map