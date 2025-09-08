import type { Context, Validator } from "../struct.mjs";
import { Struct } from "../struct.mjs";
import type { Assign, ObjectSchema, ObjectType, PartialObjectSchema } from "../utils.mjs";
/**
 * Create a new struct that combines the properties from multiple object or type
 * structs. Its return type will match the first parameter's type.
 *
 * Like JavaScript's `Object.assign` utility.
 *
 * @param First - The first struct to combine.
 * @param Second - The second struct to combine.
 * @returns A new struct that combines the properties of the input structs.
 */
export declare function assign<First extends ObjectSchema, Second extends ObjectSchema>(First: Struct<ObjectType<First>, First>, Second: Struct<ObjectType<Second>, Second>): Struct<ObjectType<Assign<First, Second>>, Assign<First, Second>>;
/**
 * Create a new struct that combines the properties from multiple object or type
 * structs. Its return type will match the first parameter's type.
 *
 * @param First - The first struct to combine.
 * @param Second - The second struct to combine.
 * @param Third - The third struct to combine.
 * @returns A new struct that combines the properties of the input structs.
 */
export declare function assign<First extends ObjectSchema, Second extends ObjectSchema, Third extends ObjectSchema>(First: Struct<ObjectType<First>, First>, Second: Struct<ObjectType<Second>, Second>, Third: Struct<ObjectType<Third>, Third>): Struct<ObjectType<Assign<Assign<First, Second>, Third>>, Assign<Assign<First, Second>, Third>>;
/**
 * Create a new struct that combines the properties from multiple object or type
 * structs. Its return type will match the first parameter's type.
 *
 * @param First - The first struct to combine.
 * @param Second - The second struct to combine.
 * @param Third - The third struct to combine.
 * @param Fourth - The fourth struct to combine.
 * @returns A new struct that combines the properties of the input structs.
 */
export declare function assign<First extends ObjectSchema, Second extends ObjectSchema, Third extends ObjectSchema, Fourth extends ObjectSchema>(First: Struct<ObjectType<First>, First>, Second: Struct<ObjectType<Second>, Second>, Third: Struct<ObjectType<Third>, Third>, Fourth: Struct<ObjectType<Fourth>, Fourth>): Struct<ObjectType<Assign<Assign<Assign<First, Second>, Third>, Fourth>>, Assign<Assign<Assign<First, Second>, Third>, Fourth>>;
/**
 * Create a new struct that combines the properties from multiple object or type
 * structs. Its return type will match the first parameter's type.
 *
 * @param First - The first struct to combine.
 * @param Second - The second struct to combine.
 * @param Third - The third struct to combine.
 * @param Fourth - The fourth struct to combine.
 * @param Fifth - The fifth struct to combine.
 * @returns A new struct that combines the properties of the input structs.
 */
export declare function assign<First extends ObjectSchema, Second extends ObjectSchema, Third extends ObjectSchema, Fourth extends ObjectSchema, Fifth extends ObjectSchema>(First: Struct<ObjectType<First>, First>, Second: Struct<ObjectType<Second>, Second>, Third: Struct<ObjectType<Third>, Third>, Fourth: Struct<ObjectType<Fourth>, Fourth>, Fifth: Struct<ObjectType<Fifth>, Fifth>): Struct<ObjectType<Assign<Assign<Assign<Assign<First, Second>, Third>, Fourth>, Fifth>>, Assign<Assign<Assign<Assign<First, Second>, Third>, Fourth>, Fifth>>;
/**
 * Define a new struct type with a custom validation function.
 *
 * @param name - The name of the struct type.
 * @param validator - The validation function.
 * @returns A new struct type.
 */
export declare function define<Type>(name: string, validator: Validator): Struct<Type, null>;
/**
 * Create a new struct based on an existing struct, but the value is allowed to
 * be `undefined`. `log` will be called if the value is not `undefined`.
 *
 * @param struct - The struct to augment.
 * @param log - The function to call when the value is not `undefined`.
 * @returns A new struct that will only accept `undefined` or values that pass
 * the input struct.
 */
export declare function deprecated<Type>(struct: Struct<Type>, log: (value: unknown, ctx: Context) => void): Struct<Type>;
/**
 * Create a struct with dynamic validation logic.
 *
 * The callback will receive the value currently being validated, and must
 * return a struct object to validate it with. This can be useful to model
 * validation logic that changes based on its input.
 *
 * @param fn - The callback to create the struct.
 * @returns A new struct with dynamic validation logic.
 */
export declare function dynamic<Type>(fn: (value: unknown, ctx: Context) => Struct<Type, any>): Struct<Type, null>;
/**
 * Create a struct with lazily evaluated validation logic.
 *
 * The first time validation is run with the struct, the callback will be called
 * and must return a struct object to use. This is useful for cases where you
 * want to have self-referential structs for nested data structures to avoid a
 * circular definition problem.
 *
 * @param fn - The callback to create the struct.
 * @returns A new struct with lazily evaluated validation logic.
 */
export declare function lazy<Type>(fn: () => Struct<Type, any>): Struct<Type, null>;
/**
 * Create a new struct based on an existing object struct, but excluding
 * specific properties.
 *
 * Like TypeScript's `Omit` utility.
 *
 * @param struct - The struct to augment.
 * @param keys - The keys to omit.
 * @returns A new struct that will not accept the input keys.
 */
export declare function omit<Schema extends ObjectSchema, Key extends keyof Schema>(struct: Struct<ObjectType<Schema>, Schema>, keys: Key[]): Struct<ObjectType<Omit<Schema, Key>>, Omit<Schema, Key>>;
/**
 * Create a new struct based on an existing object struct, but with all of its
 * properties allowed to be `undefined`.
 *
 * Like TypeScript's `Partial` utility.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will accept the input keys as `undefined`.
 */
export declare function partial<Schema extends ObjectSchema>(struct: Struct<ObjectType<Schema>, Schema> | Schema): Struct<ObjectType<PartialObjectSchema<Schema>>, PartialObjectSchema<Schema>>;
/**
 * Create a new struct based on an existing object struct, but only including
 * specific properties.
 *
 * Like TypeScript's `Pick` utility.
 *
 * @param struct - The struct to augment.
 * @param keys - The keys to pick.
 * @returns A new struct that will only accept the input keys.
 */
export declare function pick<Schema extends ObjectSchema, Key extends keyof Schema>(struct: Struct<ObjectType<Schema>, Schema>, keys: Key[]): Struct<ObjectType<Pick<Schema, Key>>, Pick<Schema, Key>>;
//# sourceMappingURL=utilities.d.mts.map