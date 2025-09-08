import { GetAvatarReturnType, GetAvatars } from '../types';
/**
 * An asynchronous function to fetch multiple Basenames or Ethereum Name Service (ENS)
 * avatars for a given array of ENS names in a single batch request.
 * It returns an array of avatar URLs in the same order as the input names.
 */
export declare const getAvatars: ({ ensNames, chain, }: GetAvatars) => Promise<GetAvatarReturnType[]>;
//# sourceMappingURL=getAvatars.d.ts.map