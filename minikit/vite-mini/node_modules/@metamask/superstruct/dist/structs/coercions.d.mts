import type { Coercer } from "../struct.mjs";
import { Struct } from "../struct.mjs";
/**
 * Augment a `Struct` to add an additional coercion step to its input.
 *
 * This allows you to transform input data before validating it, to increase the
 * likelihood that it passes validation—for example for default values, parsing
 * different formats, etc.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 *
 * @param struct - The struct to augment.
 * @param condition - A struct that the input must pass to be coerced.
 * @param coercer - A function that takes the input and returns the coerced
 * value.
 * @returns A new struct that will coerce its input before validating it.
 */
export declare function coerce<Type, Schema, CoercionType>(struct: Struct<Type, Schema>, condition: Struct<CoercionType, any>, coercer: Coercer<CoercionType>): Struct<Type, Schema>;
/**
 * Augment a struct to replace `undefined` values with a default.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 *
 * @param struct - The struct to augment.
 * @param fallback - The value to use when the input is `undefined`.
 * @param options - An optional options object.
 * @param options.strict - When `true`, the fallback will only be used when the
 * input is `undefined`. When `false`, the fallback will be used when the input
 * is `undefined` or when the input is a plain object and the fallback is a
 * plain object, and any keys in the fallback are missing from the input.
 * @returns A new struct that will replace `undefined` inputs with a default.
 */
export declare function defaulted<Type, Schema>(struct: Struct<Type, Schema>, fallback: any, options?: {
    strict?: boolean | undefined;
}): Struct<Type, Schema>;
/**
 * Augment a struct to trim string inputs.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will trim string inputs before validating them.
 */
export declare function trimmed<Type, Schema>(struct: Struct<Type, Schema>): Struct<Type, Schema>;
//# sourceMappingURL=coercions.d.mts.map