import { deserialize } from './deserialize.js';
export const cookieStorage = {
    getItem(key) {
        if (typeof window === 'undefined')
            return null;
        const value = parseCookie(document.cookie, key);
        return value ?? null;
    },
    setItem(key, value) {
        if (typeof window === 'undefined')
            return;
        // biome-ignore lint/suspicious/noDocumentCookie: using
        document.cookie = `${key}=${value};path=/;samesite=Lax`;
    },
    removeItem(key) {
        if (typeof window === 'undefined')
            return;
        // biome-ignore lint/suspicious/noDocumentCookie: using
        document.cookie = `${key}=;max-age=-1;path=/`;
    },
};
export function cookieToInitialState(config, cookie) {
    if (!cookie)
        return undefined;
    const key = `${config.storage?.key}.store`;
    const parsed = parseCookie(cookie, key);
    if (!parsed)
        return undefined;
    return deserialize(parsed).state;
}
export function parseCookie(cookie, key) {
    const keyValue = cookie.split('; ').find((x) => x.startsWith(`${key}=`));
    if (!keyValue)
        return undefined;
    return keyValue.substring(key.length + 1);
}
//# sourceMappingURL=cookie.js.map