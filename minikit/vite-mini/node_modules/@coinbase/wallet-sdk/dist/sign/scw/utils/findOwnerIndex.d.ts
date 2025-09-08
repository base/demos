import { Client, Hex } from 'viem';
type FindOwnerIndexParams = {
    /**
     * The address of the account to get the owner index for
     */
    address: `0x${string}`;
    /**
     * The client to use to get the code and read the contract
     */
    client: Client;
    /**
     * The public key of the owner
     */
    publicKey: Hex;
    /**
     * The address of the factory
     */
    factory?: `0x${string}`;
    /**
     * The data of the factory
     */
    factoryData?: Hex;
};
export declare function findOwnerIndex({ address, client, publicKey, factory, factoryData, }: FindOwnerIndexParams): Promise<number>;
/**
 * Formats 20 byte addresses to 32 byte public keys. Contract uses 32 byte keys for owners.
 * @param publicKey - The public key to format
 * @returns The formatted public key
 */
export declare function formatPublicKey(publicKey: Hex): Hex;
export {};
//# sourceMappingURL=findOwnerIndex.d.ts.map