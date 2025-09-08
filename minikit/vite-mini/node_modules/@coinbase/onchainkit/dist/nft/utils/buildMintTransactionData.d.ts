import { BuildMintTransactionParams } from '../../api/types';
import { Address } from 'viem';
import { Call } from '../../transaction/types';
export declare function buildMintTransactionData({ contractAddress, takerAddress, tokenId, quantity, network, }: {
    contractAddress: Address;
} & Omit<BuildMintTransactionParams, 'mintAddress'>): Promise<Call[]>;
//# sourceMappingURL=buildMintTransactionData.d.ts.map