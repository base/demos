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
import type { Image, Point } from './index.js';
import { Bitmap } from './index.js';
export type FinderPoints = [Pattern, Pattern, Point, Pattern];
/**
 * Convert to grayscale. The function is the most expensive part of decoding:
 * it takes up to 90% of time. TODO: check gamma correction / sqr.
 */
declare function toBitmap(img: Image): Bitmap;
type Pattern = Point & {
    moduleSize: number;
    count: number;
};
declare function findFinder(b: Bitmap): {
    bl: Pattern;
    tl: Pattern;
    tr: Pattern;
};
declare function detect(b: Bitmap): {
    bits: Bitmap;
    points: FinderPoints;
};
declare function decodeBitmap(b: Bitmap): string;
export type DecodeOpts = {
    cropToSquare?: boolean;
    pointsOnDetect?: (points: FinderPoints) => void;
    imageOnBitmap?: (img: Image) => void;
    imageOnDetect?: (img: Image) => void;
    imageOnResult?: (img: Image) => void;
};
export default function decodeQR(img: Image, opts?: DecodeOpts): string;
export declare const _tests: {
    toBitmap: typeof toBitmap;
    decodeBitmap: typeof decodeBitmap;
    findFinder: typeof findFinder;
    detect: typeof detect;
};
export {};
//# sourceMappingURL=decode.d.ts.map