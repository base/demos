import { ConstructorOptions, ProviderInterface, RequestArguments } from '../core/provider/interface.js';
export declare function fetchRPCRequest(request: RequestArguments, rpcUrl: string): Promise<any>;
export interface CBWindow {
    top: CBWindow;
    ethereum?: CBInjectedProvider;
    coinbaseWalletExtension?: CBInjectedProvider;
}
export interface CBInjectedProvider extends ProviderInterface {
    isCoinbaseBrowser?: boolean;
    setAppInfo?: (...args: unknown[]) => unknown;
}
export declare function getCoinbaseInjectedProvider({ metadata, preference, }: Readonly<ConstructorOptions>): ProviderInterface | undefined;
/**
 * Validates the arguments for an invalid request and returns an error if any validation fails.
 * Valid request args are defined here: https://eips.ethereum.org/EIPS/eip-1193#request
 * @param args The request arguments to validate.
 * @returns An error object if the arguments are invalid, otherwise undefined.
 */
export declare function checkErrorForInvalidRequestArgs(args: unknown): asserts args is RequestArguments;
//# sourceMappingURL=provider.d.ts.map