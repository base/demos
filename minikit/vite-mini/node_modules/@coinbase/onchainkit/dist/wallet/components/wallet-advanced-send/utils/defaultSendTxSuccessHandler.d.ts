import { Address, Chain, TransactionReceipt } from 'viem';
export declare function defaultSendTxSuccessHandler({ transactionId, transactionHash, senderChain, address, onComplete, }: {
    transactionId: string | undefined;
    transactionHash: string | undefined;
    senderChain: Chain | undefined;
    address: Address | undefined;
    onComplete?: () => void;
}): (receipt: TransactionReceipt | undefined) => void;
//# sourceMappingURL=defaultSendTxSuccessHandler.d.ts.map