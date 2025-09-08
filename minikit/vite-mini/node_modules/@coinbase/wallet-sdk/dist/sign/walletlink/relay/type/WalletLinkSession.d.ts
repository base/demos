import { ScopedLocalStorage } from '../../../../core/storage/ScopedLocalStorage.js';
export declare class WalletLinkSession {
    readonly storage: ScopedLocalStorage;
    readonly id: string;
    readonly secret: string;
    readonly key: string;
    private _linked;
    private constructor();
    static create(storage: ScopedLocalStorage): WalletLinkSession;
    static load(storage: ScopedLocalStorage): WalletLinkSession | null;
    get linked(): boolean;
    set linked(val: boolean);
    save(): WalletLinkSession;
    private persistLinked;
}
//# sourceMappingURL=WalletLinkSession.d.ts.map