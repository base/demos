export interface AssetControllerState {
    walletImages: Record<string, string>;
    networkImages: Record<string, string>;
    chainImages: Record<string, string>;
    connectorImages: Record<string, string>;
    tokenImages: Record<string, string>;
    currencyImages: Record<string, string>;
}
type StateKey = keyof AssetControllerState;
export declare const AssetController: {
    state: AssetControllerState;
    subscribeNetworkImages(callback: (value: AssetControllerState["networkImages"]) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: AssetControllerState[K]) => void): () => void;
    subscribe(callback: (newState: AssetControllerState) => void): () => void;
    setWalletImage(key: string, value: string): void;
    setNetworkImage(key: string, value: string): void;
    setChainImage(key: string, value: string): void;
    setConnectorImage(key: string, value: string): void;
    setTokenImage(key: string, value: string): void;
    setCurrencyImage(key: string, value: string): void;
};
export {};
