"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64 = void 0;
const superstruct_1 = require("superstruct");
const assert_1 = require("./assert");
/**
 * Ensure that a provided string-based struct is valid base64.
 *
 * @param struct - The string based struct.
 * @param options - Optional options to specialize base64 validation. See {@link Base64Options} documentation.
 * @returns A superstruct validating base64.
 */
const base64 = (struct, options = {}) => {
    var _a, _b;
    const paddingRequired = (_a = options.paddingRequired) !== null && _a !== void 0 ? _a : false;
    const characterSet = (_b = options.characterSet) !== null && _b !== void 0 ? _b : 'base64';
    let letters;
    if (characterSet === 'base64') {
        letters = String.raw `[A-Za-z0-9+\/]`;
    }
    else {
        (0, assert_1.assert)(characterSet === 'base64url');
        letters = String.raw `[-_A-Za-z0-9]`;
    }
    let re;
    if (paddingRequired) {
        re = new RegExp(`^(?:${letters}{4})*(?:${letters}{3}=|${letters}{2}==)?$`, 'u');
    }
    else {
        re = new RegExp(`^(?:${letters}{4})*(?:${letters}{2,3}|${letters}{3}=|${letters}{2}==)?$`, 'u');
    }
    return (0, superstruct_1.pattern)(struct, re);
};
exports.base64 = base64;
//# sourceMappingURL=base64.js.map