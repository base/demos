import { type ResolvedRegister, type State } from '@wagmi/core';
import { type ReactElement } from 'react';
export type HydrateProps = {
    config: ResolvedRegister['config'];
    initialState?: State | undefined;
    reconnectOnMount?: boolean | undefined;
};
export declare function Hydrate(parameters: React.PropsWithChildren<HydrateProps>): ReactElement;
//# sourceMappingURL=hydrate.d.ts.map