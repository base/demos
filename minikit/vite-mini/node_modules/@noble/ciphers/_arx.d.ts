import { type XorStream } from './utils.js';
export declare function rotl(a: number, b: number): number;
/** Ciphers must use u32 for efficiency. */
export type CipherCoreFn = (sigma: Uint32Array, key: Uint32Array, nonce: Uint32Array, output: Uint32Array, counter: number, rounds?: number) => void;
/** Method which extends key + short nonce into larger nonce / diff key. */
export type ExtendNonceFn = (sigma: Uint32Array, key: Uint32Array, input: Uint32Array, output: Uint32Array) => void;
/** ARX cipher options.
 * * `allowShortKeys` for 16-byte keys
 * * `counterLength` in bytes
 * * `counterRight`: right: `nonce|counter`; left: `counter|nonce`
 * */
export type CipherOpts = {
    allowShortKeys?: boolean;
    extendNonceFn?: ExtendNonceFn;
    counterLength?: number;
    counterRight?: boolean;
    rounds?: number;
};
/** Creates ARX-like (ChaCha, Salsa) cipher stream from core function. */
export declare function createCipher(core: CipherCoreFn, opts: CipherOpts): XorStream;
//# sourceMappingURL=_arx.d.ts.map