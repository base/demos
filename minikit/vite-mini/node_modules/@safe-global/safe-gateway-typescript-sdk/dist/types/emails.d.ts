export type RegisterEmailRequestBody = {
    emailAddress: string;
    signer: string;
};
export type ChangeEmailRequestBody = {
    emailAddress: string;
};
export type AuthorizationEmailRequestHeaders = {
    ['Safe-Wallet-Signature']: string;
    ['Safe-Wallet-Signature-Timestamp']: string;
};
export type VerifyEmailRequestBody = {
    code: string;
};
export type GetEmailResponse = {
    email: string;
    verified: boolean;
};
