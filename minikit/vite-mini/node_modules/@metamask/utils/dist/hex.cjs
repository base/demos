"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove0x = exports.add0x = exports.isValidHexAddress = exports.isValidHexAddressUnmemoized = exports.isValidChecksumAddress = exports.isValidChecksumAddressUnmemoized = exports.getChecksumAddress = exports.getChecksumAddressUnmemoized = exports.assertIsStrictHexString = exports.assertIsHexString = exports.isHexChecksumAddress = exports.isHexAddress = exports.isStrictHexString = exports.isHexString = exports.HexChecksumAddressStruct = exports.HexAddressStruct = exports.StrictHexStruct = exports.HexStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const sha3_1 = require("@noble/hashes/sha3");
const lodash_1 = require("lodash");
const assert_1 = require("./assert.cjs");
// Use native regexes instead of superstruct for maximum performance.
// Pre-compiled regex for maximum performance - avoids recompilation on each call
const HEX_REGEX = /^(?:0x)?[0-9a-f]+$/iu;
const STRICT_HEX_REGEX = /^0x[0-9a-f]+$/iu;
const HEX_ADDRESS_REGEX = /^0x[0-9a-f]{40}$/u;
const HEX_CHECKSUM_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/u;
exports.HexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), HEX_REGEX);
exports.StrictHexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), STRICT_HEX_REGEX);
exports.HexAddressStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), HEX_ADDRESS_REGEX);
exports.HexChecksumAddressStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), HEX_CHECKSUM_ADDRESS_REGEX);
const isString = (value) => typeof value === 'string';
/**
 * Check if a string is a valid hex string.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
function isHexString(value) {
    return isString(value) && HEX_REGEX.test(value);
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
    return isString(value) && STRICT_HEX_REGEX.test(value);
}
exports.isStrictHexString = isStrictHexString;
/**
 * Check if a string is a valid hex address.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex address.
 */
function isHexAddress(value) {
    return isString(value) && HEX_ADDRESS_REGEX.test(value);
}
exports.isHexAddress = isHexAddress;
/**
 * Check if a string is a valid hex checksum address.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex checksum address.
 */
function isHexChecksumAddress(value) {
    return isString(value) && HEX_CHECKSUM_ADDRESS_REGEX.test(value);
}
exports.isHexChecksumAddress = isHexChecksumAddress;
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
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 * This is the unmemoized version, primarily used for testing.
 *
 * @param hexAddress - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
function getChecksumAddressUnmemoized(hexAddress) {
    (0, assert_1.assert)(isHexChecksumAddress(hexAddress), 'Invalid hex address.');
    const address = remove0x(hexAddress).toLowerCase();
    const hashBytes = (0, sha3_1.keccak_256)(address);
    const { length } = address;
    const result = new Array(length); // Pre-allocate array
    for (let i = 0; i < length; i++) {
        /* eslint-disable no-bitwise */
        const byteIndex = i >> 1; // Faster than Math.floor(i / 2)
        const nibbleIndex = i & 1; // Faster than i % 2
        const byte = hashBytes[byteIndex];
        const nibble = nibbleIndex === 0 ? byte >> 4 : byte & 0x0f;
        /* eslint-enable no-bitwise */
        result[i] = nibble >= 8 ? address[i].toUpperCase() : address[i];
    }
    return `0x${result.join('')}`;
}
exports.getChecksumAddressUnmemoized = getChecksumAddressUnmemoized;
/**
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 * This function is memoized for performance.
 *
 * @param hexAddress - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
exports.getChecksumAddress = (0, lodash_1.memoize)(getChecksumAddressUnmemoized);
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
function isValidChecksumAddressUnmemoized(possibleChecksum) {
    if (!isHexChecksumAddress(possibleChecksum)) {
        return false;
    }
    return (0, exports.getChecksumAddress)(possibleChecksum) === possibleChecksum;
}
exports.isValidChecksumAddressUnmemoized = isValidChecksumAddressUnmemoized;
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
exports.isValidChecksumAddress = (0, lodash_1.memoize)(isValidChecksumAddressUnmemoized);
/**
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
function isValidHexAddressUnmemoized(possibleAddress) {
    return (isHexAddress(possibleAddress) || (0, exports.isValidChecksumAddress)(possibleAddress));
}
exports.isValidHexAddressUnmemoized = isValidHexAddressUnmemoized;
/**
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
exports.isValidHexAddress = (0, lodash_1.memoize)(isValidHexAddressUnmemoized);
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
//# sourceMappingURL=hex.cjs.map