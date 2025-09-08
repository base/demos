export namespace TYPED_MESSAGE_SCHEMA {
    export let type: string;
    export namespace properties {
        namespace types {
            let type_1: string;
            export { type_1 as type };
            export namespace additionalProperties {
                let type_2: string;
                export { type_2 as type };
                export namespace items {
                    let type_3: string;
                    export { type_3 as type };
                    export namespace properties_1 {
                        export namespace name {
                            let type_4: string;
                            export { type_4 as type };
                        }
                        export namespace type_5 {
                            let type_6: string;
                            export { type_6 as type };
                        }
                        export { type_5 as type };
                    }
                    export { properties_1 as properties };
                    export let required: string[];
                }
            }
        }
        namespace primaryType {
            let type_7: string;
            export { type_7 as type };
        }
        namespace domain {
            let type_8: string;
            export { type_8 as type };
        }
        namespace message {
            let type_9: string;
            export { type_9 as type };
        }
    }
    let required_1: string[];
    export { required_1 as required };
}
export namespace TypedDataUtils {
    /**
     * Encodes an object by encoding and concatenating each of its members
     *
     * @param {string} primaryType - Root type
     * @param {Object} data - Object to encode
     * @param {Object} types - Type definitions
     * @returns {string} - Encoded representation of an object
     */
    function encodeData(primaryType: string, data: Object, types: Object, useV4?: boolean): string;
    /**
     * Encodes the type of an object by encoding a comma delimited list of its members
     *
     * @param {string} primaryType - Root type to encode
     * @param {Object} types - Type definitions
     * @returns {string} - Encoded representation of the type of an object
     */
    function encodeType(primaryType: string, types: Object): string;
    /**
     * Finds all types within a type definition object
     *
     * @param {string} primaryType - Root type
     * @param {Object} types - Type definitions
     * @param {Array} results - current set of accumulated types
     * @returns {Array} - Set of all types found in the type definition
     */
    function findTypeDependencies(primaryType: string, types: Object, results?: any[]): any[];
    /**
     * Hashes an object
     *
     * @param {string} primaryType - Root type
     * @param {Object} data - Object to hash
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Hash of an object
     */
    function hashStruct(primaryType: string, data: Object, types: Object, useV4?: boolean): Buffer;
    /**
     * Hashes the type of an object
     *
     * @param {string} primaryType - Root type to hash
     * @param {Object} types - Type definitions
     * @returns {string} - Hash of an object
     */
    function hashType(primaryType: string, types: Object): string;
    /**
     * Removes properties from a message object that are not defined per EIP-712
     *
     * @param {Object} data - typed message object
     * @returns {Object} - typed message object with only allowed fields
     */
    function sanitizeData(data: Object): Object;
    /**
     * Returns the hash of a typed message as per EIP-712 for signing
     *
     * @param {Object} typedData - Types message data to sign
     * @returns {string} - sha3 hash for signing
     */
    function hash(typedData: Object, useV4?: boolean): string;
}
export declare function hashForSignTypedDataLegacy(msgParams: any): Buffer;
export declare function hashForSignTypedData_v3(msgParams: any): string;
export declare function hashForSignTypedData_v4(msgParams: any): string;
//# sourceMappingURL=index.d.cts.map