import { ProviderInterface } from '../../../core/provider/interface.js';
declare global {
    interface Window {
        ethereum?: InjectedProvider;
    }
}
declare const TBA_PROVIDER_IDENTIFIER = "isCoinbaseBrowser";
type InjectedProvider = ProviderInterface & {
    [TBA_PROVIDER_IDENTIFIER]?: boolean;
};
export declare function getInjectedProvider(): InjectedProvider | null;
export {};
//# sourceMappingURL=getInjectedProvider.d.ts.map