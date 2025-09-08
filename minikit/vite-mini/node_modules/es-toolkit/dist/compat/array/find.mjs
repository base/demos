import { iteratee } from '../util/iteratee.mjs';

function find(source, _doesMatch, fromIndex = 0) {
    if (!source) {
        return undefined;
    }
    if (fromIndex < 0) {
        fromIndex = Math.max(source.length + fromIndex, 0);
    }
    const doesMatch = iteratee(_doesMatch);
    const values = Array.isArray(source) ? source.slice(fromIndex) : Object.values(source).slice(fromIndex);
    if (typeof doesMatch === 'function' && !Array.isArray(source)) {
        const keys = Object.keys(source).slice(fromIndex);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = source[key];
            if (doesMatch(value, key, source)) {
                return value;
            }
        }
        return undefined;
    }
    return values.find(doesMatch);
}

export { find };
