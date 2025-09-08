/**
 * Internal assertion helpers.
 * @module
 */
declare function anumber(n: number): void;
declare function isBytes(a: unknown): a is Uint8Array;
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
declare function abool(b: boolean): void;
export { abool, abytes, aexists, ahash, anumber, aoutput, isBytes };
//# sourceMappingURL=_assert.d.ts.map