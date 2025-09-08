import { store } from '../../store/store.js';
import { deriveSharedSecret, exportKeyToHexString, generateKeyPair, importKeyFromHexString, } from '../../util/cipher.js';
const OWN_PRIVATE_KEY = {
    storageKey: 'ownPrivateKey',
    keyType: 'private',
};
const OWN_PUBLIC_KEY = {
    storageKey: 'ownPublicKey',
    keyType: 'public',
};
const PEER_PUBLIC_KEY = {
    storageKey: 'peerPublicKey',
    keyType: 'public',
};
export class SCWKeyManager {
    constructor() {
        this.ownPrivateKey = null;
        this.ownPublicKey = null;
        this.peerPublicKey = null;
        this.sharedSecret = null;
    }
    async getOwnPublicKey() {
        await this.loadKeysIfNeeded();
        return this.ownPublicKey;
    }
    // returns null if the shared secret is not yet derived
    async getSharedSecret() {
        await this.loadKeysIfNeeded();
        return this.sharedSecret;
    }
    async setPeerPublicKey(key) {
        this.sharedSecret = null;
        this.peerPublicKey = key;
        await this.storeKey(PEER_PUBLIC_KEY, key);
        await this.loadKeysIfNeeded();
    }
    async clear() {
        this.ownPrivateKey = null;
        this.ownPublicKey = null;
        this.peerPublicKey = null;
        this.sharedSecret = null;
        store.keys.clear();
    }
    async generateKeyPair() {
        const newKeyPair = await generateKeyPair();
        this.ownPrivateKey = newKeyPair.privateKey;
        this.ownPublicKey = newKeyPair.publicKey;
        await this.storeKey(OWN_PRIVATE_KEY, newKeyPair.privateKey);
        await this.storeKey(OWN_PUBLIC_KEY, newKeyPair.publicKey);
    }
    async loadKeysIfNeeded() {
        if (this.ownPrivateKey === null) {
            this.ownPrivateKey = await this.loadKey(OWN_PRIVATE_KEY);
        }
        if (this.ownPublicKey === null) {
            this.ownPublicKey = await this.loadKey(OWN_PUBLIC_KEY);
        }
        if (this.ownPrivateKey === null || this.ownPublicKey === null) {
            await this.generateKeyPair();
        }
        if (this.peerPublicKey === null) {
            this.peerPublicKey = await this.loadKey(PEER_PUBLIC_KEY);
        }
        if (this.sharedSecret === null) {
            if (this.ownPrivateKey === null || this.peerPublicKey === null)
                return;
            this.sharedSecret = await deriveSharedSecret(this.ownPrivateKey, this.peerPublicKey);
        }
    }
    // storage methods
    async loadKey(item) {
        const key = store.keys.get(item.storageKey);
        if (!key)
            return null;
        return importKeyFromHexString(item.keyType, key);
    }
    async storeKey(item, key) {
        const hexString = await exportKeyToHexString(item.keyType, key);
        store.keys.set(item.storageKey, hexString);
    }
}
//# sourceMappingURL=SCWKeyManager.js.map