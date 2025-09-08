"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimmed = exports.defaulted = exports.coerce = void 0;
const struct_js_1 = require("../struct.cjs");
const utils_js_1 = require("../utils.cjs");
const types_js_1 = require("./types.cjs");
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
function coerce(struct, condition, coercer) {
    return new struct_js_1.Struct({
        ...struct,
        coercer: (value, ctx) => {
            return (0, struct_js_1.is)(value, condition)
                ? struct.coercer(coercer(value, ctx), ctx)
                : struct.coercer(value, ctx);
        },
    });
}
exports.coerce = coerce;
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
function defaulted(struct, fallback, options = {}) {
    return coerce(struct, (0, types_js_1.unknown)(), (value) => {
        const result = typeof fallback === 'function' ? fallback() : fallback;
        if (value === undefined) {
            return result;
        }
        if (!options.strict && (0, utils_js_1.isPlainObject)(value) && (0, utils_js_1.isPlainObject)(result)) {
            const ret = { ...value };
            let changed = false;
            for (const key in result) {
                if (ret[key] === undefined) {
                    ret[key] = result[key];
                    changed = true;
                }
            }
            if (changed) {
                return ret;
            }
        }
        return value;
    });
}
exports.defaulted = defaulted;
/**
 * Augment a struct to trim string inputs.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 *
 * @param struct - The struct to augment.
 * @returns A new struct that will trim string inputs before validating them.
 */
function trimmed(struct) {
    return coerce(struct, (0, types_js_1.string)(), (value) => value.trim());
}
exports.trimmed = trimmed;
//# sourceMappingURL=coercions.cjs.map