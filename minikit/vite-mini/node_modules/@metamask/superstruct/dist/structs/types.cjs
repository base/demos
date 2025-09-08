"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknown = exports.union = exports.type = exports.tuple = exports.string = exports.set = exports.regexp = exports.record = exports.exactOptional = exports.optional = exports.object = exports.number = exports.nullable = exports.never = exports.map = exports.literal = exports.intersection = exports.integer = exports.instance = exports.func = exports.enums = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = void 0;
const struct_js_1 = require("../struct.cjs");
const utils_js_1 = require("../utils.cjs");
const utilities_js_1 = require("./utilities.cjs");
/**
 * Ensure that any value passes validation.
 *
 * @returns A struct that will always pass validation.
 */
function any() {
    return (0, utilities_js_1.define)('any', () => true);
}
exports.any = any;
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
function array(Element) {
    return new struct_js_1.Struct({
        type: 'array',
        schema: Element,
        *entries(value) {
            if (Element && Array.isArray(value)) {
                for (const [index, arrayValue] of value.entries()) {
                    yield [index, arrayValue, Element];
                }
            }
        },
        coercer(value) {
            return Array.isArray(value) ? value.slice() : value;
        },
        validator(value) {
            return (Array.isArray(value) ||
                `Expected an array value, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.array = array;
/**
 * Ensure that a value is a bigint.
 *
 * @returns A new struct that will only accept bigints.
 */
function bigint() {
    return (0, utilities_js_1.define)('bigint', (value) => {
        return typeof value === 'bigint';
    });
}
exports.bigint = bigint;
/**
 * Ensure that a value is a boolean.
 *
 * @returns A new struct that will only accept booleans.
 */
function boolean() {
    return (0, utilities_js_1.define)('boolean', (value) => {
        return typeof value === 'boolean';
    });
}
exports.boolean = boolean;
/**
 * Ensure that a value is a valid `Date`.
 *
 * Note: this also ensures that the value is *not* an invalid `Date` object,
 * which can occur when parsing a date fails but still returns a `Date`.
 *
 * @returns A new struct that will only accept valid `Date` objects.
 */
function date() {
    return (0, utilities_js_1.define)('date', (value) => {
        return ((value instanceof Date && !isNaN(value.getTime())) ||
            `Expected a valid \`Date\` object, but received: ${(0, utils_js_1.print)(value)}`);
    });
}
exports.date = date;
/**
 * Ensure that a value is one of a set of potential values.
 *
 * Note: after creating the struct, you can access the definition of the
 * potential values as `struct.schema`.
 *
 * @param values - The potential values that the input can be.
 * @returns A new struct that will only accept the given values.
 */
function enums(values) {
    const schema = {};
    const description = values.map((value) => (0, utils_js_1.print)(value)).join();
    for (const key of values) {
        schema[key] = key;
    }
    return new struct_js_1.Struct({
        type: 'enums',
        schema,
        validator(value) {
            return (values.includes(value) ||
                `Expected one of \`${description}\`, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.enums = enums;
/**
 * Ensure that a value is a function.
 *
 * @returns A new struct that will only accept functions.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function func() {
    return (0, utilities_js_1.define)('func', (value) => {
        return (typeof value === 'function' ||
            `Expected a function, but received: ${(0, utils_js_1.print)(value)}`);
    });
}
exports.func = func;
/**
 * Ensure that a value is an instance of a specific class.
 *
 * @param Class - The class that the value must be an instance of.
 * @returns A new struct that will only accept instances of the given class.
 */
function instance(Class) {
    return (0, utilities_js_1.define)('instance', (value) => {
        return (value instanceof Class ||
            `Expected a \`${Class.name}\` instance, but received: ${(0, utils_js_1.print)(value)}`);
    });
}
exports.instance = instance;
/**
 * Ensure that a value is an integer.
 *
 * @returns A new struct that will only accept integers.
 */
function integer() {
    return (0, utilities_js_1.define)('integer', (value) => {
        return ((typeof value === 'number' && !isNaN(value) && Number.isInteger(value)) ||
            `Expected an integer, but received: ${(0, utils_js_1.print)(value)}`);
    });
}
exports.integer = integer;
/**
 * Ensure that a value matches all of a set of types.
 *
 * @param Structs - The set of structs that the value must match.
 * @returns A new struct that will only accept values that match all of the
 * given structs.
 */
function intersection(Structs) {
    return new struct_js_1.Struct({
        type: 'intersection',
        schema: null,
        *entries(value, context) {
            for (const { entries } of Structs) {
                yield* entries(value, context);
            }
        },
        *validator(value, context) {
            for (const { validator } of Structs) {
                yield* validator(value, context);
            }
        },
        *refiner(value, context) {
            for (const { refiner } of Structs) {
                yield* refiner(value, context);
            }
        },
    });
}
exports.intersection = intersection;
/**
 * Ensure that a value is an exact value, using `===` for comparison.
 *
 * @param constant - The exact value that the input must be.
 * @returns A new struct that will only accept the exact given value.
 */
function literal(constant) {
    const description = (0, utils_js_1.print)(constant);
    const valueType = typeof constant;
    return new struct_js_1.Struct({
        type: 'literal',
        schema: valueType === 'string' ||
            valueType === 'number' ||
            valueType === 'boolean'
            ? constant
            : null,
        validator(value) {
            return (value === constant ||
                `Expected the literal \`${description}\`, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.literal = literal;
/**
 * Ensure that a value is a `Map` object, and that its keys and values are of
 * specific types.
 *
 * @param Key - The struct to validate each key in the map against.
 * @param Value - The struct to validate each value in the map against.
 * @returns A new struct that will only accept `Map` objects.
 */
function map(Key, Value) {
    return new struct_js_1.Struct({
        type: 'map',
        schema: null,
        *entries(value) {
            if (Key && Value && value instanceof Map) {
                for (const [mapKey, mapValue] of value.entries()) {
                    yield [mapKey, mapKey, Key];
                    yield [mapKey, mapValue, Value];
                }
            }
        },
        coercer(value) {
            return value instanceof Map ? new Map(value) : value;
        },
        validator(value) {
            return (value instanceof Map ||
                `Expected a \`Map\` object, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.map = map;
/**
 * Ensure that no value ever passes validation.
 *
 * @returns A new struct that will never pass validation.
 */
function never() {
    return (0, utilities_js_1.define)('never', () => false);
}
exports.never = never;
/**
 * Augment an existing struct to allow `null` values.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will accept `null` values.
 */
function nullable(struct) {
    return new struct_js_1.Struct({
        ...struct,
        validator: (value, ctx) => value === null || struct.validator(value, ctx),
        refiner: (value, ctx) => value === null || struct.refiner(value, ctx),
    });
}
exports.nullable = nullable;
/**
 * Ensure that a value is a number.
 *
 * @returns A new struct that will only accept numbers.
 */
function number() {
    return (0, utilities_js_1.define)('number', (value) => {
        return ((typeof value === 'number' && !isNaN(value)) ||
            `Expected a number, but received: ${(0, utils_js_1.print)(value)}`);
    });
}
exports.number = number;
/**
 * Ensure that a value is an object, that it has a known set of properties,
 * and that its properties are of specific types.
 *
 * Note: Unrecognized properties will fail validation.
 *
 * @param schema - An object that defines the structure of the object.
 * @returns A new struct that will only accept objects.
 */
function object(schema) {
    const knowns = schema ? Object.keys(schema) : [];
    const Never = never();
    return new struct_js_1.Struct({
        type: 'object',
        schema: schema ?? null,
        *entries(value) {
            if (schema && (0, utils_js_1.isObject)(value)) {
                const unknowns = new Set(Object.keys(value));
                for (const key of knowns) {
                    unknowns.delete(key);
                    const propertySchema = schema[key];
                    if (struct_js_1.ExactOptionalStruct.isExactOptional(propertySchema) &&
                        !Object.prototype.hasOwnProperty.call(value, key)) {
                        continue;
                    }
                    yield [key, value[key], schema[key]];
                }
                for (const key of unknowns) {
                    yield [key, value[key], Never];
                }
            }
        },
        validator(value) {
            return ((0, utils_js_1.isObject)(value) || `Expected an object, but received: ${(0, utils_js_1.print)(value)}`);
        },
        coercer(value) {
            return (0, utils_js_1.isObject)(value) ? { ...value } : value;
        },
    });
}
exports.object = object;
/**
 * Augment a struct to allow `undefined` values.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will accept `undefined` values.
 */
function optional(struct) {
    return new struct_js_1.Struct({
        ...struct,
        validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
        refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx),
    });
}
exports.optional = optional;
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
function exactOptional(struct) {
    return new struct_js_1.ExactOptionalStruct(struct);
}
exports.exactOptional = exactOptional;
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
function record(Key, Value) {
    return new struct_js_1.Struct({
        type: 'record',
        schema: null,
        *entries(value) {
            if ((0, utils_js_1.isObject)(value)) {
                // eslint-disable-next-line guard-for-in
                for (const objectKey in value) {
                    const objectValue = value[objectKey];
                    yield [objectKey, objectKey, Key];
                    yield [objectKey, objectValue, Value];
                }
            }
        },
        validator(value) {
            return ((0, utils_js_1.isObject)(value) || `Expected an object, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.record = record;
/**
 * Ensure that a value is a `RegExp`.
 *
 * Note: this does not test the value against the regular expression! For that
 * you need to use the `pattern()` refinement.
 *
 * @returns A new struct that will only accept `RegExp` objects.
 */
function regexp() {
    return (0, utilities_js_1.define)('regexp', (value) => {
        return value instanceof RegExp;
    });
}
exports.regexp = regexp;
/**
 * Ensure that a value is a `Set` object, and that its elements are of a
 * specific type.
 *
 * @param Element - The struct to validate each element in the set against.
 * @returns A new struct that will only accept `Set` objects.
 */
function set(Element) {
    return new struct_js_1.Struct({
        type: 'set',
        schema: null,
        *entries(value) {
            if (Element && value instanceof Set) {
                for (const setValue of value) {
                    yield [setValue, setValue, Element];
                }
            }
        },
        coercer(value) {
            return value instanceof Set ? new Set(value) : value;
        },
        validator(value) {
            return (value instanceof Set ||
                `Expected a \`Set\` object, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.set = set;
/**
 * Ensure that a value is a string.
 *
 * @returns A new struct that will only accept strings.
 */
function string() {
    return (0, utilities_js_1.define)('string', (value) => {
        return (typeof value === 'string' ||
            `Expected a string, but received: ${(0, utils_js_1.print)(value)}`);
    });
}
exports.string = string;
/**
 * Ensure that a value is a tuple of a specific length, and that each of its
 * elements is of a specific type.
 *
 * @param Structs - The set of structs that the value must match.
 * @returns A new struct that will only accept tuples of the given types.
 */
function tuple(Structs) {
    const Never = never();
    return new struct_js_1.Struct({
        type: 'tuple',
        schema: null,
        *entries(value) {
            if (Array.isArray(value)) {
                const length = Math.max(Structs.length, value.length);
                for (let i = 0; i < length; i++) {
                    yield [i, value[i], Structs[i] || Never];
                }
            }
        },
        validator(value) {
            return (Array.isArray(value) ||
                `Expected an array, but received: ${(0, utils_js_1.print)(value)}`);
        },
    });
}
exports.tuple = tuple;
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 *
 * @param schema - An object that defines the structure of the object.
 * @returns A new struct that will only accept objects.
 */
function type(schema) {
    const keys = Object.keys(schema);
    return new struct_js_1.Struct({
        type: 'type',
        schema,
        *entries(value) {
            if ((0, utils_js_1.isObject)(value)) {
                for (const k of keys) {
                    yield [k, value[k], schema[k]];
                }
            }
        },
        validator(value) {
            return ((0, utils_js_1.isObject)(value) || `Expected an object, but received: ${(0, utils_js_1.print)(value)}`);
        },
        coercer(value) {
            return (0, utils_js_1.isObject)(value) ? { ...value } : value;
        },
    });
}
exports.type = type;
/**
 * Ensure that a value matches one of a set of types.
 *
 * @param Structs - The set of structs that the value must match.
 * @returns A new struct that will only accept values that match one of the
 * given structs.
 */
function union(Structs) {
    const description = Structs.map((struct) => struct.type).join(' | ');
    return new struct_js_1.Struct({
        type: 'union',
        schema: null,
        coercer(value) {
            for (const InnerStruct of Structs) {
                const [error, coerced] = InnerStruct.validate(value, { coerce: true });
                if (!error) {
                    return coerced;
                }
            }
            return value;
        },
        validator(value, ctx) {
            const failures = [];
            for (const InnerStruct of Structs) {
                const [...tuples] = (0, utils_js_1.run)(value, InnerStruct, ctx);
                const [first] = tuples;
                if (!first?.[0]) {
                    return [];
                }
                for (const [failure] of tuples) {
                    if (failure) {
                        failures.push(failure);
                    }
                }
            }
            return [
                `Expected the value to satisfy a union of \`${description}\`, but received: ${(0, utils_js_1.print)(value)}`,
                ...failures,
            ];
        },
    });
}
exports.union = union;
/**
 * Ensure that any value passes validation, without widening its type to `any`.
 *
 * @returns A struct that will always pass validation.
 */
function unknown() {
    return (0, utilities_js_1.define)('unknown', () => true);
}
exports.unknown = unknown;
//# sourceMappingURL=types.cjs.map