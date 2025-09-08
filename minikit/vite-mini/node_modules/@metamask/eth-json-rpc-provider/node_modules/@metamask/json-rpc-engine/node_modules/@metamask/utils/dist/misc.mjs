//
// Types
//
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
export function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
}
/**
 * Type guard for "nullishness".
 *
 * @param value - Any value.
 * @returns `true` if the value is null or undefined, `false` otherwise.
 */
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/**
 * A type guard for {@link RuntimeObject}.
 *
 * @param value - The value to check.
 * @returns Whether the specified value has a runtime type of `object` and is
 * neither `null` nor an `Array`.
 */
export function isObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
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
export const hasProperty = (objectToCheck, name) => Object.hasOwnProperty.call(objectToCheck, name);
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
export function getKnownPropertyNames(object) {
    return Object.getOwnPropertyNames(object);
}
/**
 * Predefined sizes (in Bytes) of specific parts of JSON structure.
 */
export var JsonSize;
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
})(JsonSize = JsonSize || (JsonSize = {}));
/**
 * Regular expression with pattern matching for (special) escaped characters.
 */
export const ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu;
/**
 * Check if the value is plain object.
 *
 * @param value - Value to be checked.
 * @returns True if an object is the plain JavaScript object,
 * false if the object is not plain (e.g. function).
 */
export function isPlainObject(value) {
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
/**
 * Check if character is ASCII.
 *
 * @param character - Character.
 * @returns True if a character code is ASCII, false if not.
 */
export function isASCII(character) {
    return character.charCodeAt(0) <= 127;
}
/**
 * Calculate string size.
 *
 * @param value - String value to calculate size.
 * @returns Number of bytes used to store whole string value.
 */
export function calculateStringSize(value) {
    const size = value.split('').reduce((total, character) => {
        if (isASCII(character)) {
            return total + 1;
        }
        return total + 2;
    }, 0);
    // Also detect characters that need backslash escape
    return size + (value.match(ESCAPE_CHARACTERS_REGEXP) ?? []).length;
}
/**
 * Calculate size of a number ofter JSON serialization.
 *
 * @param value - Number value to calculate size.
 * @returns Number of bytes used to store whole number in JSON.
 */
export function calculateNumberSize(value) {
    return value.toString().length;
}
//# sourceMappingURL=misc.mjs.map