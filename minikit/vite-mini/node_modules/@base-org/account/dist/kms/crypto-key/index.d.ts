import { PublicKey } from 'ox';
import { LocalAccount, OneOf } from 'viem';
import { type WebAuthnAccount } from 'viem/account-abstraction';
export type P256KeyPair = {
    privateKey: CryptoKey;
    publicKey: PublicKey.PublicKey;
};
export declare const STORAGE_SCOPE = "base-acc-sdk";
export declare const STORAGE_NAME = "keys";
export declare const ACTIVE_ID_KEY = "activeId";
export declare const storage: import("./storage.js").AsyncStorage;
export declare function generateKeyPair(): Promise<P256KeyPair>;
export declare function getKeypair(): Promise<P256KeyPair | null>;
export declare function getCryptoKeyAccount(): Promise<{
    account: OneOf<WebAuthnAccount | LocalAccount> | null;
}>;
export declare function removeCryptoKey(): Promise<void>;
//# sourceMappingURL=index.d.ts.map