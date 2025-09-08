export function get(obj, path) {
    if (typeof obj !== 'object' || obj === null)
        return undefined;
    return path
        .split(/[.[\]]+/)
        .filter(Boolean)
        .reduce((value, key) => {
        if (typeof value === 'object' && value !== null) {
            return value[key];
        }
        return undefined;
    }, obj);
}
//# sourceMappingURL=get.js.map