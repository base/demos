import { EncryptedData } from '../core/message/RPCMessage.js';
import { RPCRequest } from '../core/message/RPCRequest.js';
import { RPCResponse } from '../core/message/RPCResponse.js';
export declare function generateKeyPair(): Promise<CryptoKeyPair>;
export declare function deriveSharedSecret(ownPrivateKey: CryptoKey, peerPublicKey: CryptoKey): Promise<CryptoKey>;
export declare function encrypt(sharedSecret: CryptoKey, plainText: string): Promise<EncryptedData>;
export declare function decrypt(sharedSecret: CryptoKey, { iv, cipherText }: EncryptedData): Promise<string>;
export declare function exportKeyToHexString(type: 'public' | 'private', key: CryptoKey): Promise<string>;
export declare function importKeyFromHexString(type: 'public' | 'private', hexString: string): Promise<CryptoKey>;
export declare function encryptContent(content: RPCRequest | RPCResponse, sharedSecret: CryptoKey): Promise<EncryptedData>;
export declare function decryptContent<R extends RPCRequest | RPCResponse>(encryptedData: EncryptedData, sharedSecret: CryptoKey): Promise<R>;
//# sourceMappingURL=cipher.d.ts.map