"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCipher = exports.Hash = exports.nextTick = exports.isLE = exports.createView = exports.u32 = exports.u8 = void 0;
exports.bytesToHex = bytesToHex;
exports.hexToBytes = hexToBytes;
exports.hexToNumber = hexToNumber;
exports.bytesToNumberBE = bytesToNumberBE;
exports.numberToBytesBE = numberToBytesBE;
exports.utf8ToBytes = utf8ToBytes;
exports.bytesToUtf8 = bytesToUtf8;
exports.toBytes = toBytes;
exports.overlapBytes = overlapBytes;
exports.complexOverlapBytes = complexOverlapBytes;
exports.concatBytes = concatBytes;
exports.checkOpts = checkOpts;
exports.equalBytes = equalBytes;
exports.getOutput = getOutput;
exports.setBigUint64 = setBigUint64;
exports.u64Lengths = u64Lengths;
exports.isAligned32 = isAligned32;
exports.copyBytes = copyBytes;
exports.clean = clean;
/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
const _assert_js_1 = require("./_assert.js");
// Cast array to different type
const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
exports.u8 = u8;
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
exports.u32 = u32;
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
exports.createView = createView;
// big-endian hardware is rare. Just in case someone still decides to run ciphers:
// early-throw an error because we don't support BE yet.
exports.isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
if (!exports.isLE)
    throw new Error('Non little-endian hardware is not supported');
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex(bytes) {
    (0, _assert_js_1.abytes)(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
function hexToNumber(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    return BigInt(hex === '' ? '0' : '0x' + hex); // Big Endian
}
// BE: Big Endian, LE: Little Endian
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
}
function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, '0'));
}
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const nextTick = async () => { };
exports.nextTick = nextTick;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * @example bytesToUtf8(new Uint8Array([97, 98, 99])) // 'abc'
 */
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    else if ((0, _assert_js_1.isBytes)(data))
        data = copyBytes(data);
    else
        throw new Error('Uint8Array expected, got ' + typeof data);
    return data;
}
/**
 * Checks if two U8A use same underlying buffer and overlaps (will corrupt and break if input and output same)
 */
function overlapBytes(a, b) {
    return (a.buffer === b.buffer && // probably will fail with some obscure proxies, but this is best we can do
        a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
        b.byteOffset < a.byteOffset + a.byteLength // b starts before a end
    );
}
/**
 * If input and output overlap and input starts before output, we will overwrite end of input before
 * we start processing it, so this is not supported for most ciphers (except chacha/salse, which designed with this)
 */
function complexOverlapBytes(input, output) {
    // This is very cursed. It works somehow, but I'm completely unsure,
    // reasoning about overlapping aligned windows is very hard.
    if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
        throw new Error('complex overlap of input and output is not supported');
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0, _assert_js_1.abytes)(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts == null || typeof opts !== 'object')
        throw new Error('options must be defined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
// Compares 2 u8a-s in kinda constant time
function equalBytes(a, b) {
    if (a.length !== b.length)
        return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
        diff |= a[i] ^ b[i];
    return diff === 0;
}
// For runtime check if class implements interface
class Hash {
}
exports.Hash = Hash;
/**
 * @__NO_SIDE_EFFECTS__
 */
const wrapCipher = (params, constructor) => {
    function wrappedCipher(key, ...args) {
        // Validate key
        (0, _assert_js_1.abytes)(key);
        // Validate nonce if nonceLength is present
        if (params.nonceLength !== undefined) {
            const nonce = args[0];
            if (!nonce)
                throw new Error('nonce / iv required');
            if (params.varSizeNonce)
                (0, _assert_js_1.abytes)(nonce);
            else
                (0, _assert_js_1.abytes)(nonce, params.nonceLength);
        }
        // Validate AAD if tagLength present
        const tagl = params.tagLength;
        if (tagl && args[1] !== undefined) {
            (0, _assert_js_1.abytes)(args[1]);
        }
        const cipher = constructor(key, ...args);
        const checkOutput = (fnLength, output) => {
            if (output !== undefined) {
                if (fnLength !== 2)
                    throw new Error('cipher output not supported');
                (0, _assert_js_1.abytes)(output);
            }
        };
        // Create wrapped cipher with validation and single-use encryption
        let called = false;
        const wrCipher = {
            encrypt(data, output) {
                if (called)
                    throw new Error('cannot encrypt() twice with same key + nonce');
                called = true;
                (0, _assert_js_1.abytes)(data);
                checkOutput(cipher.encrypt.length, output);
                return cipher.encrypt(data, output);
            },
            decrypt(data, output) {
                (0, _assert_js_1.abytes)(data);
                if (tagl && data.length < tagl)
                    throw new Error('invalid ciphertext length: smaller than tagLength=' + tagl);
                checkOutput(cipher.decrypt.length, output);
                return cipher.decrypt(data, output);
            },
        };
        return wrCipher;
    }
    Object.assign(wrappedCipher, params);
    return wrappedCipher;
};
exports.wrapCipher = wrapCipher;
function getOutput(expectedLength, out, onlyAligned = true) {
    if (out === undefined)
        return new Uint8Array(expectedLength);
    if (out.length !== expectedLength)
        throw new Error('invalid output length, expected ' + expectedLength + ', got: ' + out.length);
    if (onlyAligned && !isAligned32(out))
        throw new Error('invalid output, must be aligned');
    return out;
}
// Polyfill for Safari 14
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
function u64Lengths(ciphertext, AAD) {
    const num = new Uint8Array(16);
    const view = (0, exports.createView)(num);
    setBigUint64(view, 0, BigInt(AAD ? AAD.length : 0), true);
    setBigUint64(view, 8, BigInt(ciphertext.length), true);
    return num;
}
// Is byte array aligned to 4 byte offset (u32)?
function isAligned32(bytes) {
    return bytes.byteOffset % 4 === 0;
}
// copy bytes to new u8a (aligned). Because Buffer.slice is broken.
function copyBytes(bytes) {
    return Uint8Array.from(bytes);
}
function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
    }
}
//# sourceMappingURL=utils.js.map