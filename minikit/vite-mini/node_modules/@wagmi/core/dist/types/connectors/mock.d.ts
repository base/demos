import { type Address, type EIP1193RequestFn, type WalletRpcSchema } from 'viem';
export type MockParameters = {
    accounts: readonly [Address, ...Address[]];
    features?: {
        defaultConnected?: boolean | undefined;
        connectError?: boolean | Error | undefined;
        switchChainError?: boolean | Error | undefined;
        signMessageError?: boolean | Error | undefined;
        signTypedDataError?: boolean | Error | undefined;
        reconnect?: boolean | undefined;
        watchAssetError?: boolean | Error | undefined;
    } | undefined;
};
export declare function mock(parameters: MockParameters): import("./createConnector.js").CreateConnectorFn<{
    config: import("viem").TransportConfig<"custom", EIP1193RequestFn>;
    request: EIP1193RequestFn<WalletRpcSchema>;
    value?: unknown;
}, {
    connect(parameters?: {
        chainId?: number | undefined;
        isReconnecting?: boolean | undefined;
        foo?: string | undefined;
    }): Promise<{
        accounts: readonly Address[];
        chainId: number;
    }>;
}, Record<string, unknown>>;
export declare namespace mock {
    var type: "mock";
}
//# sourceMappingURL=mock.d.ts.map