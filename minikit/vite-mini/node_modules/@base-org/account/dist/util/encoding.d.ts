import { WebAuthnP256 } from 'ox';
import { ByteArray, Hex } from 'viem';
export declare function base64ToBase64Url(base64: string): string;
export declare function arrayBufferToBase64Url(buffer: ArrayBuffer | ByteArray): string;
export declare function convertCredentialToJSON({ webauthn, signature, id, }: {
    signature: Hex;
    webauthn: WebAuthnP256.SignMetadata;
    id: string;
}): {
    id: string;
    rawId: string;
    response: {
        authenticatorData: string;
        clientDataJSON: string;
        signature: string;
    };
    type: any;
};
export declare function asn1EncodeSignature(r: bigint, s: bigint): Uint8Array;
//# sourceMappingURL=encoding.d.ts.map