type Suggestion = {
    name: string;
    registered: boolean;
};
export type ReownName = `${string}.reown.id` | `${string}.wcn.id`;
export interface EnsControllerState {
    suggestions: Suggestion[];
    loading: boolean;
}
type StateKey = keyof EnsControllerState;
export declare const EnsController: {
    state: EnsControllerState;
    subscribe(callback: (newState: EnsControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: EnsControllerState[K]) => void): () => void;
    resolveName(name: string): Promise<import("../utils/TypeUtil.js").BlockchainApiLookupEnsName | {
        addresses: {};
        attributes: never[];
    }>;
    isNameRegistered(name: string): Promise<boolean>;
    getSuggestions(value: string): Promise<Suggestion[]>;
    getNamesForAddress(address: string): Promise<import("../utils/TypeUtil.js").BlockchainApiLookupEnsName[]>;
    registerName(name: ReownName): Promise<void>;
    validateName(name: string): boolean;
    parseEnsApiError(error: unknown, defaultError: string): string;
};
export {};
