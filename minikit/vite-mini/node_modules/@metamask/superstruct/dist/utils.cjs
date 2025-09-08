"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.toFailures = exports.toFailure = exports.shiftIterator = exports.print = exports.isPlainObject = exports.isObject = void 0;
/**
 * Check if a value is an iterator.
 *
 * @param value - The value to check.
 * @returns Whether the value is an iterator.
 */
function isIterable(value) {
    return isObject(value) && typeof value[Symbol.iterator] === 'function';
}
/**
 * Check if a value is a plain object.
 *
 * @param value - The value to check.
 * @returns Whether the value is a plain object.
 */
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
exports.isObject = isObject;
/**
 * Check if a value is a plain object.
 *
 * @param value - The value to check.
 * @returns Whether the value is a plain object.
 */
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}
exports.isPlainObject = isPlainObject;
/**
 * Return a value as a printable string.
 *
 * @param value - The value to print.
 * @returns The value as a string.
 */
function print(value) {
    if (typeof value === 'symbol') {
        return value.toString();
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return typeof value === 'string' ? JSON.stringify(value) : `${value}`;
}
exports.print = print;
/**
 * Shift (remove and return) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 *
 * @param input - The iterator to shift.
 * @returns The first value of the iterator, or `undefined` if the iterator is
 * empty.
 */
function shiftIterator(input) {
    const { done, value } = input.next();
    return done ? undefined : value;
}
exports.shiftIterator = shiftIterator;
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
function toFailure(result, context, struct, value) {
    if (result === true) {
        return undefined;
    }
    else if (result === false) {
        // eslint-disable-next-line no-param-reassign
        result = {};
    }
    else if (typeof result === 'string') {
        // eslint-disable-next-line no-param-reassign
        result = { message: result };
    }
    const { path, branch } = context;
    const { type } = struct;
    const { refinement, message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ''}, but received: \`${print(value)}\``, } = result;
    return {
        value,
        type,
        refinement,
        key: path[path.length - 1],
        path,
        branch,
        ...result,
        message,
    };
}
exports.toFailure = toFailure;
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
function* toFailures(result, context, struct, value) {
    if (!isIterable(result)) {
        // eslint-disable-next-line no-param-reassign
        result = [result];
    }
    for (const validationResult of result) {
        const failure = toFailure(validationResult, context, struct, value);
        if (failure) {
            yield failure;
        }
    }
}
exports.toFailures = toFailures;
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
function* run(value, struct, options = {}) {
    const { path = [], branch = [value], coerce = false, mask = false } = options;
    const context = { path, branch };
    if (coerce) {
        // eslint-disable-next-line no-param-reassign
        value = struct.coercer(value, context);
        if (mask &&
            struct.type !== 'type' &&
            isObject(struct.schema) &&
            isObject(value) &&
            !Array.isArray(value)) {
            for (const key in value) {
                if (struct.schema[key] === undefined) {
                    delete value[key];
                }
            }
        }
    }
    let status = 'valid';
    for (const failure of struct.validator(value, context)) {
        failure.explanation = options.message;
        status = 'not_valid';
        yield [failure, undefined];
    }
    // eslint-disable-next-line prefer-const
    for (let [innerKey, innerValue, innerStruct] of struct.entries(value, context)) {
        const iterable = run(innerValue, innerStruct, {
            path: innerKey === undefined ? path : [...path, innerKey],
            branch: innerKey === undefined ? branch : [...branch, innerValue],
            coerce,
            mask,
            message: options.message,
        });
        for (const result of iterable) {
            if (result[0]) {
                status =
                    result[0].refinement === null || result[0].refinement === undefined
                        ? 'not_valid'
                        : 'not_refined';
                yield [result[0], undefined];
            }
            else if (coerce) {
                innerValue = result[1];
                if (innerKey === undefined) {
                    // eslint-disable-next-line no-param-reassign
                    value = innerValue;
                }
                else if (value instanceof Map) {
                    value.set(innerKey, innerValue);
                }
                else if (value instanceof Set) {
                    value.add(innerValue);
                }
                else if (isObject(value)) {
                    if (innerValue !== undefined || innerKey in value) {
                        value[innerKey] = innerValue;
                    }
                }
            }
        }
    }
    if (status !== 'not_valid') {
        for (const failure of struct.refiner(value, context)) {
            failure.explanation = options.message;
            status = 'not_refined';
            yield [failure, undefined];
        }
    }
    if (status === 'valid') {
        yield [undefined, value];
    }
}
exports.run = run;
//# sourceMappingURL=utils.cjs.map