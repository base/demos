"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCaipChainId = exports.parseCaipAccountId = exports.parseCaipChainId = exports.isCaipAccountAddress = exports.isCaipAccountId = exports.isCaipReference = exports.isCaipNamespace = exports.isCaipChainId = exports.KnownCaipNamespace = exports.CaipAccountAddressStruct = exports.CaipAccountIdStruct = exports.CaipReferenceStruct = exports.CaipNamespaceStruct = exports.CaipChainIdStruct = exports.CAIP_ACCOUNT_ADDRESS_REGEX = exports.CAIP_ACCOUNT_ID_REGEX = exports.CAIP_REFERENCE_REGEX = exports.CAIP_NAMESPACE_REGEX = exports.CAIP_CHAIN_ID_REGEX = void 0;
const superstruct_1 = require("@metamask/superstruct");
exports.CAIP_CHAIN_ID_REGEX = /^(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})$/u;
exports.CAIP_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u;
exports.CAIP_REFERENCE_REGEX = /^[-_a-zA-Z0-9]{1,32}$/u;
exports.CAIP_ACCOUNT_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})):(?<accountAddress>[-.%a-zA-Z0-9]{1,128})$/u;
exports.CAIP_ACCOUNT_ADDRESS_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u;
/**
 * A CAIP-2 chain ID, i.e., a human-readable namespace and reference.
 */
exports.CaipChainIdStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), exports.CAIP_CHAIN_ID_REGEX);
/**
 * A CAIP-2 namespace, i.e., the first part of a CAIP chain ID.
 */
exports.CaipNamespaceStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), exports.CAIP_NAMESPACE_REGEX);
/**
 * A CAIP-2 reference, i.e., the second part of a CAIP chain ID.
 */
exports.CaipReferenceStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), exports.CAIP_REFERENCE_REGEX);
/**
 * A CAIP-10 account ID, i.e., a human-readable namespace, reference, and account address.
 */
exports.CaipAccountIdStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), exports.CAIP_ACCOUNT_ID_REGEX);
/**
 * A CAIP-10 account address, i.e., the third part of the CAIP account ID.
 */
exports.CaipAccountAddressStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), exports.CAIP_ACCOUNT_ADDRESS_REGEX);
/** Known CAIP namespaces. */
var KnownCaipNamespace;
(function (KnownCaipNamespace) {
    /** EIP-155 compatible chains. */
    KnownCaipNamespace["Eip155"] = "eip155";
})(KnownCaipNamespace = exports.KnownCaipNamespace || (exports.KnownCaipNamespace = {}));
/**
 * Check if the given value is a {@link CaipChainId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipChainId}.
 */
function isCaipChainId(value) {
    return (0, superstruct_1.is)(value, exports.CaipChainIdStruct);
}
exports.isCaipChainId = isCaipChainId;
/**
 * Check if the given value is a {@link CaipNamespace}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipNamespace}.
 */
function isCaipNamespace(value) {
    return (0, superstruct_1.is)(value, exports.CaipNamespaceStruct);
}
exports.isCaipNamespace = isCaipNamespace;
/**
 * Check if the given value is a {@link CaipReference}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipReference}.
 */
function isCaipReference(value) {
    return (0, superstruct_1.is)(value, exports.CaipReferenceStruct);
}
exports.isCaipReference = isCaipReference;
/**
 * Check if the given value is a {@link CaipAccountId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAccountId}.
 */
function isCaipAccountId(value) {
    return (0, superstruct_1.is)(value, exports.CaipAccountIdStruct);
}
exports.isCaipAccountId = isCaipAccountId;
/**
 * Check if a value is a {@link CaipAccountAddress}.
 *
 * @param value - The value to validate.
 * @returns True if the value is a valid {@link CaipAccountAddress}.
 */
function isCaipAccountAddress(value) {
    return (0, superstruct_1.is)(value, exports.CaipAccountAddressStruct);
}
exports.isCaipAccountAddress = isCaipAccountAddress;
/**
 * Parse a CAIP-2 chain ID to an object containing the namespace and reference.
 * This validates the CAIP-2 chain ID before parsing it.
 *
 * @param caipChainId - The CAIP-2 chain ID to validate and parse.
 * @returns The parsed CAIP-2 chain ID.
 */
function parseCaipChainId(caipChainId) {
    const match = exports.CAIP_CHAIN_ID_REGEX.exec(caipChainId);
    if (!match?.groups) {
        throw new Error('Invalid CAIP chain ID.');
    }
    return {
        namespace: match.groups.namespace,
        reference: match.groups.reference,
    };
}
exports.parseCaipChainId = parseCaipChainId;
/**
 * Parse an CAIP-10 account ID to an object containing the chain ID, parsed chain ID, and account address.
 * This validates the CAIP-10 account ID before parsing it.
 *
 * @param caipAccountId - The CAIP-10 account ID to validate and parse.
 * @returns The parsed CAIP-10 account ID.
 */
function parseCaipAccountId(caipAccountId) {
    const match = exports.CAIP_ACCOUNT_ID_REGEX.exec(caipAccountId);
    if (!match?.groups) {
        throw new Error('Invalid CAIP account ID.');
    }
    return {
        address: match.groups.accountAddress,
        chainId: match.groups.chainId,
        chain: {
            namespace: match.groups.namespace,
            reference: match.groups.reference,
        },
    };
}
exports.parseCaipAccountId = parseCaipAccountId;
/**
 * Chain ID as defined per the CAIP-2
 * {@link https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md}.
 *
 * It defines a way to uniquely identify any blockchain in a human-readable
 * way.
 *
 * @param namespace - The standard (ecosystem) of similar blockchains.
 * @param reference - Identify of a blockchain within a given namespace.
 * @throws {@link Error}
 * This exception is thrown if the inputs does not comply with the CAIP-2
 * syntax specification
 * {@link https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md#syntax}.
 * @returns A CAIP chain ID.
 */
function toCaipChainId(namespace, reference) {
    if (!isCaipNamespace(namespace)) {
        throw new Error(`Invalid "namespace", must match: ${exports.CAIP_NAMESPACE_REGEX.toString()}`);
    }
    if (!isCaipReference(reference)) {
        throw new Error(`Invalid "reference", must match: ${exports.CAIP_REFERENCE_REGEX.toString()}`);
    }
    return `${namespace}:${reference}`;
}
exports.toCaipChainId = toCaipChainId;
//# sourceMappingURL=caip-types.cjs.map