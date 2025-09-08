import { range } from '../../math/range.mjs';
import { isArrayLike } from '../predicate/isArrayLike.mjs';

function pickBy(obj, shouldPick) {
    if (obj == null) {
        return {};
    }
    const result = {};
    if (shouldPick == null) {
        return obj;
    }
    const keys = isArrayLike(obj) ? range(0, obj.length) : Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i].toString();
        const value = obj[key];
        if (shouldPick(value, key, obj)) {
            result[key] = value;
        }
    }
    return result;
}

export { pickBy };
