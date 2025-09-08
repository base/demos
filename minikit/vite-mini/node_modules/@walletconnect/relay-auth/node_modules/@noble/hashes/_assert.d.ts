/**
 * Assertion helpers
 * @module
 */
declare function anumber(n: number): void;
declare function abytes(b: Uint8Array | undefined, ...lengths: number[]): void;
export type Hash = {
    (data: Uint8Array): Uint8Array;
    blockLen: number;
    outputLen: number;
    create: any;
};
declare function ahash(h: Hash): void;
declare function aexists(instance: any, checkFinished?: boolean): void;
declare function aoutput(out: any, instance: any): void;
export { anumber, abytes, ahash, aexists, aoutput };
//# sourceMappingURL=_assert.d.ts.map