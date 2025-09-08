import type { TemplateResult } from 'lit';
export declare class CacheUtil<K, V> {
    private cache;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): void;
    clear(): void;
}
export declare const globalSvgCache: CacheUtil<string, Promise<TemplateResult<2>>>;
