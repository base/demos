export type ClientMeta = {
    mode: 'onchainkit' | 'minikit';
    clientFid: number | null;
};
declare class ClientMetaManager {
    clientMeta: ClientMeta | null;
    private initPromise;
    init({ isMiniKit }: {
        isMiniKit: boolean;
    }): Promise<void>;
    isInitialized(): boolean;
    getClientMeta(): Promise<ClientMeta>;
    private handleInit;
}
export declare const clientMetaManager: ClientMetaManager;
export {};
//# sourceMappingURL=clientMetaManager.d.ts.map