import type { ResolvedRegister, State } from '@wagmi/core';
export declare const WagmiContext: import("react").Context<import("@wagmi/core").Config | undefined>;
export type WagmiProviderProps = {
    config: ResolvedRegister['config'];
    initialState?: State | undefined;
    reconnectOnMount?: boolean | undefined;
};
export declare function WagmiProvider(parameters: React.PropsWithChildren<WagmiProviderProps>): import("react").FunctionComponentElement<import("react").PropsWithChildren<import("./hydrate.js").HydrateProps>>;
//# sourceMappingURL=context.d.ts.map