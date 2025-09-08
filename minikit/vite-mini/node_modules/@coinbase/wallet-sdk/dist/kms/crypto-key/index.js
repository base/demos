import { Hex, PublicKey, Signature, WebAuthnP256, WebCryptoP256 } from 'ox';
import { hashMessage, hashTypedData } from 'viem';
import { createStorage } from './storage.js';
// *****************************************************************
// Constants
// *****************************************************************
export const STORAGE_SCOPE = 'cbwsdk';
export const STORAGE_NAME = 'keys';
export const ACTIVE_ID_KEY = 'activeId';
// *****************************************************************
// Storage
// *****************************************************************
export const storage = createStorage(STORAGE_SCOPE, STORAGE_NAME);
// *****************************************************************
// Functions
// *****************************************************************
export async function generateKeyPair() {
    const keypair = await WebCryptoP256.createKeyPair({ extractable: false });
    const publicKey = Hex.slice(PublicKey.toHex(keypair.publicKey), 1);
    await storage.setItem(publicKey, keypair);
    await storage.setItem(ACTIVE_ID_KEY, publicKey);
    return keypair;
}
export async function getKeypair() {
    const id = await storage.getItem(ACTIVE_ID_KEY);
    if (!id) {
        return null;
    }
    const keypair = await storage.getItem(id);
    if (!keypair) {
        return null;
    }
    return keypair;
}
async function getOrCreateKeypair() {
    const keypair = await getKeypair();
    if (!keypair) {
        const kp = await generateKeyPair();
        const pubKey = Hex.slice(PublicKey.toHex(kp.publicKey), 1);
        await storage.setItem(pubKey, kp);
        await storage.setItem(ACTIVE_ID_KEY, pubKey);
        return kp;
    }
    return keypair;
}
async function getAccount() {
    const keypair = await getOrCreateKeypair();
    /**
     * public key / address
     */
    const publicKey = Hex.slice(PublicKey.toHex(keypair.publicKey), 1);
    const sign = async (payload) => {
        const { payload: message, metadata } = WebAuthnP256.getSignPayload({
            challenge: payload,
            origin: 'https://keys.coinbase.com',
            userVerification: 'preferred',
        });
        const signature = await WebCryptoP256.sign({
            payload: message,
            privateKey: keypair.privateKey,
        });
        return {
            signature: Signature.toHex(signature),
            raw: {}, // type changed in viem
            webauthn: metadata,
        };
    };
    return {
        id: publicKey,
        publicKey,
        async sign({ hash }) {
            return sign(hash);
        },
        async signMessage({ message }) {
            return sign(hashMessage(message));
        },
        async signTypedData(parameters) {
            return sign(hashTypedData(parameters));
        },
        type: 'webAuthn',
    };
}
export async function getCryptoKeyAccount() {
    const account = await getAccount();
    return {
        account,
    };
}
export async function removeCryptoKey() {
    const keypair = await getKeypair();
    if (!keypair) {
        return;
    }
    await storage.removeItem(Hex.slice(PublicKey.toHex(keypair.publicKey), 1));
    await storage.removeItem(ACTIVE_ID_KEY);
}
//# sourceMappingURL=index.js.map