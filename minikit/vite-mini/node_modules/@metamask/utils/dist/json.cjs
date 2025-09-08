"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonRpcIdValidator = exports.assertIsJsonRpcError = exports.isJsonRpcError = exports.assertIsJsonRpcFailure = exports.isJsonRpcFailure = exports.assertIsJsonRpcSuccess = exports.isJsonRpcSuccess = exports.assertIsJsonRpcResponse = exports.isJsonRpcResponse = exports.assertIsPendingJsonRpcResponse = exports.isPendingJsonRpcResponse = exports.JsonRpcResponseStruct = exports.JsonRpcFailureStruct = exports.JsonRpcSuccessStruct = exports.PendingJsonRpcResponseStruct = exports.assertIsJsonRpcRequest = exports.isJsonRpcRequest = exports.assertIsJsonRpcNotification = exports.isJsonRpcNotification = exports.JsonRpcNotificationStruct = exports.JsonRpcRequestStruct = exports.JsonRpcParamsStruct = exports.JsonRpcErrorStruct = exports.JsonRpcIdStruct = exports.JsonRpcVersionStruct = exports.jsonrpc2 = exports.getJsonSize = exports.getSafeJson = exports.isValidJson = exports.JsonStruct = exports.UnsafeJsonStruct = exports.exactOptional = exports.object = void 0;
const superstruct_1 = require("@metamask/superstruct");
const assert_1 = require("./assert.cjs");
const misc_1 = require("./misc.cjs");
/**
 * A struct to check if the given value is a valid object, with support for
 * {@link exactOptional} types.
 *
 * @deprecated Use `exactOptional` and `object` from `@metamask/superstruct@>=3.2.0` instead.
 * @param schema - The schema of the object.
 * @returns A struct to check if the given value is an object.
 */
const object = (schema) => 
// The type is slightly different from a regular object struct, because we
// want to make properties with `undefined` in their type optional, but not
// `undefined` itself. This means that we need a type cast.
(0, superstruct_1.object)(schema);
exports.object = object;
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
    return (0, misc_1.hasProperty)(branch[branch.length - 2], field);
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
function exactOptional(struct) {
    return new superstruct_1.Struct({
        ...struct,
        type: `optional ${struct.type}`,
        validator: (value, context) => !hasOptional(context) || struct.validator(value, context),
        refiner: (value, context) => !hasOptional(context) || struct.refiner(value, context),
    });
}
exports.exactOptional = exactOptional;
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
exports.UnsafeJsonStruct = (0, superstruct_1.define)('JSON', (json) => validateJson(json));
/**
 * A struct to check if the given value is a valid JSON-serializable value.
 *
 * This struct sanitizes the value before validating it, so that it is safe to
 * use with untrusted input.
 */
