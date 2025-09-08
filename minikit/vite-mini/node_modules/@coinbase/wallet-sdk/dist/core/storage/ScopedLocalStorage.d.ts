export declare class ScopedLocalStorage {
    private scope;
    private module?;
    constructor(scope: 'CBWSDK' | 'walletlink', module?: string | undefined);
    storeObject<T>(key: string, item: T): void;
    loadObject<T>(key: string): T | undefined;
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    clear(): void;
    scopedKey(key: string): string;
    static clearAll(): void;
}
//# sourceMappingURL=ScopedLocalStorage.d.ts.map