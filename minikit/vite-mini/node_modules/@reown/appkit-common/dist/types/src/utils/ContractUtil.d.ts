export declare const ContractUtil: {
    getERC20Abi: (tokenAddress: string) => {
        type: string;
        name: string;
        stateMutability: string;
        inputs: {
            name: string;
            type: string;
        }[];
        outputs: {
            name: string;
            type: string;
        }[];
    }[];
    getSwapAbi: () => readonly [{
        readonly type: "function";
        readonly name: "approve";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }];
};