exports.JsonStruct = (0, superstruct_1.coerce)(exports.UnsafeJsonStruct, (0, superstruct_1.refine)((0, superstruct_1.any)(), 'JSON', (value) => (0, superstruct_1.is)(value, exports.UnsafeJsonStruct)), (value) => JSON.parse(JSON.stringify(value, (propKey, propValue) => {
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
function isValidJson(value) {
    try {
        getSafeJson(value);
        return true;
    }
    catch {
        return false;
    }
}
exports.isValidJson = isValidJson;
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
function getSafeJson(value) {
    return (0, superstruct_1.create)(value, exports.JsonStruct);
}
exports.getSafeJson = getSafeJson;
/**
 * Get the size of a JSON value in bytes. This also validates the value.
 *
 * @param value - The JSON value to get the size of.
 * @returns The size of the JSON value in bytes.
 */
function getJsonSize(value) {
    (0, assert_1.assertStruct)(value, exports.JsonStruct, 'Invalid JSON value');
    const json = JSON.stringify(value);
    return new TextEncoder().encode(json).byteLength;
}
exports.getJsonSize = getJsonSize;
/**
 * The string '2.0'.
 */
exports.jsonrpc2 = '2.0';
exports.JsonRpcVersionStruct = (0, superstruct_1.literal)(exports.jsonrpc2);
exports.JsonRpcIdStruct = (0, superstruct_1.nullable)((0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.string)()]));
exports.JsonRpcErrorStruct = (0, exports.object)({
    code: (0, superstruct_1.integer)(),
    message: (0, superstruct_1.string)(),
    data: exactOptional(exports.JsonStruct),
    stack: exactOptional((0, superstruct_1.string)()),
});
exports.JsonRpcParamsStruct = (0, superstruct_1.union)([(0, superstruct_1.record)((0, superstruct_1.string)(), exports.JsonStruct), (0, superstruct_1.array)(exports.JsonStruct)]);
exports.JsonRpcRequestStruct = (0, exports.object)({
    id: exports.JsonRpcIdStruct,
    jsonrpc: exports.JsonRpcVersionStruct,
    method: (0, superstruct_1.string)(),
    params: exactOptional(exports.JsonRpcParamsStruct),
});
exports.JsonRpcNotificationStruct = (0, exports.object)({
    jsonrpc: exports.JsonRpcVersionStruct,
    method: (0, superstruct_1.string)(),
    params: exactOptional(exports.JsonRpcParamsStruct),
});
/**
 * Check if the given value is a valid {@link JsonRpcNotification} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcNotification}
 * object.
 */
function isJsonRpcNotification(value) {
    return (0, superstruct_1.is)(value, exports.JsonRpcNotificationStruct);
}
exports.isJsonRpcNotification = isJsonRpcNotification;
/**
 * Assert that the given value is a valid {@link JsonRpcNotification} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcNotification} object.
 */
function assertIsJsonRpcNotification(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(value, exports.JsonRpcNotificationStruct, 'Invalid JSON-RPC notification', ErrorWrapper);
}
exports.assertIsJsonRpcNotification = assertIsJsonRpcNotification;
/**
 * Check if the given value is a valid {@link JsonRpcRequest} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcRequest} object.
 */
function isJsonRpcRequest(value) {
    return (0, superstruct_1.is)(value, exports.JsonRpcRequestStruct);
}
exports.isJsonRpcRequest = isJsonRpcRequest;
/**
 * Assert that the given value is a valid {@link JsonRpcRequest} object.
 *
 * @param value - The JSON-RPC request or notification to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcRequest} object.
 */
function assertIsJsonRpcRequest(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(value, exports.JsonRpcRequestStruct, 'Invalid JSON-RPC request', ErrorWrapper);
}
exports.assertIsJsonRpcRequest = assertIsJsonRpcRequest;
exports.PendingJsonRpcResponseStruct = (0, superstruct_1.object)({
    id: exports.JsonRpcIdStruct,
    jsonrpc: exports.JsonRpcVersionStruct,
    result: (0, superstruct_1.optional)((0, superstruct_1.unknown)()),
    error: (0, superstruct_1.optional)(exports.JsonRpcErrorStruct),
});
exports.JsonRpcSuccessStruct = (0, exports.object)({
    id: exports.JsonRpcIdStruct,
    jsonrpc: exports.JsonRpcVersionStruct,
    result: exports.JsonStruct,
});
exports.JsonRpcFailureStruct = (0, exports.object)({
    id: exports.JsonRpcIdStruct,
    jsonrpc: exports.JsonRpcVersionStruct,
    error: exports.JsonRpcErrorStruct,
});
exports.JsonRpcResponseStruct = (0, superstruct_1.union)([
    exports.JsonRpcSuccessStruct,
    exports.JsonRpcFailureStruct,
]);
/**
 * Type guard to check whether specified JSON-RPC response is a
 * {@link PendingJsonRpcResponse}.
 *
 * @param response - The JSON-RPC response to check.
 * @returns Whether the specified JSON-RPC response is pending.
 */
function isPendingJsonRpcResponse(response) {
    return (0, superstruct_1.is)(response, exports.PendingJsonRpcResponseStruct);
}
exports.isPendingJsonRpcResponse = isPendingJsonRpcResponse;
/**
 * Assert that the given value is a valid {@link PendingJsonRpcResponse} object.
 *
 * @param response - The JSON-RPC response to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link PendingJsonRpcResponse}
 * object.
 */
function assertIsPendingJsonRpcResponse(response, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(response, exports.PendingJsonRpcResponseStruct, 'Invalid pending JSON-RPC response', ErrorWrapper);
}
exports.assertIsPendingJsonRpcResponse = assertIsPendingJsonRpcResponse;
/**
 * Type guard to check if a value is a {@link JsonRpcResponse}.
 *
 * @param response - The object to check.
 * @returns Whether the object is a JsonRpcResponse.
 */
function isJsonRpcResponse(response) {
    return (0, superstruct_1.is)(response, exports.JsonRpcResponseStruct);
}
exports.isJsonRpcResponse = isJsonRpcResponse;
/**
 * Assert that the given value is a valid {@link JsonRpcResponse} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcResponse} object.
 */
function assertIsJsonRpcResponse(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(value, exports.JsonRpcResponseStruct, 'Invalid JSON-RPC response', ErrorWrapper);
}
exports.assertIsJsonRpcResponse = assertIsJsonRpcResponse;
/**
 * Check if the given value is a valid {@link JsonRpcSuccess} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcSuccess} object.
 */
function isJsonRpcSuccess(value) {
    return (0, superstruct_1.is)(value, exports.JsonRpcSuccessStruct);
}
exports.isJsonRpcSuccess = isJsonRpcSuccess;
/**
 * Assert that the given value is a valid {@link JsonRpcSuccess} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcSuccess} object.
 */
function assertIsJsonRpcSuccess(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(value, exports.JsonRpcSuccessStruct, 'Invalid JSON-RPC success response', ErrorWrapper);
}
exports.assertIsJsonRpcSuccess = assertIsJsonRpcSuccess;
/**
 * Check if the given value is a valid {@link JsonRpcFailure} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcFailure} object.
 */
function isJsonRpcFailure(value) {
    return (0, superstruct_1.is)(value, exports.JsonRpcFailureStruct);
}
exports.isJsonRpcFailure = isJsonRpcFailure;
/**
 * Assert that the given value is a valid {@link JsonRpcFailure} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcFailure} object.
 */
function assertIsJsonRpcFailure(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(value, exports.JsonRpcFailureStruct, 'Invalid JSON-RPC failure response', ErrorWrapper);
}
exports.assertIsJsonRpcFailure = assertIsJsonRpcFailure;
/**
 * Check if the given value is a valid {@link JsonRpcError} object.
 *
 * @param value - The value to check.
 * @returns Whether the given value is a valid {@link JsonRpcError} object.
 */
function isJsonRpcError(value) {
    return (0, superstruct_1.is)(value, exports.JsonRpcErrorStruct);
}
exports.isJsonRpcError = isJsonRpcError;
/**
 * Assert that the given value is a valid {@link JsonRpcError} object.
 *
 * @param value - The value to check.
 * @param ErrorWrapper - The error class to throw if the assertion fails.
 * Defaults to {@link AssertionError}.
 * @throws If the given value is not a valid {@link JsonRpcError} object.
 */
function assertIsJsonRpcError(value, 
// eslint-disable-next-line @typescript-eslint/naming-convention
ErrorWrapper) {
    (0, assert_1.assertStruct)(value, exports.JsonRpcErrorStruct, 'Invalid JSON-RPC error', ErrorWrapper);
}
exports.assertIsJsonRpcError = assertIsJsonRpcError;
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
function getJsonRpcIdValidator(options) {
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
exports.getJsonRpcIdValidator = getJsonRpcIdValidator;
//# sourceMappingURL=json.cjs.map