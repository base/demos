"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove0x = exports.add0x = exports.isValidChecksumAddress = exports.getChecksumAddress = exports.isValidHexAddress = exports.assertIsStrictHexString = exports.assertIsHexString = exports.isStrictHexString = exports.isHexString = exports.HexChecksumAddressStruct = exports.HexAddressStruct = exports.StrictHexStruct = exports.HexStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const sha3_1 = require("@noble/hashes/sha3");
const assert_1 = require("./assert.cjs");
const bytes_1 = require("./bytes.cjs");
exports.HexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^(?:0x)?[0-9a-f]+$/iu);
exports.StrictHexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^0x[0-9a-f]+$/iu);
exports.HexAddressStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^0x[0-9a-f]{40}$/u);
exports.HexChecksumAddressStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^0x[0-9a-fA-F]{40}$/u);
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
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
function isValidHexAddress(possibleAddress) {
    return ((0, superstruct_1.is)(possibleAddress, exports.HexAddressStruct) ||
        isValidChecksumAddress(possibleAddress));
}
exports.isValidHexAddress = isValidHexAddress;
/**
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 *
 * @param address - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
function getChecksumAddress(address) {
    (0, assert_1.assert)((0, superstruct_1.is)(address, exports.HexChecksumAddressStruct), 'Invalid hex address.');
    const unPrefixed = remove0x(address.toLowerCase());
    const unPrefixedHash = remove0x((0, bytes_1.bytesToHex)((0, sha3_1.keccak_256)(unPrefixed)));
    return `0x${unPrefixed
        .split('')
        .map((character, nibbleIndex) => {
        const hashCharacter = unPrefixedHash[nibbleIndex];
        (0, assert_1.assert)((0, superstruct_1.is)(hashCharacter, (0, superstruct_1.string)()), 'Hash shorter than address.');
        return parseInt(hashCharacter, 16) > 7
            ? character.toUpperCase()
            : character;
    })
        .join('')}`;
}
exports.getChecksumAddress = getChecksumAddress;
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
function isValidChecksumAddress(possibleChecksum) {
    if (!(0, superstruct_1.is)(possibleChecksum, exports.HexChecksumAddressStruct)) {
        return false;
    }
    return getChecksumAddress(possibleChecksum) === possibleChecksum;
}
exports.isValidChecksumAddress = isValidChecksumAddress;
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