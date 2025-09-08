import type { Chain } from 'viem';
import type { Config } from '../createConfig.js';
export type GetChainsReturnType<config extends Config = Config> = readonly [
    ...config['chains'],
    ...Chain[]
];
/** https://wagmi.sh/core/api/actions/getChains */
export declare function getChains<config extends Config>(config: config): GetChainsReturnType<config>;
//# sourceMappingURL=getChains.d.ts.map