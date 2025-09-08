import type { Failure } from "./error.cjs";
import type { Struct, Infer, Result, Context, Describe, ExactOptionalStruct } from "./struct.cjs";
/**
 * Check if a value is a plain object.
 *
 * @param value - The value to check.
 * @returns Whether the value is a plain object.
 */
export declare function isObject(value: unknown): value is Record<PropertyKey, unknown>;
/**
 * Check if a value is a plain object.
 *
 * @param value - The value to check.
 * @returns Whether the value is a plain object.
 */
export declare function isPlainObject(value: unknown): value is {
    [key: string]: any;
};
/**
 * Return a value as a printable string.
 *
 * @param value - The value to print.
 * @returns The value as a string.
 */
export declare function print(value: any): string;
/**
 * Shift (remove and return) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 *
 * @param input - The iterator to shift.
 * @returns The first value of the iterator, or `undefined` if the iterator is
 * empty.
 */
export declare function shiftIterator<Type>(input: Iterator<Type>): Type | undefined;
/**
 * Convert a single validation result to a failure.
 *
 * @param result - The result to convert.
 * @param context - The context of the validation.
 * @param struct - The struct being validated.
 * @param value - The value being validated.
 * @returns A failure if the result is a failure, or `undefined` if the result
 * is a success.
 */
export declare function toFailure<Type, Schema>(result: string | boolean | Partial<Failure>, context: Context, struct: Struct<Type, Schema>, value: any): Failure | undefined;
/**
 * Convert a validation result to an iterable of failures.
 *
 * @param result - The result to convert.
 * @param context - The context of the validation.
 * @param struct - The struct being validated.
 * @param value - The value being validated.
 * @yields The failures.
 * @returns An iterable of failures.
 */
export declare function toFailures<Type, Schema>(result: Result, context: Context, struct: Struct<Type, Schema>, value: any): IterableIterator<Failure>;
/**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 *
 * @param value - The value to check.
 * @param struct - The struct to check against.
 * @param options - Optional settings.
 * @param options.path - The path to the value in the input data.
 * @param options.branch - The branch of the value in the input data.
 * @param options.coerce - Whether to coerce the value before validating it.
 * @param options.mask - Whether to mask the value before validating it.
 * @param options.message - An optional message to include in the error.
 * @yields An iterator of failures or success.
 * @returns An iterator of failures or success.
 */
export declare function run<Type, Schema>(value: unknown, struct: Struct<Type, Schema>, options?: {
    path?: any[] | undefined;
    branch?: any[] | undefined;
    coerce?: boolean | undefined;
    mask?: boolean | undefined;
    message?: string | undefined;
}): IterableIterator<[Failure, undefined] | [undefined, Type]>;
/**
 * Convert a union of type to an intersection.
 */
export declare type UnionToIntersection<Union> = (Union extends any ? (arg: Union) => any : never) extends (arg: infer Type) => void ? Type : never;
/**
 * Assign properties from one type to another, overwriting existing.
 */
export declare type Assign<Type, OtherType> = Simplify<OtherType & Omit<Type, keyof OtherType>>;
/**
 * A schema for enum structs.
 */
export declare type EnumSchema<Type extends string | number | undefined | null> = {
    [Key in NonNullable<Type>]: Key;
};
/**
 * Check if a type is a match for another whilst treating overlapping
 * unions as a match.
 */
export declare type IsMatch<Type, OtherType> = Type extends OtherType ? OtherType extends Type ? Type : never : never;
/**
 * Check if a type is an exact match.
 */
export declare type IsExactMatch<Type, OtherType> = (<Inner>() => Inner extends Type ? 1 : 2) extends <Inner>() => Inner extends OtherType ? 1 : 2 ? Type : never;
/**
 * Check if a type is a record type.
 */
export declare type IsRecord<Type> = Type extends object ? string extends keyof Type ? Type : never : never;
/**
 * Check if a type is a tuple.
 */
export declare type IsTuple<Type> = Type extends [any] ? Type : Type extends [any, any] ? Type : Type extends [any, any, any] ? Type : Type extends [any, any, any, any] ? Type : Type extends [any, any, any, any, any] ? Type : never;
/**
 * Check if a type is a union.
 */
export declare type IsUnion<Type, Union extends Type = Type> = (Type extends any ? (Union extends Type ? false : true) : false) extends false ? never : Type;
/**
 * A schema for object structs.
 */
