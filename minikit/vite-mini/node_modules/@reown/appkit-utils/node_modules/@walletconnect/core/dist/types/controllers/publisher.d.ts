import { Logger } from "@walletconnect/logger";
import { IPublisher, IRelayer, PublisherTypes } from "@walletconnect/types";
import { EventEmitter } from "events";
type IPublishType = PublisherTypes.Params & {
    attestation?: string;
    attempt: number;
};
export declare class Publisher extends IPublisher {
    relayer: IRelayer;
    logger: Logger;
    events: EventEmitter;
    name: string;
    queue: Map<string, IPublishType>;
    private publishTimeout;
    private initialPublishTimeout;
    private needsTransportRestart;
    constructor(relayer: IRelayer, logger: Logger);
    get context(): string;
    publish: IPublisher["publish"];
    on: IPublisher["on"];
    once: IPublisher["once"];
    off: IPublisher["off"];
    removeListener: IPublisher["removeListener"];
    private rpcPublish;
    private removeRequestFromQueue;
    private checkQueue;
    private registerEventListeners;
}
export {};
//# sourceMappingURL=publisher.d.ts.map