"use strict";
/**
 * Internal assertion helpers.
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.abool = abool;
exports.abytes = abytes;
exports.aexists = aexists;
exports.ahash = ahash;
exports.anumber = anumber;
exports.aoutput = aoutput;
exports.isBytes = isBytes;
function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error('positive integer expected, got ' + n);
}
// copied from utils
function isBytes(a) {
    return a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
}
function abytes(b, ...lengths) {
    if (!isBytes(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}
function abool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`boolean expected, not ${b}`);
}
//# sourceMappingURL=_assert.js.map