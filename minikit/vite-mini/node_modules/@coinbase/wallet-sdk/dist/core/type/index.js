export function OpaqueType() {
    return (value) => value;
}
export const HexString = OpaqueType();
export const BigIntString = OpaqueType();
export function IntNumber(num) {
    return Math.floor(num);
}
export const RegExpString = OpaqueType();
//# sourceMappingURL=index.js.map