import { RequestArguments } from '../../../core/provider/interface.js';
import { OwnerAccount } from '../../../core/type/index.js';
import { SubAccount } from '../../../store/store.js';
import { Address, Hex, PublicClient } from 'viem';
type CreateSubAccountSignerParams = {
    address: Address;
    owner: OwnerAccount;
    ownerIndex?: number;
    client: PublicClient;
    parentAddress?: Address;
    factoryData?: Hex;
    factory?: Address;
    attribution?: {
        suffix: Hex;
    } | {
        appOrigin: string;
    };
};
export declare function createSubAccountSigner({ address, client, factory, factoryData, owner, ownerIndex, parentAddress, attribution, }: CreateSubAccountSignerParams): Promise<{
    request: (args: RequestArguments) => Promise<string | SubAccount | import("../../../core/rpc/wallet_prepareCalls.js").PrepareCallsReturnValue | import("../../../core/rpc/wallet_sendPreparedCalls.js").SendPreparedCallsReturnValue | undefined>;
}>;
export {};
//# sourceMappingURL=createSubAccountSigner.d.ts.map