import { providerErrors, rpcErrors } from "@metamask/rpc-errors";
import { 
  AppContext,
  AppMetadata,
  GeminiSdkEvent,
  GeminiSdkMessage,
  GeminiSdkMessageResponse 
} from "./types";
import { closePopup, openPopup } from "./utils";
import { SDK_BACKEND_URL, SDK_VERSION, DEFAULT_CHAIN_ID } from "./constants";

type CommunicatorConfigParams = {
  appMetadata: AppMetadata;
  onDisconnectCallback?: () => void;
};

/**
 * Handles communication between the SDK and the Gemini Wallet popup window
 * using the postMessage API for secure cross-origin communication.
 */
export class Communicator {
  private readonly appMetadata: AppMetadata;
  private readonly url: URL;
  private popup: Window | null = null;
  private listeners = new Map<(_: MessageEvent) => void, { reject: (_: Error) => void }>();
  private onDisconnectCallback?: () => void;

  constructor({ appMetadata, onDisconnectCallback }: CommunicatorConfigParams) {
    this.url = new URL(SDK_BACKEND_URL);
    this.appMetadata = appMetadata;
    this.onDisconnectCallback = onDisconnectCallback;
  }

  /**
   * Posts a message to the popup window
   */
  async postMessage(message: GeminiSdkMessage): Promise<void> {
    const popup = await this.waitForPopupLoaded();
    popup.postMessage(message, this.url.origin);
  }

  /**
   * Posts a request to the popup window and waits for a response
   */
  async postRequestAndWaitForResponse<
    M extends GeminiSdkMessage, 
    R extends GeminiSdkMessageResponse
  >(request: GeminiSdkMessage): Promise<R> {
    const responsePromise = this.onMessage<M, R>(({ requestId }) => requestId === request.requestId);
    await this.postMessage(request);
    return responsePromise;
  }

  /**
   * Listens for messages from the popup window that match a given predicate
   */
  async onMessage<
    M extends GeminiSdkMessage, 
    R extends GeminiSdkMessageResponse
  >(predicate: (_: Partial<M>) => boolean): Promise<R> {
    return new Promise((resolve, reject) => {
      const listener = (event: MessageEvent<M>) => {
        // Ensure origin of message
        if (event.origin !== this.url.origin) return;

        const message = event.data;
        if (predicate(message)) {
          resolve(message as unknown as R);
          window.removeEventListener("message", listener);
          this.listeners.delete(listener);
        }
      };

      window.addEventListener("message", listener);
      this.listeners.set(listener, { reject });
    });
  }

  /**
   * Closes the popup, rejects all pending requests and clears event listeners
   */
  private onRequestCancelled(): void {
    closePopup(this.popup ?? undefined);
    this.popup = null;

    this.listeners.forEach(({ reject }, listener) => {
      reject(providerErrors.userRejectedRequest());
      window.removeEventListener("message", listener);
    });
    this.listeners.clear();
  }

  /**
   * Waits for the popup window to fully load and then sends app context
   */
  async waitForPopupLoaded(): Promise<Window> {
    if (this.popup && !this.popup.closed) {
      // In case the user un-focused the popup between requests, focus it again
      this.popup.focus();
      return this.popup;
    }

    this.popup = openPopup(this.url);

    // Setup popup closed listener in case user closes window without explicit response
    this.onMessage<GeminiSdkMessage, GeminiSdkMessageResponse>(
      ({ event }) => event === GeminiSdkEvent.POPUP_UNLOADED
    )
      .then(() => this.onRequestCancelled())
      .catch(() => {});

    // Setup account disconnect listener in case user requests disconnect from within popup
    this.onMessage<GeminiSdkMessage, GeminiSdkMessageResponse>(
      ({ event }) => event === GeminiSdkEvent.SDK_DISCONNECT
    )
      .then(() => {
        // Invoke disconnect callback passed in from wallet
        this.onDisconnectCallback?.();
        // Cleanup remaining event listeners
        this.onRequestCancelled();
      })
      .catch(() => {});

    return this.onMessage<GeminiSdkMessage, GeminiSdkMessageResponse>(
      ({ event }) => event === GeminiSdkEvent.POPUP_LOADED
    )
      .then(message => {
        // Report app metadata to backend upon load complete
        this.postMessage({
          chainId: DEFAULT_CHAIN_ID,
          data: {
            appMetadata: this.appMetadata,
            origin: window.location.origin,
            sdkVersion: SDK_VERSION,
          } as AppContext,
          event: GeminiSdkEvent.POPUP_APP_CONTEXT,
          origin: window.location.origin,
          requestId: message.requestId,
        });
        return message;
      })
      .then(() => {
        if (!this.popup) throw rpcErrors.internal();
        return this.popup;
      });
  }
}