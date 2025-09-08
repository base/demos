import { TrackingEvents } from '@metamask/sdk-communication-layer';
import { MetaMaskInstaller } from '../../Platform/MetaMaskInstaller';
declare const sdkWebInstallModal: ({ link, debug, installer, terminate, connectWithExtension, preferDesktop, onAnalyticsEvent, }: {
    link: string;
    debug?: boolean | undefined;
    preferDesktop?: boolean | undefined;
    installer: MetaMaskInstaller;
    terminate?: (() => void) | undefined;
    connectWithExtension?: (() => void) | undefined;
    onAnalyticsEvent: ({ event, params, }: {
        event: TrackingEvents;
        params?: Record<string, unknown> | undefined;
    }) => void;
}) => {
    mount: (qrcodeLink: string) => void;
    unmount: (shouldTerminate?: boolean) => void;
};
export default sdkWebInstallModal;
//# sourceMappingURL=InstallModal-web.d.ts.map