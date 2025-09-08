import type UniversalProvider from '@walletconnect/universal-provider';
import { type ChainNamespace } from '@reown/appkit-common';
import { AdapterBlueprint } from '../adapters/ChainAdapterBlueprint.js';
export declare class UniversalAdapter extends AdapterBlueprint {
    setUniversalProvider(universalProvider: UniversalProvider): void;
    connect(params: AdapterBlueprint.ConnectParams): Promise<AdapterBlueprint.ConnectResult>;
    disconnect(): Promise<void>;
    getAccounts({ namespace }: AdapterBlueprint.GetAccountsParams & {
        namespace: ChainNamespace;
    }): Promise<AdapterBlueprint.GetAccountsResult>;
    syncConnectors(): Promise<void>;
    getBalance(params: AdapterBlueprint.GetBalanceParams): Promise<AdapterBlueprint.GetBalanceResult>;
    signMessage(params: AdapterBlueprint.SignMessageParams): Promise<AdapterBlueprint.SignMessageResult>;
    /**
     *
     * These methods are supported only on `wagmi` and `ethers` since the Solana SDK does not support them in the same way.
     * These function definition is to have a type parity between the clients. Currently not in use.
     */
    estimateGas(): Promise<AdapterBlueprint.EstimateGasTransactionResult>;
    sendTransaction(): Promise<AdapterBlueprint.SendTransactionResult>;
    walletGetAssets(_params: AdapterBlueprint.WalletGetAssetsParams): Promise<AdapterBlueprint.WalletGetAssetsResponse>;
    writeContract(): Promise<AdapterBlueprint.WriteContractResult>;
    parseUnits(): AdapterBlueprint.ParseUnitsResult;
    formatUnits(): AdapterBlueprint.FormatUnitsResult;
    getCapabilities(): Promise<unknown>;
    grantPermissions(): Promise<unknown>;
    revokePermissions(): Promise<`0x${string}`>;
    syncConnection(): Promise<{
        id: string;
        type: "WALLET_CONNECT";
        chainId: number;
        provider: UniversalProvider;
        address: string;
    }>;
    switchNetwork(params: AdapterBlueprint.SwitchNetworkParams): Promise<void>;
    getWalletConnectProvider(): UniversalProvider;
}
