import type { Refiner } from "../struct.cjs";
import { Struct } from "../struct.cjs";
/**
 * Ensure that a string, array, map, or set is empty.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will only accept empty values.
 */
export declare function empty<Type extends string | any[] | Map<any, any> | Set<any>, Schema>(struct: Struct<Type, Schema>): Struct<Type, Schema>;
/**
 * Ensure that a number or date is below a threshold.
 *
 * @param struct - The struct to augment.
 * @param threshold - The maximum value that the input can be.
 * @param options - An optional options object.
 * @param options.exclusive - When `true`, the input must be strictly less than
 * the threshold. When `false`, the input must be less than or equal to the
 * threshold.
 * @returns A new struct that will only accept values below the threshold.
 */
export declare function max<Type extends number | Date, Schema>(struct: Struct<Type, Schema>, threshold: Type, options?: {
    exclusive?: boolean | undefined;
}): Struct<Type, Schema>;
/**
 * Ensure that a number or date is above a threshold.
 *
 * @param struct - The struct to augment.
 * @param threshold - The minimum value that the input can be.
 * @param options - An optional options object.
 * @param options.exclusive - When `true`, the input must be strictly greater
 * than the threshold. When `false`, the input must be greater than or equal to
 * the threshold.
 * @returns A new struct that will only accept values above the threshold.
 */
export declare function min<Type extends number | Date, Schema>(struct: Struct<Type, Schema>, threshold: Type, options?: {
    exclusive?: boolean | undefined;
}): Struct<Type, Schema>;
/**
 * Ensure that a string, array, map or set is not empty.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will only accept non-empty values.
 */
export declare function nonempty<Type extends string | any[] | Map<any, any> | Set<any>, Schema>(struct: Struct<Type, Schema>): Struct<Type, Schema>;
/**
 * Ensure that a string matches a regular expression.
 *
 * @param struct - The struct to augment.
 * @param regexp - The regular expression to match against.
 * @returns A new struct that will only accept strings matching the regular
 * expression.
 */
export declare function pattern<Type extends string, Schema>(struct: Struct<Type, Schema>, regexp: RegExp): Struct<Type, Schema>;
/**
 * Ensure that a string, array, number, date, map, or set has a size (or length,
 * or time) between `min` and `max`.
 *
 * @param struct - The struct to augment.
 * @param minimum - The minimum size that the input can be.
 * @param maximum - The maximum size that the input can be.
 * @returns A new struct that will only accept values within the given size
 * range.
 */
export declare function size<Type extends string | number | Date | any[] | Map<any, any> | Set<any>, Schema>(struct: Struct<Type, Schema>, minimum: number, maximum?: number): Struct<Type, Schema>;
/**
 * Augment a `Struct` to add an additional refinement to the validation.
 *
 * The refiner function is guaranteed to receive a value of the struct's type,
 * because the struct's existing validation will already have passed. This
 * allows you to layer additional validation on top of existing structs.
 *
 * @param struct - The struct to augment.
 * @param name - The name of the refinement.
 * @param refiner - The refiner function.
 * @returns A new struct that will run the refiner function after the existing
 * validation.
 */
export declare function refine<Type, Schema>(struct: Struct<Type, Schema>, name: string, refiner: Refiner<Type>): Struct<Type, Schema>;
//# sourceMappingURL=refinements.d.cts.map