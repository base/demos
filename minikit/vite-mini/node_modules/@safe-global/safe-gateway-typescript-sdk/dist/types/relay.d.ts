export type RelayTransactionRequest = {
    version: string;
    to: string;
    data: string;
    gasLimit?: string;
};
export type RelayTransactionResponse = {
    taskId: string;
};
export type RelayCountResponse = {
    remaining: number;
    limit: number;
};
