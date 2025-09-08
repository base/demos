import { GetSocialsReturnType } from '../types';
import { Chain } from 'viem';
export type GetSocials = {
    ensName: string;
    chain?: Chain;
};
export declare const getSocials: ({ ensName, }: GetSocials) => Promise<GetSocialsReturnType>;
//# sourceMappingURL=getSocials.d.ts.map