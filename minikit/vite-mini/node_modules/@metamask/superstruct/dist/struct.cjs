"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.is = exports.mask = exports.create = exports.assert = exports.ExactOptionalStruct = exports.Struct = void 0;
const error_js_1 = require("./error.cjs");
const utils_js_1 = require("./utils.cjs");
/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */
class Struct {
    constructor(props) {
        const { type, schema, validator, refiner, coercer = (value) => value, entries = function* () {
            /* noop */
        }, } = props;
        this.type = type;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) {
            this.validator = (value, context) => {
                const result = validator(value, context);
                return (0, utils_js_1.toFailures)(result, context, this, value);
            };
        }
        else {
            this.validator = () => [];
        }
        if (refiner) {
            this.refiner = (value, context) => {
                const result = refiner(value, context);
                return (0, utils_js_1.toFailures)(result, context, this, value);
            };
        }
        else {
            this.refiner = () => [];
        }
    }
    /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */
    assert(value, message) {
        return assert(value, this, message);
    }
    /**
     * Create a value with the struct's coercion logic, then validate it.
     */
    create(value, message) {
        return create(value, this, message);
    }
    /**
     * Check if a value passes the struct's validation.
     */
    is(value) {
        return is(value, this);
    }
    /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema.
     */
    mask(value, message) {
        return mask(value, this, message);
    }
    /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `withCoercion` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful.
     */
    validate(value, options = {}) {
        return validate(value, this, options);
    }
}
exports.Struct = Struct;
// String instead of a Symbol in case of multiple different versions of this library.
const ExactOptionalBrand = 'EXACT_OPTIONAL';
/**
 * An `ExactOptionalStruct` is a `Struct` that is used to create exactly optional
 * properties of `object()` structs.
 */
class ExactOptionalStruct extends Struct {
    constructor(props) {
        super({
            ...props,
            type: `exact optional ${props.type}`,
        });
        this.brand = ExactOptionalBrand;
    }
    static isExactOptional(value) {
        return ((0, utils_js_1.isObject)(value) && 'brand' in value && value.brand === ExactOptionalBrand);
    }
}
exports.ExactOptionalStruct = ExactOptionalStruct;
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 *
 * @param value - The value to validate.
 * @param struct - The struct to validate against.
 * @param message - An optional message to include in the error.
 */
function assert(value, struct, message) {
    const result = validate(value, struct, { message });
    if (result[0]) {
        throw result[0];
    }
}
exports.assert = assert;
/**
 * Create a value with the coercion logic of struct and validate it.
 *
 * @param value - The value to coerce and validate.
 * @param struct - The struct to validate against.
 * @param message - An optional message to include in the error.
 * @returns The coerced and validated value.
 */
function create(value, struct, message) {
    const result = validate(value, struct, { coerce: true, message });
    if (result[0]) {
        throw result[0];
    }
    else {
        return result[1];
    }
}
exports.create = create;
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 *
 * @param value - The value to mask.
 * @param struct - The struct to mask against.
 * @param message - An optional message to include in the error.
 * @returns The masked value.
 */
function mask(value, struct, message) {
    const result = validate(value, struct, { coerce: true, mask: true, message });
    if (result[0]) {
        throw result[0];
    }
    else {
        return result[1];
    }
}
exports.mask = mask;
/**
 * Check if a value passes a struct.
 *
 * @param value - The value to validate.
 * @param struct - The struct to validate against.
 * @returns `true` if the value passes the struct, `false` otherwise.
 */
function is(value, struct) {
    const result = validate(value, struct);
    return !result[0];
}
exports.is = is;
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
function validate(value, struct, options = {}) {
    const tuples = (0, utils_js_1.run)(value, struct, options);
    const tuple = (0, utils_js_1.shiftIterator)(tuples);
    if (tuple[0]) {
        const error = new error_js_1.StructError(tuple[0], function* () {
            for (const innerTuple of tuples) {
                if (innerTuple[0]) {
                    yield innerTuple[0];
                }
            }
        });
        return [error, undefined];
    }
    const validatedValue = tuple[1];
    return [undefined, validatedValue];
}
exports.validate = validate;
//# sourceMappingURL=struct.cjs.map