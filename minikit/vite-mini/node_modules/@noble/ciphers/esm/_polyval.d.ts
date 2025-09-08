import { Hash, type Input } from './utils.js';
/**
 * `mulX_POLYVAL(ByteReverse(H))` from spec
 * @param k mutated in place
 */
export declare function _toGHASHKey(k: Uint8Array): Uint8Array;
export type CHashPV = ReturnType<typeof wrapConstructorWithKey>;
declare function wrapConstructorWithKey<H extends Hash<H>>(hashCons: (key: Input, expectedLength?: number) => Hash<H>): {
    (msg: Input, key: Input): Uint8Array;
    outputLen: number;
    blockLen: number;
    create(key: Input, expectedLength?: number): Hash<H>;
};
/** GHash MAC for AES-GCM. */
export declare const ghash: CHashPV;
/** Polyval MAC for AES-SIV. */
export declare const polyval: CHashPV;
export {};
//# sourceMappingURL=_polyval.d.ts.map