"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionManager = void 0;
const eth_block_tracker_1 = require("eth-block-tracker");
// TODO: When we update this package we should be able to fix this
//  eslint-disable-next-line @typescript-eslint/no-var-requires
const createSubscriptionManager = require('eth-json-rpc-filters/subscriptionManager');
const noop = () => { };
class SubscriptionManager {
    constructor(provider) {
        const blockTracker = new eth_block_tracker_1.PollingBlockTracker({
            provider: provider,
            pollingInterval: 15000,
            setSkipCacheFlag: true,
        });
        const { events, middleware } = createSubscriptionManager({
            blockTracker,
            provider,
        });
        this.events = events;
        this.subscriptionMiddleware = middleware;
    }
    async handleRequest(request) {
        const result = {};
        await this.subscriptionMiddleware(request, result, noop, noop);
        return result;
    }
    destroy() {
        this.subscriptionMiddleware.destroy();
    }
}
exports.SubscriptionManager = SubscriptionManager;
