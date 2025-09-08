import { TrackingEvents } from '@metamask/sdk-communication-layer';
import type { Components } from '@metamask/sdk-install-modal-web';
export interface InstallWidgetProps extends Components.MmInstallModal {
    parentElement: Element;
    onClose: (shouldTerminate?: boolean) => void;
    metaMaskInstaller: {
        startDesktopOnboarding: () => void;
    };
    onAnalyticsEvent: (event: {
        event: TrackingEvents;
        params?: Record<string, unknown>;
    }) => void;
}
export interface PendingWidgetProps extends Components.MmPendingModal {
    parentElement: Element;
    onClose: () => void;
    onDisconnect?: () => void;
    updateOTPValue: (otpValue: string) => void;
}
export interface SelectWidgetProps extends Components.MmSelectModal {
    parentElement: Element;
    onClose: (shouldTerminate?: boolean) => void;
    connectWithExtension: () => void;
}
export default class ModalLoader {
    private containers;
    private defined;
    private debug;
    private sdkVersion?;
    constructor({ debug, sdkVersion }: {
        debug?: boolean;
        sdkVersion?: string;
    });
    private loadComponent;
    renderInstallModal(props: InstallWidgetProps): Promise<void>;
    renderSelectModal(props: SelectWidgetProps): Promise<void>;
    renderPendingModal(props: PendingWidgetProps): Promise<void>;
    updateOTPValue(otpValue: string): void;
    updateQRCode(link: string): void;
    unmount(): void;
}
//# sourceMappingURL=Modal-web.d.ts.map