export declare type ObjectSchema = Record<string, Struct<any, any>>;
/**
 * Infer a type from an object struct schema.
 */
export declare type ObjectType<Schema extends ObjectSchema> = Simplify<Optionalize<ExactOptionalize<Schema>>>;
/**
 * Make properties of `exactOptional()` structs optional.
 */
export declare type ExactOptionalize<Schema extends ObjectSchema> = {
    [K in keyof OmitExactOptional<Schema>]: Infer<OmitExactOptional<Schema>[K]>;
} & {
    [K in keyof PickExactOptional<Schema>]?: Infer<PickExactOptional<Schema>[K]>;
};
declare type OmitExactOptional<Schema extends ObjectSchema> = Omit<Schema, {
    [K in keyof Schema]: Schema[K] extends ExactOptionalStruct<any, any> ? Schema[K] extends never ? never : K : never;
}[keyof Schema]>;
declare type PickExactOptional<Schema extends ObjectSchema> = Pick<Schema, {
    [K in keyof Schema]: Schema[K] extends ExactOptionalStruct<any, any> ? Schema[K] extends never ? never : K : never;
}[keyof Schema]>;
/**
 * Make properties that can have the value `undefined` optional.
 */
export declare type Optionalize<Schema extends object> = OmitBy<Schema, undefined> & Partial<PickBy<Schema, undefined>>;
/**
 * Omit properties from a type that extend from a specific type.
 */
export declare type OmitBy<Type, Value> = Omit<Type, {
    [Key in keyof Type]: Value extends Extract<Type[Key], Value> ? Key : never;
}[keyof Type]>;
/**
 * Pick properties from a type that extend from a specific type.
 */
export declare type PickBy<Type, Value> = Pick<Type, {
    [Key in keyof Type]: Value extends Extract<Type[Key], Value> ? Key : never;
}[keyof Type]>;
/**
 * Transform an object schema type to represent a partial.
 */
export declare type PartialObjectSchema<Schema extends ObjectSchema> = {
    [K in keyof Schema]: Struct<Infer<Schema[K]> | undefined>;
};
/**
 * Simplifies a type definition to its most basic representation.
 */
export declare type Simplify<Type> = Type extends any[] | Date ? Type : // eslint-disable-next-line @typescript-eslint/ban-types
{
    [Key in keyof Type]: Type[Key];
} & {};
export declare type If<Condition extends boolean, Then, Else> = Condition extends true ? Then : Else;
/**
 * A schema for any type of struct.
 */
export declare type StructSchema<Type> = [Type] extends [string | undefined | null] ? [Type] extends [IsMatch<Type, string | undefined | null>] ? null : [Type] extends [IsUnion<Type>] ? EnumSchema<Type> : Type : [Type] extends [number | undefined | null] ? [Type] extends [IsMatch<Type, number | undefined | null>] ? null : [Type] extends [IsUnion<Type>] ? EnumSchema<Type> : Type : [Type] extends [boolean] ? [Type] extends [IsExactMatch<Type, boolean>] ? null : Type : Type extends bigint | symbol | undefined | null | Function | Date | Error | RegExp | Map<any, any> | WeakMap<any, any> | Set<any> | WeakSet<any> | Promise<any> ? null : Type extends (infer Inner)[] ? Type extends IsTuple<Type> ? null : Struct<Inner> : Type extends object ? Type extends IsRecord<Type> ? null : {
    [K in keyof Type]: Describe<Type[K]>;
} : null;
/**
 * A schema for tuple structs.
 */
export declare type TupleSchema<Type> = {
    [K in keyof Type]: Struct<Type[K]>;
};
/**
 * Shorthand type for matching any `Struct`.
 */
export declare type AnyStruct = Struct<any, any>;
/**
 * Infer a tuple of types from a tuple of `Struct`s.
 *
 * This is used to recursively retrieve the type from `union` `intersection` and
 * `tuple` structs.
 */
export declare type InferStructTuple<Tuple extends AnyStruct[], Length extends number = Tuple['length']> = Length extends Length ? number extends Length ? Tuple : InferTuple<Tuple, Length, []> : never;
declare type InferTuple<Tuple extends AnyStruct[], Length extends number, Accumulated extends unknown[], Index extends number = Accumulated['length']> = Index extends Length ? Accumulated : InferTuple<Tuple, Length, [...Accumulated, Infer<Tuple[Index]>]>;
export {};
//# sourceMappingURL=utils.d.cts.map