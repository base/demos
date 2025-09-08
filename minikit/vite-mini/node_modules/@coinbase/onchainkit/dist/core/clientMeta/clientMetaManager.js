import sdk from "@farcaster/frame-sdk";
class ClientMetaManager {
  constructor() {
    this.clientMeta = null;
    this.initPromise = null;
  }
  async init({ isMiniKit }) {
    if (this.isInitialized()) {
      console.warn("ClientMetaManager already initialized");
      return;
    }
    this.initPromise = this.handleInit({ isMiniKit });
  }
  isInitialized() {
    return !!this.initPromise;
  }
  async getClientMeta() {
    if (!this.initPromise) throw new Error("ClientMetaManager not initialized");
    if (!this.clientMeta) return await this.initPromise;
    return this.clientMeta;
  }
  async handleInit({ isMiniKit }) {
    var _a;
    let clientFid = null;
    try {
      const context = await sdk.context;
      clientFid = ((_a = context == null ? void 0 : context.client) == null ? void 0 : _a.clientFid) || null;
    } catch (error) {
      console.error("Error getting client FID", error);
    }
    this.clientMeta = {
      mode: isMiniKit ? "minikit" : "onchainkit",
      clientFid
    };
    return this.clientMeta;
  }
}
const clientMetaManager = new ClientMetaManager();
export {
  clientMetaManager
};
//# sourceMappingURL=clientMetaManager.js.map
