import { LocalAccount, OneOf } from 'viem';
import { WebAuthnAccount } from 'viem/account-abstraction';
interface Tag<T extends string, RealType> {
    __tag__: T;
    __realType__: RealType;
}
export type OpaqueType<T extends string, U> = U & Tag<T, U>;
export declare function OpaqueType<T extends Tag<string, unknown>>(): (value: T extends Tag<string, infer U> ? U : never) => T;
export type HexString = OpaqueType<'HexString', string>;
export declare const HexString: (value: string) => HexString;
export type BigIntString = OpaqueType<'BigIntString', string>;
export declare const BigIntString: (value: string) => BigIntString;
export type IntNumber = OpaqueType<'IntNumber', number>;
export declare function IntNumber(num: number): IntNumber;
export type RegExpString = OpaqueType<'RegExpString', string>;
export declare const RegExpString: (value: string) => RegExpString;
export type Callback<T> = (err: Error | null, result: T | null) => void;
export type Address = `0x${string}`;
export type OwnerAccount = OneOf<LocalAccount | WebAuthnAccount>;
export {};
//# sourceMappingURL=index.d.ts.map