/*!
Copyright (c) 2023 Paul Miller (paulmillr.com)
The library @paulmillr/qr is dual-licensed under the Apache 2.0 OR MIT license.
You can select a license of your choice.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
export interface Coder<F, T> {
    encode(from: F): T;
    decode(to: T): F;
}
declare function validateVersion(ver: Version): void;
declare function bin(dec: number, pad: number): string;
declare function fillArr<T>(length: number, val: T): T[];
declare function best<T>(): {
    add(score: number, value: T): void;
    get: () => T | undefined;
    score: () => number;
};
export type Point = {
    x: number;
    y: number;
};
export type Size = {
    height: number;
    width: number;
};
export type Image = Size & {
    data: Uint8Array | Uint8ClampedArray | number[];
};
type DrawValue = boolean | undefined;
type DrawFn = DrawValue | ((c: Point, curr: DrawValue) => DrawValue);
type ReadFn = (c: Point, curr: DrawValue) => void;
export declare class Bitmap {
    private static size;
    static fromString(s: string): Bitmap;
    data: DrawValue[][];
    height: number;
    width: number;
    constructor(size: Size | number, data?: DrawValue[][]);
    point(p: Point): DrawValue;
    isInside(p: Point): boolean;
    size(offset?: Point | number): {
        height: number;
        width: number;
    };
    private xy;
    rect(c: Point | number, size: Size | number, value: DrawFn): this;
    rectRead(c: Point | number, size: Size | number, fn: ReadFn): this;
    hLine(c: Point | number, len: number, value: DrawFn): this;
    vLine(c: Point | number, len: number, value: DrawFn): this;
    border(border: number | undefined, value: DrawValue): Bitmap;
    embed(c: Point | number, bm: Bitmap): this;
    rectSlice(c: Point | number, size?: Size | number): Bitmap;
    inverse(): Bitmap;
    scale(factor: number): Bitmap;
    clone(): Bitmap;
    assertDrawn(): void;
    toString(): string;
    toASCII(): string;
    toTerm(): string;
    toSVG(): string;
    toGIF(): Uint8Array;
    toImage(isRGB?: boolean): Image;
}
export declare const ECMode: readonly ["low", "medium", "quartile", "high"];
export type ErrorCorrection = (typeof ECMode)[number];
export type Version = number;
export type Mask = (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) & keyof typeof PATTERNS;
export declare const Encoding: readonly ["numeric", "alphanumeric", "byte", "kanji", "eci"];
export type EncodingType = (typeof Encoding)[number];
declare const PATTERNS: readonly ((x: number, y: number) => boolean)[];
declare function interleave(ver: Version, ecc: ErrorCorrection): Coder<Uint8Array, Uint8Array>;
declare function drawTemplate(ver: Version, ecc: ErrorCorrection, maskIdx: Mask, test?: boolean): Bitmap;
declare function zigzag(tpl: Bitmap, maskIdx: Mask, fn: (x: number, y: number, mask: boolean) => void): void;
declare function detectType(str: string): EncodingType;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
export declare function utf8ToBytes(str: string): Uint8Array;
declare function encode(ver: Version, ecc: ErrorCorrection, data: string, type: EncodingType): Uint8Array;
declare function drawQR(ver: Version, ecc: ErrorCorrection, data: Uint8Array, maskIdx: Mask, test?: boolean): Bitmap;
declare function penalty(bm: Bitmap): number;
type QrOpts = {
    ecc?: ErrorCorrection;
    encoding?: EncodingType;
    version?: Version;
    mask?: number;
    border?: number;
    scale?: number;
};
export default function encodeQR(text: string, output: 'raw', opts?: QrOpts): boolean[][];
export default function encodeQR(text: string, output: 'ascii' | 'term' | 'svg', opts?: QrOpts): string;
export default function encodeQR(text: string, output: 'gif', opts?: QrOpts): Uint8Array;
export declare const utils: {
    best: typeof best;
    bin: typeof bin;
    drawTemplate: typeof drawTemplate;
    fillArr: typeof fillArr;
    info: {
        size: Coder<Version, number>;
        sizeType: (ver: Version) => number;
        alignmentPatterns(ver: Version): number[];
        ECCode: Record<ErrorCorrection, number>;
        formatMask: number;
        formatBits(ecc: ErrorCorrection, maskIdx: Mask): number;
        versionBits(ver: Version): number;
        alphabet: {
            numeric: Coder<number[], string[]> & {
                has: (char: string) => boolean;
            };
            alphanumerc: Coder<number[], string[]> & {
                has: (char: string) => boolean;
            };
        };
        lengthBits(ver: Version, type: EncodingType): number;
        modeBits: {
            numeric: string;
            alphanumeric: string;
            byte: string;
            kanji: string;
            eci: string;
        };
        capacity(ver: Version, ecc: ErrorCorrection): {
            words: number;
            numBlocks: number;
            shortBlocks: number;
            blockLen: number;
            capacity: number;
            total: number;
        };
    };
    interleave: typeof interleave;
    validateVersion: typeof validateVersion;
    zigzag: typeof zigzag;
};
export declare const _tests: {
    Bitmap: typeof Bitmap;
    info: {
        size: Coder<Version, number>;
        sizeType: (ver: Version) => number;
        alignmentPatterns(ver: Version): number[];
        ECCode: Record<ErrorCorrection, number>;
        formatMask: number;
        formatBits(ecc: ErrorCorrection, maskIdx: Mask): number;
        versionBits(ver: Version): number;
        alphabet: {
            numeric: Coder<number[], string[]> & {
                has: (char: string) => boolean;
            };
            alphanumerc: Coder<number[], string[]> & {
                has: (char: string) => boolean;
            };
        };
        lengthBits(ver: Version, type: EncodingType): number;
        modeBits: {
            numeric: string;
            alphanumeric: string;
            byte: string;
            kanji: string;
            eci: string;
        };
        capacity(ver: Version, ecc: ErrorCorrection): {
            words: number;
            numBlocks: number;
            shortBlocks: number;
            blockLen: number;
            capacity: number;
            total: number;
        };
    };
    detectType: typeof detectType;
    encode: typeof encode;
    drawQR: typeof drawQR;
    penalty: typeof penalty;
    PATTERNS: readonly ((x: number, y: number) => boolean)[];
};
export {};
//# sourceMappingURL=index.d.ts.map