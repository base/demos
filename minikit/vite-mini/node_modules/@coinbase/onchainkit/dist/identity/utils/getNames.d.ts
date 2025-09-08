import { GetNameReturnType, GetNames } from '../types';
/**
 * An asynchronous function to fetch multiple Basenames or Ethereum Name Service (ENS)
 * names for a given array of Ethereum addresses in a single batch request.
 * It returns an array of ENS names in the same order as the input addresses.
 */
export declare const getNames: ({ addresses, chain, }: GetNames) => Promise<GetNameReturnType[]>;
//# sourceMappingURL=getNames.d.ts.map