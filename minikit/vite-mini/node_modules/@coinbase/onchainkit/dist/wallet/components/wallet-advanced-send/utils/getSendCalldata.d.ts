import { APIError } from '../../../../api/types';
import { Token } from '../../../../token';
import { Call } from '../../../../transaction/types';
import { Address } from 'viem';
type GetSendCalldataParams = {
    recipientAddress: Address | null;
    token: Token | null;
    amount: string | null;
};
type GetSendCalldataResponse = {
    calldata: Call | null;
    error: APIError | null;
};
export declare function getSendCalldata({ recipientAddress, token, amount, }: GetSendCalldataParams): GetSendCalldataResponse;
export {};
//# sourceMappingURL=getSendCalldata.d.ts.map