import { pattern } from "@metamask/superstruct";
import { assert } from "./assert.mjs";
/**
 * Ensure that a provided string-based struct is valid base64.
 *
 * @param struct - The string based struct.
 * @param options - Optional options to specialize base64 validation. See {@link Base64Options} documentation.
 * @returns A superstruct validating base64.
 */
export const base64 = (struct, options = {}) => {
    const paddingRequired = options.paddingRequired ?? false;
    const characterSet = options.characterSet ?? 'base64';
    let letters;
    if (characterSet === 'base64') {
        letters = String.raw `[A-Za-z0-9+\/]`;
    }
    else {
        assert(characterSet === 'base64url');
        letters = String.raw `[-_A-Za-z0-9]`;
    }
    let re;
    if (paddingRequired) {
        re = new RegExp(`^(?:${letters}{4})*(?:${letters}{3}=|${letters}{2}==)?$`, 'u');
    }
    else {
        re = new RegExp(`^(?:${letters}{4})*(?:${letters}{2,3}|${letters}{3}=|${letters}{2}==)?$`, 'u');
    }
    return pattern(struct, re);
};
//# sourceMappingURL=base64.mjs.map