import { any, array, coerce, create, define, integer, is, literal, nullable, number, object as superstructObject, optional, record, string, union, unknown, Struct, refine } from "@metamask/superstruct";
import { assertStruct } from "./assert.mjs";
import { hasProperty } from "./misc.mjs";
/**
 * A struct to check if the given value is a valid object, with support for
 * {@link exactOptional} types.
 *
 * @deprecated Use `exactOptional` and `object` from `@metamask/superstruct@>=3.2.0` instead.
 * @param schema - The schema of the object.
 * @returns A struct to check if the given value is an object.
 */
export const object = (schema) => 
// The type is slightly different from a regular object struct, because we
// want to make properties with `undefined` in their type optional, but not
// `undefined` itself. This means that we need a type cast.
superstructObject(schema);
/**
 * Check the last field of a path is present.
 *
 * @param context - The context to check.
 * @param context.path - The path to check.
 * @param context.branch - The branch to check.
 * @returns Whether the last field of a path is present.
 */
function hasOptional({ path, branch }) {
    const field = path[path.length - 1];
    return hasProperty(branch[branch.length - 2], field);
}
/**
 * A struct which allows the property of an object to be absent, or to be present
 * as long as it's valid and not set to `undefined`.
 *
 * This struct should be used in conjunction with the {@link object} from this
 * library, to get proper type inference.
 *
 * @deprecated Use `exactOptional` and `object` from `@metamask/superstruct@>=3.2.0` instead.
 * @param struct - The struct to check the value against, if present.
 * @returns A struct to check if the given value is valid, or not present.
 * @example
 * ```ts
 * const struct = object({
 *   foo: exactOptional(string()),
 *   bar: exactOptional(number()),
 *   baz: optional(boolean()),
 *   qux: unknown(),
 * });
 *
 * type Type = Infer<typeof struct>;
 * // Type is equivalent to:
 * // {
 * //   foo?: string;
 * //   bar?: number;
 * //   baz?: boolean | undefined;
 * //   qux: unknown;
 * // }
 * ```
 */
export function exactOptional(struct) {
    return new Struct({
        ...struct,
        type: `optional ${struct.type}`,
        validator: (value, context) => !hasOptional(context) || struct.validator(value, context),
        refiner: (value, context) => !hasOptional(context) || struct.refiner(value, context),
    });
}
/**
 * Validate an unknown input to be valid JSON.
 *
 * Useful for constructing JSON structs.
 *
 * @param json - An unknown value.
 * @returns True if the value is valid JSON, otherwise false.
 */
function validateJson(json) {
    if (json === null || typeof json === 'boolean' || typeof json === 'string') {
        return true;
    }
    if (typeof json === 'number' && Number.isFinite(json)) {
        return true;
    }
    if (typeof json === 'object') {
        let every = true;
        if (Array.isArray(json)) {
            // Ignoring linting error since for-of is significantly slower than a normal for-loop
            // and performance is important in this specific function.
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < json.length; i++) {
                if (!validateJson(json[i])) {
                    every = false;
                    break;
                }
            }
            return every;
        }
        const entries = Object.entries(json);
        // Ignoring linting errors since for-of is significantly slower than a normal for-loop
        // and performance is important in this specific function.
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < entries.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (typeof entries[i][0] !== 'string' || !validateJson(entries[i][1])) {
                every = false;
                break;
            }
        }
        return every;
    }
    return false;
}
/**
 * A struct to check if the given value is a valid JSON-serializable value.
 *
 * Note that this struct is unsafe. For safe validation, use {@link JsonStruct}.
 */
export const UnsafeJsonStruct = define('JSON', (json) => validateJson(json));
/**
 * A struct to check if the given value is a valid JSON-serializable value.
 *
 * This struct sanitizes the value before validating it, so that it is safe to
 * use with untrusted input.
 */
