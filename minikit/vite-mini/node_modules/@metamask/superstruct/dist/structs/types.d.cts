import type { Infer } from "../struct.cjs";
import { ExactOptionalStruct, Struct } from "../struct.cjs";
import type { ObjectSchema, ObjectType, AnyStruct, InferStructTuple, UnionToIntersection } from "../utils.cjs";
/**
 * Ensure that any value passes validation.
 *
 * @returns A struct that will always pass validation.
 */
export declare function any(): Struct<any, null>;
/**
 * Ensure that a value is an array and that its elements are of a specific type.
 *
 * Note: If you omit the element struct, the arrays elements will not be
 * iterated at all. This can be helpful for cases where performance is critical,
 * and it is preferred to using `array(any())`.
 *
 * @param Element - The struct to validate each element in the array against.
 * @returns A new struct that will only accept arrays of the given type.
 */
export declare function array<Type extends Struct<any>>(Element: Type): Struct<Infer<Type>[], Type>;
/**
 * Ensure that a value is an array and that its elements are of a specific type.
 *
 * Note: If you omit the element struct, the arrays elements will not be
 * iterated at all. This can be helpful for cases where performance is critical,
 * and it is preferred to using `array(any())`.
 *
 * @returns A new struct that will accept any array.
 */
export declare function array(): Struct<unknown[], undefined>;
/**
 * Ensure that a value is a bigint.
 *
 * @returns A new struct that will only accept bigints.
 */
export declare function bigint(): Struct<bigint, null>;
/**
 * Ensure that a value is a boolean.
 *
 * @returns A new struct that will only accept booleans.
 */
export declare function boolean(): Struct<boolean, null>;
/**
 * Ensure that a value is a valid `Date`.
 *
 * Note: this also ensures that the value is *not* an invalid `Date` object,
 * which can occur when parsing a date fails but still returns a `Date`.
 *
 * @returns A new struct that will only accept valid `Date` objects.
 */
export declare function date(): Struct<Date, null>;
/**
 * Ensure that a value is one of a set of potential values.
 *
 * Note: after creating the struct, you can access the definition of the
 * potential values as `struct.schema`.
 *
 * @param values - The potential values that the input can be.
 * @returns A new struct that will only accept the given values.
 */
export declare function enums<Type extends number, Values extends readonly Type[]>(values: Values): Struct<Values[number], {
    [Key in Values[number]]: Key;
}>;
/**
 * Ensure that a value is one of a set of potential values.
 *
 * Note: after creating the struct, you can access the definition of the
 * potential values as `struct.schema`.
 *
 * @param values - The potential values that the input can be.
 * @returns A new struct that will only accept the given values.
 */
export declare function enums<Type extends string, Values extends readonly Type[]>(values: Values): Struct<Values[number], {
    [Key in Values[number]]: Key;
}>;
/**
 * Ensure that a value is a function.
 *
 * @returns A new struct that will only accept functions.
 */
export declare function func(): Struct<Function, null>;
/**
 * Ensure that a value is an instance of a specific class.
 *
 * @param Class - The class that the value must be an instance of.
 * @returns A new struct that will only accept instances of the given class.
 */
export declare function instance<Type extends new (...args: any) => any>(Class: Type): Struct<InstanceType<Type>, null>;
/**
 * Ensure that a value is an integer.
 *
 * @returns A new struct that will only accept integers.
 */
export declare function integer(): Struct<number, null>;
/**
 * Ensure that a value matches all of a set of types.
 *
 * @param Structs - The set of structs that the value must match.
 * @returns A new struct that will only accept values that match all of the
 * given structs.
 */
export declare function intersection<First extends AnyStruct, Rest extends AnyStruct[]>(Structs: [First, ...Rest]): Struct<Infer<First> & UnionToIntersection<InferStructTuple<Rest>[number]>, null>;
/**
 * Ensure that a value is an exact value, using `===` for comparison.
 *
 * @param constant - The exact value that the input must be.
 * @returns A new struct that will only accept the exact given value.
 */
export declare function literal<Type extends boolean>(constant: Type): Struct<Type, Type>;
/**
 * Ensure that a value is an exact value, using `===` for comparison.
 *
 * @param constant - The exact value that the input must be.
 * @returns A new struct that will only accept the exact given value.
 */
export declare function literal<Type extends number>(constant: Type): Struct<Type, Type>;
/**
 * Ensure that a value is an exact value, using `===` for comparison.
 *
 * @param constant - The exact value that the input must be.
 * @returns A new struct that will only accept the exact given value.
 */
export declare function literal<Type extends string>(constant: Type): Struct<Type, Type>;
/**
 * Ensure that a value is an exact value, using `===` for comparison.
 *
 * @param constant - The exact value that the input must be.
 * @returns A new struct that will only accept the exact given value.
 */
export declare function literal<Type>(constant: Type): Struct<Type, null>;
/**
 * Ensure that a value is a `Map` object, and that its keys and values are of
 * specific types.
 *
 * @returns A new struct that will only accept `Map` objects.
 */
