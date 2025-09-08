"use strict";
//
// Types
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNumberSize = exports.calculateStringSize = exports.isASCII = exports.isPlainObject = exports.ESCAPE_CHARACTERS_REGEXP = exports.JsonSize = exports.getKnownPropertyNames = exports.hasProperty = exports.isObject = exports.isNullOrUndefined = exports.isNonEmptyArray = void 0;
//
// Type Guards
//
/**
 * A {@link NonEmptyArray} type guard.
 *
 * @template Element - The non-empty array member type.
 * @param value - The value to check.
 * @returns Whether the value is a non-empty array.
 */
function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
}
exports.isNonEmptyArray = isNonEmptyArray;
/**
 * Type guard for "nullishness".
 *
 * @param value - Any value.
 * @returns `true` if the value is null or undefined, `false` otherwise.
 */
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * A type guard for {@link RuntimeObject}.
 *
 * @param value - The value to check.
 * @returns Whether the specified value has a runtime type of `object` and is
 * neither `null` nor an `Array`.
 */
function isObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
exports.isObject = isObject;
//
// Other utility functions
//
/**
 * A type guard for ensuring an object has a property.
 *
 * @param objectToCheck - The object to check.
 * @param name - The property name to check for.
 * @returns Whether the specified object has an own property with the specified
 * name, regardless of whether it is enumerable or not.
 */
const hasProperty = (objectToCheck, name) => Object.hasOwnProperty.call(objectToCheck, name);
exports.hasProperty = hasProperty;
/**
 * `Object.getOwnPropertyNames()` is intentionally generic: it returns the
 * immediate property names of an object, but it cannot make guarantees about
 * the contents of that object, so the type of the property names is merely
 * `string[]`. While this is technically accurate, it is also unnecessary if we
 * have an object with a type that we own (such as an enum).
 *
 * @param object - The plain object.
 * @returns The own property names of the object which are assigned a type
 * derived from the object itself.
 */
function getKnownPropertyNames(object) {
    return Object.getOwnPropertyNames(object);
}
exports.getKnownPropertyNames = getKnownPropertyNames;
/**
 * Predefined sizes (in Bytes) of specific parts of JSON structure.
 */
var JsonSize;
(function (JsonSize) {
    JsonSize[JsonSize["Null"] = 4] = "Null";
    JsonSize[JsonSize["Comma"] = 1] = "Comma";
    JsonSize[JsonSize["Wrapper"] = 1] = "Wrapper";
    JsonSize[JsonSize["True"] = 4] = "True";
    JsonSize[JsonSize["False"] = 5] = "False";
    JsonSize[JsonSize["Quote"] = 1] = "Quote";
    JsonSize[JsonSize["Colon"] = 1] = "Colon";
    // eslint-disable-next-line @typescript-eslint/no-shadow
    JsonSize[JsonSize["Date"] = 24] = "Date";
})(JsonSize = exports.JsonSize || (exports.JsonSize = {}));
/**
 * Regular expression with pattern matching for (special) escaped characters.
 */
exports.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu;
/**
 * Check if the value is plain object.
 *
 * @param value - Value to be checked.
 * @returns True if an object is the plain JavaScript object,
 * false if the object is not plain (e.g. function).
 */
function isPlainObject(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    try {
        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }
    catch (_) {
        return false;
    }
}
exports.isPlainObject = isPlainObject;
/**
 * Check if character is ASCII.
 *
 * @param character - Character.
 * @returns True if a character code is ASCII, false if not.
 */
function isASCII(character) {
    return character.charCodeAt(0) <= 127;
}
exports.isASCII = isASCII;
/**
 * Calculate string size.
 *
 * @param value - String value to calculate size.
 * @returns Number of bytes used to store whole string value.
 */
function calculateStringSize(value) {
    const size = value.split('').reduce((total, character) => {
        if (isASCII(character)) {
            return total + 1;
        }
        return total + 2;
    }, 0);
    // Also detect characters that need backslash escape
    return size + (value.match(exports.ESCAPE_CHARACTERS_REGEXP) ?? []).length;
}
exports.calculateStringSize = calculateStringSize;
/**
 * Calculate size of a number ofter JSON serialization.
 *
 * @param value - Number value to calculate size.
 * @returns Number of bytes used to store whole number in JSON.
 */
function calculateNumberSize(value) {
    return value.toString().length;
}
exports.calculateNumberSize = calculateNumberSize;
//# sourceMappingURL=misc.cjs.map