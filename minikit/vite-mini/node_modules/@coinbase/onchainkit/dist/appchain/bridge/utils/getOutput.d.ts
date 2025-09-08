import { Chain } from 'viem';
import { Config } from 'wagmi';
import { AppchainConfig } from '../types';
export declare const getOutput: ({ config, chain, wagmiConfig, }: {
    config: AppchainConfig;
    chain: Chain;
    wagmiConfig: Config;
}) => Promise<{
    outputRoot: `0x${string}`;
    timestamp: bigint;
    l2BlockNumber: bigint;
    outputIndex: bigint;
}>;
//# sourceMappingURL=getOutput.d.ts.map