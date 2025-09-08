"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FrozenMap_map, _FrozenSet_set;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenSet = exports.FrozenMap = void 0;
/**
 * A {@link ReadonlyMap} that cannot be modified after instantiation.
 * The implementation uses an inner map hidden via a private field, and the
 * immutability guarantee relies on it being impossible to get a reference
 * to this map.
 */
class FrozenMap {
    constructor(entries) {
        _FrozenMap_map.set(this, void 0);
        __classPrivateFieldSet(this, _FrozenMap_map, new Map(entries), "f");
        Object.freeze(this);
    }
    get size() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").size;
    }
    [(_FrozenMap_map = new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f")[Symbol.iterator]();
    }
    entries() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").entries();
    }
    forEach(callbackfn, thisArg) {
        // We have to wrap the specified callback in order to prevent it from
        // receiving a reference to the inner map.
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").forEach((value, key, _map) => callbackfn.call(thisArg, value, key, this));
    }
    get(key) {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").get(key);
    }
    has(key) {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").has(key);
    }
    keys() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").keys();
    }
    values() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").values();
    }
    toString() {
        return `FrozenMap(${this.size}) {${this.size > 0
            ? ` ${[...this.entries()]
                .map(([key, value]) => `${String(key)} => ${String(value)}`)
                .join(', ')} `
            : ''}}`;
    }
}
exports.FrozenMap = FrozenMap;
/**
 * A {@link ReadonlySet} that cannot be modified after instantiation.
 * The implementation uses an inner set hidden via a private field, and the
 * immutability guarantee relies on it being impossible to get a reference
 * to this set.
 */
class FrozenSet {
    constructor(values) {
        _FrozenSet_set.set(this, void 0);
        __classPrivateFieldSet(this, _FrozenSet_set, new Set(values), "f");
        Object.freeze(this);
    }
    get size() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").size;
    }
    [(_FrozenSet_set = new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f")[Symbol.iterator]();
    }
    entries() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").entries();
    }
    forEach(callbackfn, thisArg) {
        // We have to wrap the specified callback in order to prevent it from
        // receiving a reference to the inner set.
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").forEach((value, value2, _set) => callbackfn.call(thisArg, value, value2, this));
    }
    has(value) {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").has(value);
    }
    keys() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").keys();
    }
    values() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").values();
    }
    toString() {
        return `FrozenSet(${this.size}) {${this.size > 0
            ? ` ${[...this.values()].map((member) => String(member)).join(', ')} `
            : ''}}`;
    }
}
exports.FrozenSet = FrozenSet;
Object.freeze(FrozenMap);
Object.freeze(FrozenMap.prototype);
Object.freeze(FrozenSet);
Object.freeze(FrozenSet.prototype);
//# sourceMappingURL=collections.js.map