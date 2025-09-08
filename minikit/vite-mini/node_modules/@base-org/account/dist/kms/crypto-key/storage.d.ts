export type AsyncStorage = {
    getItem: <T>(key: string) => Promise<T | null>;
    removeItem: (key: string) => Promise<void>;
    setItem: (key: string, value: unknown) => Promise<void>;
};
export declare function createStorage(scope: string, name: string): AsyncStorage;
//# sourceMappingURL=storage.d.ts.map