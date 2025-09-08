import type { AddressEx, Page } from './common';
export declare enum SafeMessageListItemType {
    DATE_LABEL = "DATE_LABEL",
    MESSAGE = "MESSAGE"
}
export type SafeMessageDateLabel = {
    type: SafeMessageListItemType.DATE_LABEL;
    timestamp: number;
};
export declare enum SafeMessageStatus {
    NEEDS_CONFIRMATION = "NEEDS_CONFIRMATION",
    CONFIRMED = "CONFIRMED"
}
interface TypedDataDomain {
    name?: string;
    version?: string;
    chainId?: unknown;
    verifyingContract?: string;
    salt?: ArrayLike<number> | string;
}
interface TypedDataTypes {
    name: string;
    type: string;
}
type TypedMessageTypes = {
    [key: string]: TypedDataTypes[];
};
export type EIP712TypedData = {
    domain: TypedDataDomain;
    types: TypedMessageTypes;
    message: Record<string, unknown>;
};
export type SafeMessage = {
    type: SafeMessageListItemType.MESSAGE;
    messageHash: string;
    status: SafeMessageStatus;
    logoUri: string | null;
    name: string | null;
    message: string | EIP712TypedData;
    creationTimestamp: number;
    modifiedTimestamp: number;
    confirmationsSubmitted: number;
    confirmationsRequired: number;
    proposedBy: AddressEx;
    confirmations: {
        owner: AddressEx;
        signature: string;
    }[];
    preparedSignature?: string;
};
export type SafeMessageListItem = SafeMessageDateLabel | SafeMessage;
export type SafeMessageListPage = Page<SafeMessageListItem>;
export type ProposeSafeMessageRequest = {
    message: SafeMessage['message'];
    safeAppId?: number;
    origin?: string;
    signature: string;
};
export type ConfirmSafeMessageRequest = {
    signature: string;
};
export {};
