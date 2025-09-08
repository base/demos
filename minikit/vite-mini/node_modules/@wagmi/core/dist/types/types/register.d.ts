import type { Config } from '../createConfig.js';
export interface Register {
}
export type ResolvedRegister = {
    config: Register extends {
        config: infer config extends Config;
    } ? config : Config;
};
//# sourceMappingURL=register.d.ts.map