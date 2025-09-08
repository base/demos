import { Logger } from "@walletconnect/logger";
import { ICore } from "./core";
export type MessageRecord = Record<string, string>;
export declare abstract class IMessageTracker {
    logger: Logger;
    core: ICore;
    abstract messages: Map<string, MessageRecord>;
    abstract messagesWithoutClientAck: Map<string, MessageRecord>;
    abstract name: string;
    abstract readonly context: string;
    constructor(logger: Logger, core: ICore);
    abstract init(): Promise<void>;
    abstract set(topic: string, message: string, direction?: "inbound" | "outbound"): Promise<string>;
    abstract get(topic: string): MessageRecord;
    abstract getWithoutAck(topics: string[]): Record<string, string[]>;
    abstract has(topic: string, message: string): boolean;
    abstract del(topic: string): Promise<void>;
    abstract ack(topic: string, message: string): Promise<void>;
}
//# sourceMappingURL=messages.d.ts.map