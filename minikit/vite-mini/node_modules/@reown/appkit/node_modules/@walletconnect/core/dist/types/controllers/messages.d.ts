import { Logger } from "@walletconnect/logger";
import { ICore, IMessageTracker, MessageRecord } from "@walletconnect/types";
export declare class MessageTracker extends IMessageTracker {
    logger: Logger;
    core: ICore;
    messages: Map<string, MessageRecord>;
    messagesWithoutClientAck: Map<string, MessageRecord>;
    name: string;
    version: string;
    private initialized;
    private storagePrefix;
    constructor(logger: Logger, core: ICore);
    init: IMessageTracker["init"];
    get context(): string;
    get storageKey(): string;
    get storageKeyWithoutClientAck(): string;
    set: IMessageTracker["set"];
    get: IMessageTracker["get"];
    getWithoutAck: IMessageTracker["getWithoutAck"];
    has: IMessageTracker["has"];
    ack: IMessageTracker["ack"];
    del: IMessageTracker["del"];
    private setRelayerMessages;
    private setRelayerMessagesWithoutClientAck;
    private getRelayerMessages;
    private getRelayerMessagesWithoutClientAck;
    private persist;
    private isInitialized;
}
//# sourceMappingURL=messages.d.ts.map