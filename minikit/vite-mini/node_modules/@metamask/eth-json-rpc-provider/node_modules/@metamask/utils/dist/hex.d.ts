import { Struct } from 'superstruct';
export declare type Hex = `0x${string}`;
export declare const HexStruct: Struct<string, null>;
export declare const StrictHexStruct: Struct<`0x${string}`, null>;
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