export const JsonStruct = coerce(UnsafeJsonStruct, refine(any(), 'JSON', (value) => is(value, UnsafeJsonStruct)), (value) => JSON.parse(JSON.stringify(value, (propKey, propValue) => {
    // Strip __proto__ and constructor properties to prevent prototype pollution.
    if (propKey === '__proto__' || propKey === 'constructor') {
        return undefined;
    }
    return propValue;
})));
/**
 * Check if the given value is a valid {@link Json} value, i.e., a value that is
 * serializable to JSON.
 *
 * @param value - The value to check.
 * @returns Whether the value is a valid {@link Json} value.
 */
export function isValidJson(value) {
    try {
        getSafeJson(value);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Validate and return sanitized JSON.
 *
 * Note:
 * This function uses sanitized JsonStruct for validation
 * that applies stringify and then parse of a value provided
 * to ensure that there are no getters which can have side effects
 * that can cause security issues.
 *
 * @param value - JSON structure to be processed.
 * @returns Sanitized JSON structure.
 */
export function getSafeJson(value) {
    return create(value, JsonStruct);
}
/**
 * Get the size of a JSON value in bytes. This also validates the value.
 *
 * @param value - The JSON value to get the size of.
 * @returns The size of the JSON value in bytes.
 */
export function getJsonSize(value) {
    assertStruct(value, JsonStruct, 'Invalid JSON value');
    const json = JSON.stringify(value);
    return new TextEncoder().encode(json).byteLength;
}
/**
 * The string '2.0'.
 */
export const jsonrpc2 = '2.0';
export const JsonRpcVersionStruct = literal(jsonrpc2);
export const JsonRpcIdStruct = nullable(union([number(), string()]));
export const JsonRpcErrorStruct = object({
    code: integer(),
    message: string(),
    data: exactOptional(JsonStruct),
    stack: exactOptional(string()),
});
export const JsonRpcParamsStruct = union([record(string(), JsonStruct), array(JsonStruct)]);
export const JsonRpcRequestStruct = object({
    id: JsonRpcIdStruct,
    jsonrpc: JsonRpcVersionStruct,
    method: string(),
    params: exactOptional(JsonRpcParamsStruct),
});
export const JsonRpcNotificationStruct = object({
    jsonrpc: JsonRpcVersionStruct,
    method: string(),
    params: exactOptional(JsonRpcParamsStruct),
});
/**
 * Check if the given value is a valid {@link JsonRpcNotification} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcNotification}
 * object.
 */
export function isJsonRpcNotification(value) {
    return is(value, JsonRpcNotificationStruct);
}
/**
 * Assert that the given value is a valid {@link JsonRpcNotification} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcNotification} object.
 */
export function assertIsJsonRpcNotification(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(value, JsonRpcNotificationStruct, 'Invalid JSON-RPC notification', ErrorWrapper);
}
/**
 * Check if the given value is a valid {@link JsonRpcRequest} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcRequest} object.
 */
export function isJsonRpcRequest(value) {
    return is(value, JsonRpcRequestStruct);
}
/**
 * Assert that the given value is a valid {@link JsonRpcRequest} object.
 *
 * @param value - The JSON-RPC request or notification to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcRequest} object.
 */
export function assertIsJsonRpcRequest(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(value, JsonRpcRequestStruct, 'Invalid JSON-RPC request', ErrorWrapper);
}
export const PendingJsonRpcResponseStruct = superstructObject({
    id: JsonRpcIdStruct,
    jsonrpc: JsonRpcVersionStruct,
    result: optional(unknown()),
    error: optional(JsonRpcErrorStruct),
});
export const JsonRpcSuccessStruct = object({
    id: JsonRpcIdStruct,
    jsonrpc: JsonRpcVersionStruct,
    result: JsonStruct,
});
export const JsonRpcFailureStruct = object({
    id: JsonRpcIdStruct,
    jsonrpc: JsonRpcVersionStruct,
    error: JsonRpcErrorStruct,
});
export const JsonRpcResponseStruct = union([
    JsonRpcSuccessStruct,
    JsonRpcFailureStruct,
]);
/**
 * Type guard to check whether specified JSON-RPC response is a
 * {@link PendingJsonRpcResponse}.
 *
 * @param response - The JSON-RPC response to check.
 * @returns Whether the specified JSON-RPC response is pending.
 */
export function isPendingJsonRpcResponse(response) {
    return is(response, PendingJsonRpcResponseStruct);
}
/**
 * Assert that the given value is a valid {@link PendingJsonRpcResponse} object.
 *
 * @param response - The JSON-RPC response to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link PendingJsonRpcResponse}
 * object.
 */
export function assertIsPendingJsonRpcResponse(response, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(response, PendingJsonRpcResponseStruct, 'Invalid pending JSON-RPC response', ErrorWrapper);
}
/**
 * Type guard to check if a value is a {@link JsonRpcResponse}.
 *
 * @param response - The object to check.
 * @returns Whether the object is a JsonRpcResponse.
 */
export function isJsonRpcResponse(response) {
    return is(response, JsonRpcResponseStruct);
}
/**
 * Assert that the given value is a valid {@link JsonRpcResponse} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcResponse} object.
 */
export function assertIsJsonRpcResponse(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(value, JsonRpcResponseStruct, 'Invalid JSON-RPC response', ErrorWrapper);
}
/**
 * Check if the given value is a valid {@link JsonRpcSuccess} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcSuccess} object.
 */
export function isJsonRpcSuccess(value) {
    return is(value, JsonRpcSuccessStruct);
}
/**
 * Assert that the given value is a valid {@link JsonRpcSuccess} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcSuccess} object.
 */
export function assertIsJsonRpcSuccess(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(value, JsonRpcSuccessStruct, 'Invalid JSON-RPC success response', ErrorWrapper);
}
/**
 * Check if the given value is a valid {@link JsonRpcFailure} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcFailure} object.
 */
export function isJsonRpcFailure(value) {
    return is(value, JsonRpcFailureStruct);
}
/**
 * Assert that the given value is a valid {@link JsonRpcFailure} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcFailure} object.
 */
export function assertIsJsonRpcFailure(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(value, JsonRpcFailureStruct, 'Invalid JSON-RPC failure response', ErrorWrapper);
}
/**
 * Check if the given value is a valid {@link JsonRpcError} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcError} object.
 */
export function isJsonRpcError(value) {
    return is(value, JsonRpcErrorStruct);
}
/**
 * Assert that the given value is a valid {@link JsonRpcError} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcError} object.
 */
export function assertIsJsonRpcError(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    assertStruct(value, JsonRpcErrorStruct, 'Invalid JSON-RPC error', ErrorWrapper);
}
/**
 * Gets a function for validating JSON-RPC request / response `id` values.
 *
 * By manipulating the options of this factory, you can control the behavior
 * of the resulting validator for some edge cases. This is useful because e.g.
 * `null` should sometimes but not always be permitted.
 *
 * Note that the empty string (`''`) is always permitted by the JSON-RPC
 * specification, but that kind of sucks and you may want to forbid it in some
 * instances anyway.
 *
 * For more details, see the
 * [JSON-RPC Specification](https://www.jsonrpc.org/specification).
 *
 * @param options - An options object.
 * @param options.permitEmptyString - Whether the empty string (i.e. `''`)
 * should be treated as a valid ID. Default: `true`
 * @param options.permitFractions - Whether fractional numbers (e.g. `1.2`)
 * should be treated as valid IDs. Default: `false`
 * @param options.permitNull - Whether `null` should be treated as a valid ID.
 * Default: `true`
 * @returns The JSON-RPC ID validator function.
 */
export function getJsonRpcIdValidator(options) {
    const { permitEmptyString, permitFractions, permitNull } = {
        permitEmptyString: true,
        permitFractions: false,
        permitNull: true,
        ...options,
    };
    /**
     * Type guard for {@link JsonRpcId}.
     *
     * @param id - The JSON-RPC ID value to check.
     * @returns Whether the given ID is valid per the options given to the
     * factory.
     */
    const isValidJsonRpcId = (id) => {
        return Boolean((typeof id === 'number' && (permitFractions || Number.isInteger(id))) ||
            (typeof id === 'string' && (permitEmptyString || id.length > 0)) ||
            (permitNull && id === null));
    };
    return isValidJsonRpcId;
}
//# sourceMappingURL=json.mjs.map