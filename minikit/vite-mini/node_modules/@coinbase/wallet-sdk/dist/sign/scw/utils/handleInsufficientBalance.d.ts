import { InsufficientBalanceErrorData } from '../../../core/error/errors.js';
import { RequestArguments } from '../../../core/provider/interface.js';
import { Address } from '../../../core/type/index.js';
import { PublicClient } from 'viem';
export declare function handleInsufficientBalanceError({ errorData, globalAccountAddress, subAccountAddress, client, request, subAccountRequest, globalAccountRequest, }: {
    errorData: InsufficientBalanceErrorData;
    globalAccountAddress: Address;
    subAccountAddress: Address;
    request: RequestArguments;
    client: PublicClient;
    subAccountRequest: (request: RequestArguments) => Promise<any>;
    globalAccountRequest: (request: RequestArguments) => Promise<any>;
}): Promise<any>;
//# sourceMappingURL=handleInsufficientBalance.d.ts.map