import type { Assign, ChainFormatters, Prettify } from 'viem';
import type { CaipNetwork } from '@reown/appkit-common';
export declare function defineChain<formatters extends ChainFormatters, const chain extends CaipNetwork<formatters>>(chain: chain): Prettify<Assign<CaipNetwork<undefined>, chain>>;
