// Copyright (c) 2018-2024 Coinbase, Inc. <https://www.coinbase.com/>
// TODO: clean up, or possibly deprecate Storage class
export class ScopedLocalStorage {
    constructor(scope, module) {
        this.scope = scope;
        this.module = module;
    }
    storeObject(key, item) {
        this.setItem(key, JSON.stringify(item));
    }
    loadObject(key) {
        const item = this.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }
    setItem(key, value) {
        localStorage.setItem(this.scopedKey(key), value);
    }
    getItem(key) {
        return localStorage.getItem(this.scopedKey(key));
    }
    removeItem(key) {
        localStorage.removeItem(this.scopedKey(key));
    }
    clear() {
        const prefix = this.scopedKey('');
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (typeof key === 'string' && key.startsWith(prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
    scopedKey(key) {
        return `-${this.scope}${this.module ? `:${this.module}` : ''}:${key}`;
    }
    static clearAll() {
        new ScopedLocalStorage('CBWSDK').clear();
        new ScopedLocalStorage('walletlink').clear();
    }
}
//# sourceMappingURL=ScopedLocalStorage.js.map