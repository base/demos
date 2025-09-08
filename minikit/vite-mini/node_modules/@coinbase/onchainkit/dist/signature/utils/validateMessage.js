import { MessageType } from "../types.js";
function isTypedData(params) {
  return !!((params == null ? void 0 : params.types) && (params == null ? void 0 : params.primaryType) && typeof (params == null ? void 0 : params.message) === "object");
}
function isSignableMessage(params) {
  return typeof (params == null ? void 0 : params.message) === "string" || typeof (params == null ? void 0 : params.message) === "object" && "raw" in params.message && (typeof params.message.raw === "string" || params.message.raw instanceof Uint8Array);
}
function validateMessage(messageData) {
  if (isTypedData(messageData)) {
    return {
      type: MessageType.TYPED_DATA,
      data: messageData
    };
  }
  if (isSignableMessage(messageData)) {
    return {
      type: MessageType.SIGNABLE_MESSAGE,
      data: messageData
    };
  }
  return {
    type: MessageType.INVALID,
    data: null
  };
}
export {
  isSignableMessage,
  isTypedData,
  validateMessage
};
//# sourceMappingURL=validateMessage.js.map
