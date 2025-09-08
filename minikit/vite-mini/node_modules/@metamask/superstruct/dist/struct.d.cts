import type { Failure } from "./error.cjs";
import { StructError } from "./error.cjs";
import type { StructSchema } from "./utils.cjs";
declare type StructParams<Type, Schema> = {
    type: string;
    schema: Schema;
    coercer?: Coercer | undefined;
    validator?: Validator | undefined;
    refiner?: Refiner<Type> | undefined;
    entries?: Struct<Type, Schema>['entries'] | undefined;
};
/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */
export declare class Struct<Type = unknown, Schema = unknown> {
    readonly TYPE: Type;
    type: string;
    schema: Schema;
    coercer: (value: unknown, context: Context) => unknown;
    validator: (value: unknown, context: Context) => Iterable<Failure>;
    refiner: (value: Type, context: Context) => Iterable<Failure>;
    entries: (value: unknown, context: Context) => Iterable<[string | number, unknown, Struct<any> | Struct<never>]>;
    constructor(props: StructParams<Type, Schema>);
    /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */
    assert(value: unknown, message?: string): asserts value is Type;
    /**
     * Create a value with the struct's coercion logic, then validate it.
     */
    create(value: unknown, message?: string): Type;
    /**
     * Check if a value passes the struct's validation.
     */
    is(value: unknown): value is Type;
    /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema.
     */
    mask(value: unknown, message?: string): Type;
    /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `withCoercion` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful.
     */
    validate(value: unknown, options?: {
        coerce?: boolean;
        message?: string;
    }): [StructError, undefined] | [undefined, Type];
}
declare const ExactOptionalBrand = "EXACT_OPTIONAL";
/**
 * An `ExactOptionalStruct` is a `Struct` that is used to create exactly optional
 * properties of `object()` structs.
 */
export declare class ExactOptionalStruct<Type = unknown, Schema = unknown> extends Struct<Type, Schema> {
    readonly brand: typeof ExactOptionalBrand;
    constructor(props: StructParams<Type, Schema>);
    static isExactOptional(value: unknown): value is ExactOptionalStruct;
}
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 *
 * @param value - The value to validate.
 * @param struct - The struct to validate against.
 * @param message - An optional message to include in the error.
 */
export declare function assert<Type, Schema>(value: unknown, struct: Struct<Type, Schema>, message?: string): asserts value is Type;
/**
 * Create a value with the coercion logic of struct and validate it.
 *
 * @param value - The value to coerce and validate.
 * @param struct - The struct to validate against.
 * @param message - An optional message to include in the error.
 * @returns The coerced and validated value.
 */
export declare function create<Type, Schema>(value: unknown, struct: Struct<Type, Schema>, message?: string): Type;
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 *
 * @param value - The value to mask.
 * @param struct - The struct to mask against.
 * @param message - An optional message to include in the error.
 * @returns The masked value.
 */
export declare function mask<Type, Schema>(value: unknown, struct: Struct<Type, Schema>, message?: string): Type;
/**
 * Check if a value passes a struct.
 *
 * @param value - The value to validate.
 * @param struct - The struct to validate against.
 * @returns `true` if the value passes the struct, `false` otherwise.
 */
export declare function is<Type, Schema>(value: unknown, struct: Struct<Type, Schema>): value is Type;
/**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 *
 * @param value - The value to validate.
 * @param struct - The struct to validate against.
 * @param options - Optional settings.
 * @param options.coerce - Whether to coerce the value before validating it.
 * @param options.mask - Whether to mask the value before validating it.
 * @param options.message - An optional message to include in the error.
 * @returns A tuple containing the error (if invalid) and the validated value.
 */
export declare function validate<Type, Schema>(value: unknown, struct: Struct<Type, Schema>, options?: {
    coerce?: boolean | undefined;
    mask?: boolean | undefined;
    message?: string | undefined;
}): [StructError, undefined] | [undefined, Type];
/**
 * A `Context` contains information about the current location of the
 * validation inside the initial input value.
 */
export declare type Context = {
    branch: any[];
    path: any[];
};
/**
 * A type utility to extract the type from a `Struct` class.
 */
export declare type Infer<StructType extends Struct<any, any>> = StructType['TYPE'];
/**
 * A type utility to describe that a struct represents a TypeScript type.
 */
export declare type Describe<Type> = Struct<Type, StructSchema<Type>>;
/**
 * A `Result` is returned from validation functions.
 */
export declare type Result = boolean | string | Partial<Failure> | Iterable<boolean | string | Partial<Failure>>;
/**
 * A `Coercer` takes an unknown value and optionally coerces it.
 */
export declare type Coercer<Type = unknown> = (value: Type, context: Context) => unknown;
/**
 * A `Validator` takes an unknown value and validates it.
 */
export declare type Validator = (value: unknown, context: Context) => Result;
/**
 * A `Refiner` takes a value of a known type and validates it against a further
 * constraint.
 */
export declare type Refiner<Type> = (value: Type, context: Context) => Result;
export {};
//# sourceMappingURL=struct.d.cts.map