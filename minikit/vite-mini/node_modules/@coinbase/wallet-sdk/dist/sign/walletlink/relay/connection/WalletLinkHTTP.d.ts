import { ServerMessage } from '../type/ServerMessage.js';
export declare class WalletLinkHTTP {
    private readonly linkAPIUrl;
    private readonly sessionId;
    private readonly auth;
    constructor(linkAPIUrl: string, sessionId: string, sessionKey: string);
    private markUnseenEventsAsSeen;
    fetchUnseenEvents(): Promise<ServerMessage<'Event'>[]>;
}
//# sourceMappingURL=WalletLinkHTTP.d.ts.map