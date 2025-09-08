import { UUID } from 'crypto';
export type MessageID = UUID;
export interface Message {
    id?: MessageID;
    requestId?: MessageID;
    data?: unknown;
}
//# sourceMappingURL=Message.d.ts.map