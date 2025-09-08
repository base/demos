import { type OpenTarget } from '@reown/appkit-controllers';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
export declare class W3mConnectingWcMobile extends W3mConnectingWidget {
    private btnLabelTimeout?;
    protected redirectDeeplink: string | undefined;
    protected redirectUniversalLink: string | undefined;
    protected target: OpenTarget | undefined;
    protected preferUniversalLinks: boolean | undefined;
    protected isLoading: boolean;
    constructor();
    disconnectedCallback(): void;
    private onHandleURI;
    protected onConnect: () => void;
    protected onTryAgain(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-connecting-wc-mobile': W3mConnectingWcMobile;
    }
}