export declare function map(): Struct<Map<unknown, unknown>, null>;
/**
 * Ensure that a value is a `Map` object, and that its keys and values are of
 * specific types.
 *
 * @param Key - The struct to validate each key in the map against.
 * @param Value - The struct to validate each value in the map against.
 * @returns A new struct that will only accept `Map` objects.
 */
export declare function map<Key, Value>(Key: Struct<Key>, Value: Struct<Value>): Struct<Map<Key, Value>, null>;
/**
 * Ensure that no value ever passes validation.
 *
 * @returns A new struct that will never pass validation.
 */
export declare function never(): Struct<never, null>;
/**
 * Augment an existing struct to allow `null` values.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will accept `null` values.
 */
export declare function nullable<Type, Schema>(struct: Struct<Type, Schema>): Struct<Type | null, Schema>;
/**
 * Ensure that a value is a number.
 *
 * @returns A new struct that will only accept numbers.
 */
export declare function number(): Struct<number, null>;
/**
 * Ensure that a value is an object, that it has a known set of properties,
 * and that its properties are of specific types.
 *
 * Note: Unrecognized properties will fail validation.
 *
 * @returns A new struct that will only accept objects.
 */
export declare function object(): Struct<Record<string, unknown>, null>;
/**
 * Ensure that a value is an object, that it has a known set of properties,
 * and that its properties are of specific types.
 *
 * Note: Unrecognized properties will fail validation.
 *
 * @param schema - An object that defines the structure of the object.
 * @returns A new struct that will only accept objects.
 */
export declare function object<Schema extends ObjectSchema>(schema: Schema): Struct<ObjectType<Schema>, Schema>;
/**
 * Augment a struct to allow `undefined` values.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will accept `undefined` values.
 */
export declare function optional<Type, Schema>(struct: Struct<Type, Schema>): Struct<Type | undefined, Schema>;
/**
 * Augment a struct such that, if it is the property of an object, it is exactly optional.
 * In other words, it is either present with the correct type, or not present at all.
 *
 * NOTE: Only intended for use with `object()` structs.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that can be used to create exactly optional properties of `object()`
 * structs.
 */
export declare function exactOptional<Type, Schema>(struct: Struct<Type, Schema>): ExactOptionalStruct<Type, Schema>;
/**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */
/**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * @param Key - The struct to validate each key in the record against.
 * @param Value - The struct to validate each value in the record against.
 * @returns A new struct that will only accept objects.
 */
export declare function record<Key extends string, Value>(Key: Struct<Key>, Value: Struct<Value>): Struct<Record<Key, Value>, null>;
/**
 * Ensure that a value is a `RegExp`.
 *
 * Note: this does not test the value against the regular expression! For that
 * you need to use the `pattern()` refinement.
 *
 * @returns A new struct that will only accept `RegExp` objects.
 */
export declare function regexp(): Struct<RegExp, null>;
/**
 * Ensure that a value is a `Set` object, and that its elements are of a
 * specific type.
 *
 * @returns A new struct that will only accept `Set` objects.
 */
export declare function set(): Struct<Set<unknown>, null>;
/**
 * Ensure that a value is a `Set` object, and that its elements are of a
 * specific type.
 *
 * @param Element - The struct to validate each element in the set against.
 * @returns A new struct that will only accept `Set` objects.
 */
export declare function set<Type>(Element: Struct<Type>): Struct<Set<Type>, null>;
/**
 * Ensure that a value is a string.
 *
 * @returns A new struct that will only accept strings.
 */
export declare function string(): Struct<string, null>;
/**
 * Ensure that a value is a tuple of a specific length, and that each of its
 * elements is of a specific type.
 *
 * @param Structs - The set of structs that the value must match.
 * @returns A new struct that will only accept tuples of the given types.
 */
export declare function tuple<First extends AnyStruct, Rest extends AnyStruct[]>(Structs: [First, ...Rest]): Struct<[Infer<First>, ...InferStructTuple<Rest>], null>;
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 *
 * @param schema - An object that defines the structure of the object.
 * @returns A new struct that will only accept objects.
 */
export declare function type<Schema extends ObjectSchema>(schema: Schema): Struct<ObjectType<Schema>, Schema>;
/**
 * Ensure that a value matches one of a set of types.
 *
 * @param Structs - The set of structs that the value must match.
 * @returns A new struct that will only accept values that match one of the
 * given structs.
 */
export declare function union<First extends AnyStruct, Rest extends AnyStruct[]>(Structs: [First, ...Rest]): Struct<Infer<First> | InferStructTuple<Rest>[number], null>;
/**
 * Ensure that any value passes validation, without widening its type to `any`.
 *
 * @returns A struct that will always pass validation.
 */
export declare function unknown(): Struct<unknown, null>;
//# sourceMappingURL=types.d.cts.map