"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHex = exports.createBytes = exports.createBigInt = exports.createNumber = void 0;
const superstruct_1 = require("@metamask/superstruct");
const assert_1 = require("./assert.cjs");
const bytes_1 = require("./bytes.cjs");
const hex_1 = require("./hex.cjs");
const NumberLikeStruct = (0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.bigint)(), (0, superstruct_1.string)(), hex_1.StrictHexStruct]);
const NumberCoercer = (0, superstruct_1.coerce)((0, superstruct_1.number)(), NumberLikeStruct, Number);
const BigIntCoercer = (0, superstruct_1.coerce)((0, superstruct_1.bigint)(), NumberLikeStruct, BigInt);
const BytesLikeStruct = (0, superstruct_1.union)([hex_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array)]);
const BytesCoercer = (0, superstruct_1.coerce)((0, superstruct_1.instance)(Uint8Array), (0, superstruct_1.union)([hex_1.StrictHexStruct]), bytes_1.hexToBytes);
const HexCoercer = (0, superstruct_1.coerce)(hex_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array), bytes_1.bytesToHex);
/**
 * Create a number from a number-like value.
 *
 * - If the value is a number, it is returned as-is.
 * - If the value is a `bigint`, it is converted to a number.
 * - If the value is a string, it is interpreted as a decimal number.
 * - If the value is a hex string (i.e., it starts with "0x"), it is
 * interpreted as a hexadecimal number.
 *
 * This validates that the value is a number-like value, and that the resulting
 * number is not `NaN` or `Infinity`.
 *
 * @example
 * ```typescript
 * const value = createNumber('0x010203');
 * console.log(value); // 66051
 *
 * const otherValue = createNumber(123n);
 * console.log(otherValue); // 123
 * ```
 * @param value - The value to create the number from.
 * @returns The created number.
 * @throws If the value is not a number-like value, or if the resulting number
 * is `NaN` or `Infinity`.
 */
function createNumber(value) {
    try {
        const result = (0, superstruct_1.create)(value, NumberCoercer);
        (0, assert_1.assert)(Number.isFinite(result), `Expected a number-like value, got "${value}".`);
        return result;
    }
    catch (error) {
        if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a number-like value, got "${value}".`);
        }
        /* istanbul ignore next */
        throw error;
    }
}
exports.createNumber = createNumber;
/**
 * Create a `bigint` from a number-like value.
 *
 * - If the value is a number, it is converted to a `bigint`.
 * - If the value is a `bigint`, it is returned as-is.
 * - If the value is a string, it is interpreted as a decimal number and
 * converted to a `bigint`.
 * - If the value is a hex string (i.e., it starts with "0x"), it is
 * interpreted as a hexadecimal number and converted to a `bigint`.
 *
 * @example
 * ```typescript
 * const value = createBigInt('0x010203');
 * console.log(value); // 16909060n
 *
 * const otherValue = createBigInt(123);
 * console.log(otherValue); // 123n
 * ```
 * @param value - The value to create the bigint from.
 * @returns The created bigint.
 * @throws If the value is not a number-like value.
 */
function createBigInt(value) {
    try {
        // The `BigInt` constructor throws if the value is not a number-like value.
        // There is no need to validate the value manually.
        return (0, superstruct_1.create)(value, BigIntCoercer);
    }
    catch (error) {
        if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a number-like value, got "${String(error.value)}".`);
        }
        /* istanbul ignore next */
        throw error;
    }
}
exports.createBigInt = createBigInt;
/**
 * Create a byte array from a bytes-like value.
 *
 * - If the value is a byte array, it is returned as-is.
 * - If the value is a hex string (i.e., it starts with "0x"), it is interpreted
 * as a hexadecimal number and converted to a byte array.
 *
 * @example
 * ```typescript
 * const value = createBytes('0x010203');
 * console.log(value); // Uint8Array [ 1, 2, 3 ]
 *
 * const otherValue = createBytes('0x010203');
 * console.log(otherValue); // Uint8Array [ 1, 2, 3 ]
 * ```
 * @param value - The value to create the byte array from.
 * @returns The created byte array.
 * @throws If the value is not a bytes-like value.
 */
function createBytes(value) {
    if (typeof value === 'string' && value.toLowerCase() === '0x') {
        return new Uint8Array();
    }
    try {
        return (0, superstruct_1.create)(value, BytesCoercer);
    }
    catch (error) {
        if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a bytes-like value, got "${String(error.value)}".`);
        }
        /* istanbul ignore next */
        throw error;
    }
}
exports.createBytes = createBytes;
/**
 * Create a hexadecimal string from a bytes-like value.
 *
 * - If the value is a hex string (i.e., it starts with "0x"), it is returned
 * as-is.
 * - If the value is a `Uint8Array`, it is converted to a hex string.
 *
 * @example
 * ```typescript
 * const value = createHex(new Uint8Array([1, 2, 3]));
 * console.log(value); // '0x010203'
 *
 * const otherValue = createHex('0x010203');
 * console.log(otherValue); // '0x010203'
 * ```
 * @param value - The value to create the hex string from.
 * @returns The created hex string.
 * @throws If the value is not a bytes-like value.
 */
function createHex(value) {
    if ((value instanceof Uint8Array && value.length === 0) ||
        (typeof value === 'string' && value.toLowerCase() === '0x')) {
        return '0x';
    }
    try {
        return (0, superstruct_1.create)(value, HexCoercer);
    }
    catch (error) {
        if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a bytes-like value, got "${String(error.value)}".`);
        }
        /* istanbul ignore next */
        throw error;
    }
}
exports.createHex = createHex;
//# sourceMappingURL=coercers.cjs.map