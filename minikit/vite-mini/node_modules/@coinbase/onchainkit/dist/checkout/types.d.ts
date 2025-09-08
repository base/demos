import { LifecycleStatusUpdate } from '../internal/types';
import { ContractFunctionParameters, TransactionReceipt, Address } from 'viem';
import { Config } from 'wagmi';
import { PayTransaction } from '../api/types';
import { TransactionError } from '../transaction';
/** List of Pay lifecycle statuses.
 * The order of the statuses loosely follows the transaction lifecycle.
 *
 * Note: exported as public Type
 */
export type LifecycleStatus = {
    statusName: 'init';
    statusData: LifecycleStatusDataShared;
} | {
    statusName: 'error';
    statusData: TransactionError;
} | {
    statusName: 'fetchingData';
    statusData: LifecycleStatusDataShared;
} | {
    statusName: 'ready';
    statusData: {
        chargeId: string;
        contracts: ContractFunctionParameters[];
    };
} | {
    statusName: 'pending';
    statusData: LifecycleStatusDataShared;
} | {
    statusName: 'success';
    statusData: {
        transactionReceipts: TransactionReceipt[];
        chargeId: string;
        receiptUrl: string;
    };
};
type LifecycleStatusDataShared = Record<string, never>;
export type GetCommerceContractsParams = {
    transaction: PayTransaction;
};
export type GetUSDCBalanceParams = {
    address: Address;
    config: Config;
};
export type HandlePayRequestParams = {
    address: Address;
    chargeHandler?: () => Promise<string>;
    productId?: string;
};
/** Note: exported as public Type */
export type CheckoutButtonReact = {
    className?: string;
    coinbaseBranded?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    text?: string;
};
export type CheckoutContextType = {
    errorMessage?: string;
    lifecycleStatus?: LifecycleStatus;
    onSubmit: () => void;
    updateLifecycleStatus: (status: LifecycleStatusUpdate<LifecycleStatus>) => void;
};
export type CheckoutProviderReact = {
    chargeHandler?: () => Promise<string>;
    children: React.ReactNode;
    isSponsored?: boolean;
    onStatus?: (status: LifecycleStatus) => void;
    productId?: string;
};
/** Note: exported as public Type */
export type CheckoutReact = {
    chargeHandler?: () => Promise<string>;
    children: React.ReactNode;
    className?: string;
    isSponsored?: boolean;
    onStatus?: (status: LifecycleStatus) => void;
    productId?: string;
};
/** Note: exported as public Type */
export type CheckoutStatusReact = {
    className?: string;
};
export type UseCommerceContractsParams = {
    chargeHandler?: () => Promise<string>;
    productId?: string;
};
export {};
//# sourceMappingURL=types.d.ts.map