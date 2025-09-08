import { MiniKitContextType } from '../types';
import { ReadyOptions } from '@farcaster/frame-sdk';
type UseMiniKitReturn = {
    setFrameReady: (readyOptions?: Partial<ReadyOptions>) => Promise<MiniKitContextType>;
    isFrameReady: boolean;
    context: MiniKitContextType['context'];
    updateClientContext: MiniKitContextType['updateClientContext'];
    notificationProxyUrl: MiniKitContextType['notificationProxyUrl'];
};
/**
 * Allows for the use of the MiniKit context.
 * @returns The MiniKitContext object, consisting of:
 * - `setFrameReady` - A function to set the frame as ready, which will hide the splash screen.
 * - `isFrameReady` - A boolean indicating if the frame has been set as ready.
 * - `context` - The MiniKit context.
 * - `updateClientContext` - A function to update the client context.
 * - `notificationProxyUrl` - The notification proxy URL.
 */
export declare const useMiniKit: () => UseMiniKitReturn;
export {};
//# sourceMappingURL=useMiniKit.d.ts.map