import { Struct } from "../struct.mjs";
import { object, optional, type } from "./types.mjs";
/**
 * Create a new struct that combines the properties from multiple object or type
 * structs. Its return type will match the first parameter's type.
 *
 * @param Structs - The structs to combine.
 * @returns A new struct that combines the properties of the input structs.
 */
export function assign(...Structs) {
    const isType = Structs[0]?.type === 'type';
    const schemas = Structs.map(({ schema }) => schema);
    const schema = Object.assign({}, ...schemas);
    return isType ? type(schema) : object(schema);
}
/**
 * Define a new struct type with a custom validation function.
 *
 * @param name - The name of the struct type.
 * @param validator - The validation function.
 * @returns A new struct type.
 */
export function define(name, validator) {
    return new Struct({ type: name, schema: null, validator });
}
/**
 * Create a new struct based on an existing struct, but the value is allowed to
 * be `undefined`. `log` will be called if the value is not `undefined`.
 *
 * @param struct - The struct to augment.
 * @param log - The function to call when the value is not `undefined`.
 * @returns A new struct that will only accept `undefined` or values that pass
 * the input struct.
 */
export function deprecated(struct, log) {
    return new Struct({
        ...struct,
        refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx),
        validator(value, ctx) {
            if (value === undefined) {
                return true;
            }
            log(value, ctx);
            return struct.validator(value, ctx);
        },
    });
}
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
export function dynamic(fn) {
    return new Struct({
        type: 'dynamic',
        schema: null,
        *entries(value, ctx) {
            const struct = fn(value, ctx);
            yield* struct.entries(value, ctx);
        },
        validator(value, ctx) {
            const struct = fn(value, ctx);
            return struct.validator(value, ctx);
        },
        coercer(value, ctx) {
            const struct = fn(value, ctx);
            return struct.coercer(value, ctx);
        },
        refiner(value, ctx) {
            const struct = fn(value, ctx);
            return struct.refiner(value, ctx);
        },
    });
}
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
export function lazy(fn) {
    let struct;
    return new Struct({
        type: 'lazy',
        schema: null,
        *entries(value, ctx) {
            struct ?? (struct = fn());
            yield* struct.entries(value, ctx);
        },
        validator(value, ctx) {
            struct ?? (struct = fn());
            return struct.validator(value, ctx);
        },
        coercer(value, ctx) {
            struct ?? (struct = fn());
            return struct.coercer(value, ctx);
        },
        refiner(value, ctx) {
            struct ?? (struct = fn());
            return struct.refiner(value, ctx);
        },
    });
}
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
export function omit(struct, keys) {
    const { schema } = struct;
    const subschema = { ...schema };
    for (const key of keys) {
        delete subschema[key];
    }
    switch (struct.type) {
        case 'type':
            return type(subschema);
        default:
            return object(subschema);
    }
}
/**
 * Create a new struct based on an existing object struct, but with all of its
 * properties allowed to be `undefined`.
 *
 * Like TypeScript's `Partial` utility.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will accept the input keys as `undefined`.
 */
export function partial(struct) {
    const isStruct = struct instanceof Struct;
    const schema = isStruct ? { ...struct.schema } : { ...struct };
    // eslint-disable-next-line guard-for-in
    for (const key in schema) {
        schema[key] = optional(schema[key]);
    }
    if (isStruct && struct.type === 'type') {
        return type(schema);
    }
    return object(schema);
}
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
export function pick(struct, keys) {
    const { schema } = struct;
    const subschema = {};
    for (const key of keys) {
        subschema[key] = schema[key];
    }
    switch (struct.type) {
        case 'type':
            return type(subschema);
        default:
            return object(subschema);
    }
}
//# sourceMappingURL=utilities.mjs.map