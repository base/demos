import { pattern, string } from "@metamask/superstruct";
import { keccak_256 as keccak256 } from "@noble/hashes/sha3";
import $lodash from "lodash";
const { memoize } = $lodash;
import { assert } from "./assert.mjs";
// Use native regexes instead of superstruct for maximum performance.
// Pre-compiled regex for maximum performance - avoids recompilation on each call
const HEX_REGEX = /^(?:0x)?[0-9a-f]+$/iu;
const STRICT_HEX_REGEX = /^0x[0-9a-f]+$/iu;
const HEX_ADDRESS_REGEX = /^0x[0-9a-f]{40}$/u;
const HEX_CHECKSUM_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/u;
export const HexStruct = pattern(string(), HEX_REGEX);
export const StrictHexStruct = pattern(string(), STRICT_HEX_REGEX);
export const HexAddressStruct = pattern(string(), HEX_ADDRESS_REGEX);
export const HexChecksumAddressStruct = pattern(string(), HEX_CHECKSUM_ADDRESS_REGEX);
const isString = (value) => typeof value === 'string';
/**
 * Check if a string is a valid hex string.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
export function isHexString(value) {
    return isString(value) && HEX_REGEX.test(value);
}
/**
 * Strictly check if a string is a valid hex string. A valid hex string must
 * start with the "0x"-prefix.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
export function isStrictHexString(value) {
    return isString(value) && STRICT_HEX_REGEX.test(value);
}
/**
 * Check if a string is a valid hex address.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex address.
 */
export function isHexAddress(value) {
    return isString(value) && HEX_ADDRESS_REGEX.test(value);
}
/**
 * Check if a string is a valid hex checksum address.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex checksum address.
 */
export function isHexChecksumAddress(value) {
    return isString(value) && HEX_CHECKSUM_ADDRESS_REGEX.test(value);
}
/**
 * Assert that a value is a valid hex string.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
export function assertIsHexString(value) {
    assert(isHexString(value), 'Value must be a hexadecimal string.');
}
/**
 * Assert that a value is a valid hex string. A valid hex string must start with
 * the "0x"-prefix.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
export function assertIsStrictHexString(value) {
    assert(isStrictHexString(value), 'Value must be a hexadecimal string, starting with "0x".');
}
/**
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 * This is the unmemoized version, primarily used for testing.
 *
 * @param hexAddress - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
export function getChecksumAddressUnmemoized(hexAddress) {
    assert(isHexChecksumAddress(hexAddress), 'Invalid hex address.');
    const address = remove0x(hexAddress).toLowerCase();
    const hashBytes = keccak256(address);
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
/**
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 * This function is memoized for performance.
 *
 * @param hexAddress - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
export const getChecksumAddress = memoize(getChecksumAddressUnmemoized);
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
export function isValidChecksumAddressUnmemoized(possibleChecksum) {
    if (!isHexChecksumAddress(possibleChecksum)) {
        return false;
    }
    return getChecksumAddress(possibleChecksum) === possibleChecksum;
}
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
export const isValidChecksumAddress = memoize(isValidChecksumAddressUnmemoized);
/**
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
export function isValidHexAddressUnmemoized(possibleAddress) {
    return (isHexAddress(possibleAddress) || isValidChecksumAddress(possibleAddress));
}
/**
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
export const isValidHexAddress = memoize(isValidHexAddressUnmemoized);
/**
 * Add the `0x`-prefix to a hexadecimal string. If the string already has the
 * prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to add the prefix to.
 * @returns The prefixed hexadecimal string.
 */
export function add0x(hexadecimal) {
    if (hexadecimal.startsWith('0x')) {
        return hexadecimal;
    }
    if (hexadecimal.startsWith('0X')) {
        return `0x${hexadecimal.substring(2)}`;
    }
    return `0x${hexadecimal}`;
}
/**
 * Remove the `0x`-prefix from a hexadecimal string. If the string doesn't have
 * the prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to remove the prefix from.
 * @returns The un-prefixed hexadecimal string.
 */
export function remove0x(hexadecimal) {
    if (hexadecimal.startsWith('0x') || hexadecimal.startsWith('0X')) {
        return hexadecimal.substring(2);
    }
    return hexadecimal;
}
//# sourceMappingURL=hex.mjs.map