import type { Page } from './common';
export type Delegate = {
    safe?: string;
    delegate: string;
    delegator: string;
    label: string;
};
export type DelegateResponse = Page<Delegate>;
export type DelegatesRequest = {
    safe?: string;
    delegate?: string;
    delegator?: string;
    label?: string;
};
export type AddDelegateRequest = {
    safe?: string;
    delegate: string;
    delegator: string;
    signature: string;
    label: string;
};
export type DeleteDelegateRequest = {
    delegate: string;
    delegator: string;
    signature: string;
};
export type DeleteSafeDelegateRequest = {
    safe: string;
    delegate: string;
    signature: string;
};
