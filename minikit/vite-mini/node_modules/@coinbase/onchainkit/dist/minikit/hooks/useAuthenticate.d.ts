import { SignIn as SignInCore } from '@farcaster/frame-sdk';
type ParsedSignInMessage = {
    address: string;
    chainID: string;
    domain: string;
    issuedAt: string;
    nonce: string;
    resources: string[];
    uri: string;
    version: string;
};
/**
 * Parse the sign in message
 * @param message - The sign in message to parse
 * @returns {ParsedSignInMessage} - The parsed sign in message
 */
export declare function parseSignInMessage(message: string): ParsedSignInMessage;
type UseAuthenticateProps = Omit<SignInCore.SignInOptions, 'nonce'> & {
    nonce?: string;
};
/**
 * Authenticates the user's account.
 * @param domain [optional] - The domain of the frame to authenticate against, if not provided, the domain will not be validated
 * @param skipValidation [optional] - Whether to skip validation of the nonce and fid, by default it will validate the nonce and fid
 * @returns `signIn` - A function that wraps the frames SDK signIn action and returns the result of the signIn action
 */
export declare const useAuthenticate: (domain?: string, skipValidation?: boolean) => {
    signIn: (signInOptions?: UseAuthenticateProps) => Promise<false | SignInCore.SignInResult>;
};
export {};
//# sourceMappingURL=useAuthenticate.d.ts.map