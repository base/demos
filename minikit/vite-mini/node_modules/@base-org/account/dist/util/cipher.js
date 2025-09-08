import { hexStringToUint8Array, uint8ArrayToHex } from '../core/type/util.js';
export async function generateKeyPair() {
    return crypto.subtle.generateKey({
        name: 'ECDH',
        namedCurve: 'P-256',
    }, true, ['deriveKey']);
}
export async function deriveSharedSecret(ownPrivateKey, peerPublicKey) {
    return crypto.subtle.deriveKey({
        name: 'ECDH',
        public: peerPublicKey,
    }, ownPrivateKey, {
        name: 'AES-GCM',
        length: 256,
    }, false, ['encrypt', 'decrypt']);
}
export async function encrypt(sharedSecret, plainText) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipherText = await crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv,
    }, sharedSecret, new TextEncoder().encode(plainText));
    return { iv, cipherText };
}
export async function decrypt(sharedSecret, { iv, cipherText }) {
    const plainText = await crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv,
    }, sharedSecret, cipherText);
    return new TextDecoder().decode(plainText);
}
function getFormat(keyType) {
    switch (keyType) {
        case 'public':
            return 'spki';
        case 'private':
            return 'pkcs8';
    }
}
export async function exportKeyToHexString(type, key) {
    const format = getFormat(type);
    const exported = await crypto.subtle.exportKey(format, key);
    return uint8ArrayToHex(new Uint8Array(exported));
}
export async function importKeyFromHexString(type, hexString) {
    const format = getFormat(type);
    const arrayBuffer = hexStringToUint8Array(hexString).buffer;
    return await crypto.subtle.importKey(format, new Uint8Array(arrayBuffer), {
        name: 'ECDH',
        namedCurve: 'P-256',
    }, true, type === 'private' ? ['deriveKey'] : []);
}
export async function encryptContent(content, sharedSecret) {
    const serialized = JSON.stringify(content, (_, value) => {
        if (!(value instanceof Error))
            return value;
        const error = value;
        return Object.assign(Object.assign({}, (error.code ? { code: error.code } : {})), { message: error.message });
    });
    return encrypt(sharedSecret, serialized);
}
export async function decryptContent(encryptedData, sharedSecret) {
    return JSON.parse(await decrypt(sharedSecret, encryptedData));
}
//# sourceMappingURL=cipher.js.map