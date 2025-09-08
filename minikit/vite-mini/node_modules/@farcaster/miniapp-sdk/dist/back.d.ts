import type { WireMiniAppHost } from '@farcaster/miniapp-core';
import type { Remote } from 'comlink';
import type { Emitter } from './types.ts';
export type Back = {
    visible: boolean;
    show: () => Promise<void>;
    hide: () => Promise<void>;
    onback: (() => unknown) | null;
    enableWebNavigation: () => Promise<void>;
    disableWebNavigation: () => Promise<void>;
};
export declare const createBack: (options: {
    emitter: Emitter;
    miniAppHost: Remote<WireMiniAppHost>;
}) => Back;
