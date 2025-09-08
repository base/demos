/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
export function zeros(bytes: number): Buffer;
/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method setLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */
export function setLength(msg: Buffer | any[], length: number, right?: boolean | undefined): Buffer | any[];
/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
export function setLengthRight(msg: Buffer | any[], length: number): Buffer | any[];
export function isHexString(str: any): false | RegExpMatchArray | null;
export function stripHexPrefix(str: any): any;
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BIgInt` and other objects with a `toArray()` method.
 * @param {*} v the value
 */
export function toBuffer(v: any): any;
/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
export function bufferToHex(buf: Buffer): string;
/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */
export function keccak(a: Buffer | any[] | string | number, bits?: number | undefined): Buffer;
export function bitLengthFromBigInt(num: any): any;
export function bufferBEFromBigInt(num: any, length: any): Buffer;
export function twosFromBigInt(value: any, width: any): any;
//# sourceMappingURL=util.d.cts.map