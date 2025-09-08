import type { Config } from '../createConfig.js';
export type GetConnectorsReturnType<config extends Config = Config> = config['connectors'];
/** https://wagmi.sh/core/api/actions/getConnectors */
export declare function getConnectors<config extends Config>(config: config): GetConnectorsReturnType<config>;
//# sourceMappingURL=getConnectors.d.ts.map