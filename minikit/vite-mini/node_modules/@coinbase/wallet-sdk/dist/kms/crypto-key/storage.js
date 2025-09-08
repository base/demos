import { createStore, del, get, set } from 'idb-keyval';
export function createStorage(scope, name) {
    const store = typeof indexedDB !== 'undefined' ? createStore(scope, name) : undefined;
    return {
        getItem: async (key) => {
            const value = await get(key, store);
            if (!value) {
                return null;
            }
            return value;
        },
        removeItem: async (key) => {
            return del(key, store);
        },
        setItem: async (key, value) => {
            return set(key, value, store);
        },
    };
}
//# sourceMappingURL=storage.js.map