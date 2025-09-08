import { HashMD } from './_md.js';
import { CHash } from './utils.js';
export declare class SHA256 extends HashMD<SHA256> {
    protected A: number;
    protected B: number;
    protected C: number;
    protected D: number;
    protected E: number;
    protected F: number;
    protected G: number;
    protected H: number;
    constructor();
    protected get(): [number, number, number, number, number, number, number, number];
    protected set(A: number, B: number, C: number, D: number, E: number, F: number, G: number, H: number): void;
    protected process(view: DataView, offset: number): void;
    protected roundClean(): void;
    destroy(): void;
}
/** SHA2-256 hash function */
export declare const sha256: CHash;
/** SHA2-224 hash function */
export declare const sha224: CHash;
//# sourceMappingURL=sha256.d.ts.map