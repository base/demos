export interface Keypair {
    secretKey: Uint8Array;
    publicKey: Uint8Array;
}
export declare function generateKeyPair(seed?: Uint8Array): Keypair;
export declare function signJWT(sub: string, aud: string, ttl: number, keyPair: Keypair, iat?: number): Promise<string>;
export declare function verifyJWT(jwt: string): Promise<boolean>;
//# sourceMappingURL=api.d.ts.map