import { QueryClient } from '@tanstack/react-query';
import { Config } from 'wagmi';
/** useProviderDependencies will return the provided Wagmi configuration and QueryClient if they exist in the React context, otherwise it will return null
 * NotFound errors will fail gracefully
 * Unexpected errors will be logged to the console as an error, and will return null for the problematic dependency
 */
export declare function useProviderDependencies(): {
    providedWagmiConfig: Config | null;
    providedQueryClient: QueryClient | null;
};
//# sourceMappingURL=useProviderDependencies.d.ts.map