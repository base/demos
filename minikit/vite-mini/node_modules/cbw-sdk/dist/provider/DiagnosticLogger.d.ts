import { ConnectionState } from '../relay/walletlink/connection/WalletLinkWebSocket';
import { ServerMessage } from '../relay/walletlink/type/ServerMessage';
import { WalletLinkEventData } from '../relay/walletlink/type/WalletLinkEventData';
export type LogProperties = {
    addresses_length?: number;
    alreadyDestroyed?: boolean;
    eventId?: WalletLinkEventData['id'];
    isSessionMismatched?: string;
    linked?: ServerMessage<'IsLinkedOK'>['linked'];
    message?: string;
    metadata_keys?: string[];
    method?: string;
    onlineGuests?: number;
    sessionIdHash?: string;
    sessionMetadataChange?: string;
    state?: ConnectionState;
    storedSessionIdHash?: string;
    type?: ServerMessage['type'];
    value?: string;
};
type Keys = keyof typeof EVENTS;
export type EventType = (typeof EVENTS)[Keys];
export interface DiagnosticLogger {
    log(eventType: EventType, logProperties?: LogProperties): void;
}
export declare const EVENTS: {
    STARTED_CONNECTING: string;
    CONNECTED_STATE_CHANGE: string;
    DISCONNECTED: string;
    METADATA_DESTROYED: string;
    LINKED: string;
    FAILURE: string;
    SESSION_CONFIG_RECEIVED: string;
    ETH_ACCOUNTS_STATE: string;
    SESSION_STATE_CHANGE: string;
    UNLINKED_ERROR_STATE: string;
    SKIPPED_CLEARING_SESSION: string;
    GENERAL_ERROR: string;
    WEB3_REQUEST: string;
    WEB3_REQUEST_PUBLISHED: string;
    WEB3_RESPONSE: string;
    METHOD_NOT_IMPLEMENTED: string;
    UNKNOWN_ADDRESS_ENCOUNTERED: string;
};
export {};
