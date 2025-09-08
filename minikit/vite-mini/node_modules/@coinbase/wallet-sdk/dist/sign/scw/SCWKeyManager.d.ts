export declare class SCWKeyManager {
    private ownPrivateKey;
    private ownPublicKey;
    private peerPublicKey;
    private sharedSecret;
    getOwnPublicKey(): Promise<CryptoKey>;
    getSharedSecret(): Promise<CryptoKey | null>;
    setPeerPublicKey(key: CryptoKey): Promise<void>;
    clear(): Promise<void>;
    private generateKeyPair;
    private loadKeysIfNeeded;
    private loadKey;
    private storeKey;
}
//# sourceMappingURL=SCWKeyManager.d.ts.map