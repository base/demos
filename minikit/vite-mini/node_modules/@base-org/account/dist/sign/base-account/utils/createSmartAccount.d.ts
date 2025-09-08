import type { Address } from 'abitype';
import type * as WebAuthnP256 from 'ox/WebAuthnP256';
import { Assign, Chain, type Client, type Hash, type Hex, JsonRpcAccount, LocalAccount, type Prettify, Transport } from 'viem';
import { type SmartAccount, type SmartAccountImplementation, entryPoint06Abi } from 'viem/account-abstraction';
import { OwnerAccount } from '../../../core/type/index.js';
import { abi, factoryAbi } from './constants.js';
export type CreateSmartAccountParameters = {
    address: Address;
    client: Client<Transport, Chain | undefined, JsonRpcAccount | LocalAccount | undefined>;
    factoryData: Hex | undefined;
    ownerIndex: number;
    owner: OwnerAccount;
};
export type CreateSmartAccountReturnType = Prettify<SmartAccount<CoinbaseSmartAccountImplementation>>;
export type CoinbaseSmartAccountImplementation = Assign<SmartAccountImplementation<typeof entryPoint06Abi, '0.6', {
    abi: typeof abi;
    factory: {
        abi: typeof factoryAbi;
        address: Address;
    };
}>, {
    decodeCalls: NonNullable<SmartAccountImplementation['decodeCalls']>;
    sign: NonNullable<SmartAccountImplementation['sign']>;
}>;
/**
 * @description Create a Coinbase Smart Account.
 *
 * @param parameters - {@link CreateSmartAccountParameters}
 * @returns Coinbase Smart Account. {@link CreateSmartAccountReturnType}
 *
 * @example
 *
 * const account = createSmartAccount({
 *   client,
 *   owner: privateKeyToAccount('0x...'),
 *   ownerIndex: 0,
 *   address: '0x...',
 *   factoryData: '0x...',
 * })
 */
export declare function createSmartAccount(parameters: CreateSmartAccountParameters): Promise<CreateSmartAccountReturnType>;
/** @internal */
export declare function sign({ hash, owner, }: {
    hash: Hash;
    owner: OwnerAccount;
}): Promise<`0x${string}`>;
/** @internal */
export declare function toReplaySafeHash({ address, chainId, hash, }: {
    address: Address;
    chainId: number;
    hash: Hash;
}): `0x${string}`;
/** @internal */
export declare function toWebAuthnSignature({ webauthn, signature, }: {
    webauthn: WebAuthnP256.SignMetadata;
    signature: Hex;
}): `0x${string}`;
/** @internal */
export declare function wrapSignature(parameters: {
    ownerIndex?: number | undefined;
    signature: Hex;
}): `0x${string}`;
//# sourceMappingURL=createSmartAccount.d.ts.map