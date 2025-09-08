import { DEFAULT_ONRAMP_URL } from "../constants.js";
import { subscribeToWindowMessage } from "./subscribeToWindowMessage.js";
function setupOnrampEventListeners({
  onEvent,
  onExit,
  onSuccess,
  host = DEFAULT_ONRAMP_URL
}) {
  const unsubscribe = subscribeToWindowMessage({
    allowedOrigin: host,
    onMessage: (data) => {
      const metadata = data;
      if (metadata.eventName === "success") {
        onSuccess == null ? void 0 : onSuccess(metadata.data);
      }
      if (metadata.eventName === "exit") {
        onExit == null ? void 0 : onExit(metadata.error);
      }
      onEvent == null ? void 0 : onEvent(metadata);
    }
  });
  return unsubscribe;
}
export {
  setupOnrampEventListeners
};
//# sourceMappingURL=setupOnrampEventListeners.js.map
