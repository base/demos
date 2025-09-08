import { Hash, type Input } from './utils.js';
export type CHash = ReturnType<typeof wrapConstructorWithKey>;
export declare function wrapConstructorWithKey<H extends Hash<H>>(hashCons: (key: Input) => Hash<H>): {
    (msg: Input, key: Input): Uint8Array;
    outputLen: number;
    blockLen: number;
    create(key: Input): Hash<H>;
};
/** Poly1305 MAC from RFC 8439. */
export declare const poly1305: CHash;
//# sourceMappingURL=_poly1305.d.ts.map