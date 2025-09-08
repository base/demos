import type { Infer } from "@metamask/superstruct";
export declare const CAIP_CHAIN_ID_REGEX: RegExp;
export declare const CAIP_NAMESPACE_REGEX: RegExp;
export declare const CAIP_REFERENCE_REGEX: RegExp;
export declare const CAIP_ACCOUNT_ID_REGEX: RegExp;
export declare const CAIP_ACCOUNT_ADDRESS_REGEX: RegExp;
/**
 * A CAIP-2 chain ID, i.e., a human-readable namespace and reference.
 */
export declare const CaipChainIdStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipChainId = `${string}:${string}`;
/**
 * A CAIP-2 namespace, i.e., the first part of a CAIP chain ID.
 */
export declare const CaipNamespaceStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipNamespace = Infer<typeof CaipNamespaceStruct>;
/**
 * A CAIP-2 reference, i.e., the second part of a CAIP chain ID.
 */
export declare const CaipReferenceStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipReference = Infer<typeof CaipReferenceStruct>;
/**
 * A CAIP-10 account ID, i.e., a human-readable namespace, reference, and account address.
 */
export declare const CaipAccountIdStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipAccountId = `${string}:${string}:${string}`;
/**
 * A CAIP-10 account address, i.e., the third part of the CAIP account ID.
 */
export declare const CaipAccountAddressStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipAccountAddress = Infer<typeof CaipAccountAddressStruct>;
/** Known CAIP namespaces. */
export declare enum KnownCaipNamespace {
    /** EIP-155 compatible chains. */
    Eip155 = "eip155"
}
/**
 * Check if the given value is a {@link CaipChainId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipChainId}.
 */
export declare function isCaipChainId(value: unknown): value is CaipChainId;
/**
 * Check if the given value is a {@link CaipNamespace}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipNamespace}.
 */
export declare function isCaipNamespace(value: unknown): value is CaipNamespace;
/**
 * Check if the given value is a {@link CaipReference}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipReference}.
 */
export declare function isCaipReference(value: unknown): value is CaipReference;
/**
 * Check if the given value is a {@link CaipAccountId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAccountId}.
 */
export declare function isCaipAccountId(value: unknown): value is CaipAccountId;
/**
 * Check if a value is a {@link CaipAccountAddress}.
 *
 * @param value - The value to validate.
 * @returns True if the value is a valid {@link CaipAccountAddress}.
 */
export declare function isCaipAccountAddress(value: unknown): value is CaipAccountAddress;
/**
 * Parse a CAIP-2 chain ID to an object containing the namespace and reference.
 * This validates the CAIP-2 chain ID before parsing it.
 *
 * @param caipChainId - The CAIP-2 chain ID to validate and parse.
 * @returns The parsed CAIP-2 chain ID.
 */
export declare function parseCaipChainId(caipChainId: CaipChainId): {
    namespace: CaipNamespace;
    reference: CaipReference;
};
/**
 * Parse an CAIP-10 account ID to an object containing the chain ID, parsed chain ID, and account address.
 * This validates the CAIP-10 account ID before parsing it.
 *
 * @param caipAccountId - The CAIP-10 account ID to validate and parse.
 * @returns The parsed CAIP-10 account ID.
 */
export declare function parseCaipAccountId(caipAccountId: CaipAccountId): {
    address: CaipAccountAddress;
    chainId: CaipChainId;
    chain: {
        namespace: CaipNamespace;
        reference: CaipReference;
    };
};
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
export declare function toCaipChainId(namespace: CaipNamespace, reference: CaipReference): CaipChainId;
//# sourceMappingURL=caip-types.d.mts.map