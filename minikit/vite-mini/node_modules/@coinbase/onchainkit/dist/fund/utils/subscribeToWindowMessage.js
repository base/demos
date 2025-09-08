import { DEFAULT_ONRAMP_URL } from "../constants.js";
var MessageCodes = /* @__PURE__ */ ((MessageCodes2) => {
  MessageCodes2["AppParams"] = "app_params";
  MessageCodes2["PaymentLinkSuccess"] = "payment_link_success";
  MessageCodes2["PaymentLinkClosed"] = "payment_link_closed";
  MessageCodes2["GuestCheckoutRedirectSuccess"] = "guest_checkout_redirect_success";
  MessageCodes2["Success"] = "success";
  MessageCodes2["Event"] = "event";
  return MessageCodes2;
})(MessageCodes || {});
function subscribeToWindowMessage({
  onMessage,
  allowedOrigin = DEFAULT_ONRAMP_URL,
  onValidateOrigin = () => Promise.resolve(true)
}) {
  const handleMessage = (event) => {
    if (!isAllowedOrigin({ event, allowedOrigin })) {
      return;
    }
    const { eventName, data } = JSON.parse(event.data);
    if (eventName === "event") {
      (async () => {
        if (await onValidateOrigin(event.origin)) {
          onMessage(data);
        }
      })();
    }
  };
  window.addEventListener("message", handleMessage);
  return () => {
    window.removeEventListener("message", handleMessage);
  };
}
function isAllowedOrigin({
  event,
  allowedOrigin
}) {
  const isOriginAllowed = !allowedOrigin || event.origin === allowedOrigin;
  return isOriginAllowed;
}
export {
  MessageCodes,
  subscribeToWindowMessage
};
//# sourceMappingURL=subscribeToWindowMessage.js.map
