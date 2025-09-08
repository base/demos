/**
 * Token configuration for supported payment tokens
 */
export declare const TOKENS: {
    readonly USDC: {
        readonly decimals: 6;
        readonly addresses: {
            readonly base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
            readonly baseSepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
        };
    };
};
/**
 * Chain IDs for supported networks
 */
export declare const CHAIN_IDS: {
    readonly base: 8453;
    readonly baseSepolia: 84532;
};
/**
 * ERC20 transfer function ABI
 */
export declare const ERC20_TRANSFER_ABI: readonly [{
    readonly name: "transfer";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "Transfer";
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}];
//# sourceMappingURL=constants.d.ts.map