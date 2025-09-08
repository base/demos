import type { AddressEx } from './common';
export declare enum ImplementationVersionState {
    UP_TO_DATE = "UP_TO_DATE",
    OUTDATED = "OUTDATED",
    UNKNOWN = "UNKNOWN"
}
export type SafeInfo = {
    address: AddressEx;
    chainId: string;
    nonce: number;
    threshold: number;
    owners: AddressEx[];
    implementation: AddressEx;
    implementationVersionState: ImplementationVersionState;
    modules: AddressEx[] | null;
    guard: AddressEx | null;
    fallbackHandler: AddressEx | null;
    version: string | null;
    collectiblesTag: string | null;
    txQueuedTag: string | null;
    txHistoryTag: string | null;
    messagesTag: string | null;
};
export type SafeOverview = {
    address: AddressEx;
    chainId: string;
    threshold: number;
    owners: AddressEx[];
    fiatTotal: string;
    queued: number;
    awaitingConfirmation: number | null;
};
