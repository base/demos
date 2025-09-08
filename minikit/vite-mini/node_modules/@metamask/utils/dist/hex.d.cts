/// <reference types="lodash" />
import { type Struct } from "@metamask/superstruct";
export type Hex = `0x${string}`;
export declare const HexStruct: Struct<string, null>;
export declare const StrictHexStruct: Struct<`0x${string}`, null>;
export declare const HexAddressStruct: Struct<`0x${string}`, null>;
export declare const HexChecksumAddressStruct: Struct<`0x${string}`, null>;
/**
 * Check if a string is a valid hex string.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
export declare function isHexString(value: unknown): value is string;
/**
 * Strictly check if a string is a valid hex string. A valid hex string must
 * start with the "0x"-prefix.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex string.
 */
export declare function isStrictHexString(value: unknown): value is Hex;
/**
 * Check if a string is a valid hex address.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex address.
 */
export declare function isHexAddress(value: unknown): value is Hex;
/**
 * Check if a string is a valid hex checksum address.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid hex checksum address.
 */
export declare function isHexChecksumAddress(value: unknown): value is Hex;
/**
 * Assert that a value is a valid hex string.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
export declare function assertIsHexString(value: unknown): asserts value is string;
/**
 * Assert that a value is a valid hex string. A valid hex string must start with
 * the "0x"-prefix.
 *
 * @param value - The value to check.
 * @throws If the value is not a valid hex string.
 */
export declare function assertIsStrictHexString(value: unknown): asserts value is Hex;
/**
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 * This is the unmemoized version, primarily used for testing.
 *
 * @param hexAddress - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
export declare function getChecksumAddressUnmemoized(hexAddress: Hex): Hex;
/**
 * Encode a passed hex string as an ERC-55 mixed-case checksum address.
 * This function is memoized for performance.
 *
 * @param hexAddress - The hex address to encode.
 * @returns The address encoded according to ERC-55.
 * @see https://eips.ethereum.org/EIPS/eip-55
 */
export declare const getChecksumAddress: typeof getChecksumAddressUnmemoized & import("lodash").MemoizedFunction;
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
export declare function isValidChecksumAddressUnmemoized(possibleChecksum: Hex): boolean;
/**
 * Validate that the passed hex string is a valid ERC-55 mixed-case
 * checksum address.
 *
 * @param possibleChecksum - The hex address to check.
 * @returns True if the address is a checksum address.
 */
export declare const isValidChecksumAddress: typeof isValidChecksumAddressUnmemoized & import("lodash").MemoizedFunction;
/**
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
export declare function isValidHexAddressUnmemoized(possibleAddress: Hex): boolean;
/**
 * Validate that the passed prefixed hex string is an all-lowercase
 * hex address, or a valid mixed-case checksum address.
 *
 * @param possibleAddress - Input parameter to check against.
 * @returns Whether or not the input is a valid hex address.
 */
export declare const isValidHexAddress: typeof isValidHexAddressUnmemoized & import("lodash").MemoizedFunction;
/**
 * Add the `0x`-prefix to a hexadecimal string. If the string already has the
 * prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to add the prefix to.
 * @returns The prefixed hexadecimal string.
 */
export declare function add0x(hexadecimal: string): Hex;
/**
 * Remove the `0x`-prefix from a hexadecimal string. If the string doesn't have
 * the prefix, it is returned as-is.
 *
 * @param hexadecimal - The hexadecimal string to remove the prefix from.
 * @returns The un-prefixed hexadecimal string.
 */
export declare function remove0x(hexadecimal: string): string;
//# sourceMappingURL=hex.d.cts.map