import { EngineTypes } from "@walletconnect/types";
export declare const ENGINE_CONTEXT = "engine";
export declare const ENGINE_RPC_OPTS: EngineTypes.RpcOptsMap;
export declare const SESSION_REQUEST_EXPIRY_BOUNDARIES: {
    min: number;
    max: number;
};
export declare const ENGINE_QUEUE_STATES: {
    idle: "IDLE";
    active: "ACTIVE";
};
export declare const TVF_METHODS: {
    eth_sendTransaction: {
        key: string;
    };
    eth_sendRawTransaction: {
        key: string;
    };
    wallet_sendCalls: {
        key: string;
    };
    solana_signTransaction: {
        key: string;
    };
    solana_signAllTransactions: {
        key: string;
    };
    solana_signAndSendTransaction: {
        key: string;
    };
};
//# sourceMappingURL=engine.d.ts.map