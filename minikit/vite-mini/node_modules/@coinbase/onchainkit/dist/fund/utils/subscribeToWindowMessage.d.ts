import { JsonObject } from '../types';
export declare enum MessageCodes {
    AppParams = "app_params",
    PaymentLinkSuccess = "payment_link_success",
    PaymentLinkClosed = "payment_link_closed",
    GuestCheckoutRedirectSuccess = "guest_checkout_redirect_success",
    Success = "success",
    Event = "event"
}
type MessageData = JsonObject;
/**
 * Subscribes to a message from the parent window.
 * @param messageCode A message code to subscribe to.
 * @param onMessage Callback for when the message is received.
 * @param allowedOrigin The origin to allow messages from.
 * @param onValidateOrigin Callback to validate the origin of the message.
 * @returns
 */
export declare function subscribeToWindowMessage({ onMessage, allowedOrigin, onValidateOrigin, }: {
    onMessage: (data?: MessageData) => void;
    allowedOrigin: string;
    onValidateOrigin?: (origin: string) => Promise<boolean>;
}): () => void;
export {};
//# sourceMappingURL=subscribeToWindowMessage.d.ts.map