import { is, pattern, string } from "@metamask/superstruct";
export const CAIP_CHAIN_ID_REGEX = /^(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})$/u;
export const CAIP_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u;
export const CAIP_REFERENCE_REGEX = /^[-_a-zA-Z0-9]{1,32}$/u;
export const CAIP_ACCOUNT_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})):(?<accountAddress>[-.%a-zA-Z0-9]{1,128})$/u;
export const CAIP_ACCOUNT_ADDRESS_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u;
export const CAIP_ASSET_TYPE_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u;
export const CAIP_ASSET_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})\/(?<tokenId>[-.%a-zA-Z0-9]{1,78})$/u;
/**
 * A CAIP-2 chain ID, i.e., a human-readable namespace and reference.
 */
export const CaipChainIdStruct = pattern(string(), CAIP_CHAIN_ID_REGEX);
/**
 * A CAIP-2 namespace, i.e., the first part of a CAIP chain ID.
 */
export const CaipNamespaceStruct = pattern(string(), CAIP_NAMESPACE_REGEX);
/**
 * A CAIP-2 reference, i.e., the second part of a CAIP chain ID.
 */
export const CaipReferenceStruct = pattern(string(), CAIP_REFERENCE_REGEX);
/**
 * A CAIP-10 account ID, i.e., a human-readable namespace, reference, and account address.
 */
export const CaipAccountIdStruct = pattern(string(), CAIP_ACCOUNT_ID_REGEX);
/**
 * A CAIP-10 account address, i.e., the third part of the CAIP account ID.
 */
export const CaipAccountAddressStruct = pattern(string(), CAIP_ACCOUNT_ADDRESS_REGEX);
/**
 * A CAIP-19 asset type identifier, i.e., a human-readable type of asset identifier.
 */
export const CaipAssetTypeStruct = pattern(string(), CAIP_ASSET_TYPE_REGEX);
/**
 * A CAIP-19 asset ID identifier, i.e., a human-readable type of asset ID.
 */
export const CaipAssetIdStruct = pattern(string(), CAIP_ASSET_ID_REGEX);
/** Known CAIP namespaces. */
export var KnownCaipNamespace;
(function (KnownCaipNamespace) {
    /** BIP-122 (Bitcoin) compatible chains. */
    KnownCaipNamespace["Bip122"] = "bip122";
    /** EIP-155 compatible chains. */
    KnownCaipNamespace["Eip155"] = "eip155";
    KnownCaipNamespace["Wallet"] = "wallet";
})(KnownCaipNamespace = KnownCaipNamespace || (KnownCaipNamespace = {}));
/**
 * Check if the given value is a {@link CaipChainId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipChainId}.
 */
export function isCaipChainId(value) {
    return is(value, CaipChainIdStruct);
}
/**
 * Check if the given value is a {@link CaipNamespace}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipNamespace}.
 */
export function isCaipNamespace(value) {
    return is(value, CaipNamespaceStruct);
}
/**
 * Check if the given value is a {@link CaipReference}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipReference}.
 */
export function isCaipReference(value) {
    return is(value, CaipReferenceStruct);
}
/**
 * Check if the given value is a {@link CaipAccountId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAccountId}.
 */
export function isCaipAccountId(value) {
    return is(value, CaipAccountIdStruct);
}
/**
 * Check if a value is a {@link CaipAccountAddress}.
 *
 * @param value - The value to validate.
 * @returns True if the value is a valid {@link CaipAccountAddress}.
 */
export function isCaipAccountAddress(value) {
    return is(value, CaipAccountAddressStruct);
}
/**
 * Check if the given value is a {@link CaipAssetType}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetType}.
 */
export function isCaipAssetType(value) {
    return is(value, CaipAssetTypeStruct);
}
/**
 * Check if the given value is a {@link CaipAssetId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetId}.
 */
export function isCaipAssetId(value) {
    return is(value, CaipAssetIdStruct);
}
/**
 * Parse a CAIP-2 chain ID to an object containing the namespace and reference.
 * This validates the CAIP-2 chain ID before parsing it.
 *
 * @param caipChainId - The CAIP-2 chain ID to validate and parse.
 * @returns The parsed CAIP-2 chain ID.
 */
export function parseCaipChainId(caipChainId) {
    const match = CAIP_CHAIN_ID_REGEX.exec(caipChainId);
    if (!match?.groups) {
        throw new Error('Invalid CAIP chain ID.');
    }
    return {
        namespace: match.groups.namespace,
        reference: match.groups.reference,
    };
}
/**
 * Parse an CAIP-10 account ID to an object containing the chain ID, parsed chain ID, and account address.
 * This validates the CAIP-10 account ID before parsing it.
 *
 * @param caipAccountId - The CAIP-10 account ID to validate and parse.
 * @returns The parsed CAIP-10 account ID.
 */
export function parseCaipAccountId(caipAccountId) {
    const match = CAIP_ACCOUNT_ID_REGEX.exec(caipAccountId);
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
export function toCaipChainId(namespace, reference) {
    if (!isCaipNamespace(namespace)) {
        throw new Error(`Invalid "namespace", must match: ${CAIP_NAMESPACE_REGEX.toString()}`);
    }
    if (!isCaipReference(reference)) {
        throw new Error(`Invalid "reference", must match: ${CAIP_REFERENCE_REGEX.toString()}`);
    }
    return `${namespace}:${reference}`;
}
//# sourceMappingURL=caip-types.mjs.map