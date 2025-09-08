"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove0x = exports.add0x = exports.assertIsStrictHexString = exports.assertIsHexString = exports.isStrictHexString = exports.isHexString = exports.StrictHexStruct = exports.HexStruct = void 0;
const superstruct_1 = require("superstruct");
const assert_1 = require("./assert");
exports.HexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^(?:0x)?[0-9a-f]+$/iu);
exports.StrictHexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^0x[0-9a-f]+$/iu);
/**
 * Check if a string is a valid hex string.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
function isHexString(value) {
    return (0, superstruct_1.is)(value, exports.HexStruct);
}
exports.isHexString = isHexString;
/**
 * Strictly check if a string is a valid hex string. A valid hex string must
 * start with the "0x"-prefix.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
function isStrictHexString(value) {
    return (0, superstruct_1.is)(value, exports.StrictHexStruct);
}
exports.isStrictHexString = isStrictHexString;
/**
 * Assert that a value is a valid hex string.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
function assertIsHexString(value) {
    (0, assert_1.assert)(isHexString(value), 'Value must be a hexadecimal string.');
}
exports.assertIsHexString = assertIsHexString;
/**
 * Assert that a value is a valid hex string. A valid hex string must start with
 * the "0x"-prefix.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
function assertIsStrictHexString(value) {
    (0, assert_1.assert)(isStrictHexString(value), 'Value must be a hexadecimal string, starting with "0x".');
}
exports.assertIsStrictHexString = assertIsStrictHexString;
/**
 * Add the `0x`-prefix to a hexadecimal string. If the string already has the
 * prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to add the prefix to.
 * @returns The prefixed hexadecimal string.
 */
function add0x(hexadecimal) {
    if (hexadecimal.startsWith('0x')) {
        return hexadecimal;
    }
    if (hexadecimal.startsWith('0X')) {
        return `0x${hexadecimal.substring(2)}`;
    }
    return `0x${hexadecimal}`;
}
exports.add0x = add0x;
/**
 * Remove the `0x`-prefix from a hexadecimal string. If the string doesn't have
 * the prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to remove the prefix from.
 * @returns The un-prefixed hexadecimal string.
 */
function remove0x(hexadecimal) {
    if (hexadecimal.startsWith('0x') || hexadecimal.startsWith('0X')) {
        return hexadecimal.substring(2);
    }
    return hexadecimal;
}
exports.remove0x = remove0x;
//# sourceMappingURL=hex.js.map