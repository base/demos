import { W3mFrameProvider } from '@reown/appkit-wallet';
export class W3mFrameProviderSingleton {
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a singleton
    constructor() { }
    static getInstance({ projectId, chainId, enableLogger, onTimeout, abortController }) {
        if (!W3mFrameProviderSingleton.instance) {
            W3mFrameProviderSingleton.instance = new W3mFrameProvider({
                projectId,
                chainId,
                enableLogger,
                onTimeout,
                abortController
            });
        }
        return W3mFrameProviderSingleton.instance;
    }
}
//# sourceMappingURL=W3MFrameProviderSingleton.js.map