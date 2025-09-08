import type { Config, State } from './createConfig.js';
type HydrateParameters = {
    initialState?: State | undefined;
    reconnectOnMount?: boolean | undefined;
};
export declare function hydrate(config: Config, parameters: HydrateParameters): {
    onMount(): Promise<void>;
};
export {};
//# sourceMappingURL=hydrate.d.ts.map