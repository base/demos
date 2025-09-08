'use client';
import { createContext, createElement } from 'react';
import { Hydrate } from './hydrate.js';
export const WagmiContext = createContext(undefined);
export function WagmiProvider(parameters) {
    const { children, config } = parameters;
    const props = { value: config };
    return createElement(Hydrate, parameters, createElement(WagmiContext.Provider, props, children));
}
//# sourceMappingURL=context.js.map