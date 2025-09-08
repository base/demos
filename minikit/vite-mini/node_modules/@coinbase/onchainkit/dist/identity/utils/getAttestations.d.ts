import { Attestation, GetAttestationsOptions } from '../types';
import { Address, Chain } from 'viem';
/**
 * Fetches Ethereum Attestation Service (EAS) attestations for a given address and chain,
 * optionally filtered by schemas associated with the attestation.
 */
export declare function getAttestations(address: Address, chain: Chain, options?: GetAttestationsOptions): Promise<Attestation[]>;
//# sourceMappingURL=getAttestations.d.ts.map