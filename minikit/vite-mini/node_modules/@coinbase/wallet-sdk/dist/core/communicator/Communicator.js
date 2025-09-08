import { CB_KEYS_URL } from '../constants.js';
import { standardErrors } from '../error/errors.js';
import { logPopupSetupCompleted, logPopupSetupStarted, logPopupUnloadReceived, } from '../telemetry/events/communicator.js';
import { closePopup, openPopup } from '../../util/web.js';
import { VERSION } from '../../sdk-info.js';
/**
 * Communicates with a popup window for Coinbase keys.coinbase.com (or another url)
 * to send and receive messages.
 *
 * This class is responsible for opening a popup window, posting messages to it,
 * and listening for responses.
 *
 * It also handles cleanup of event listeners and the popup window itself when necessary.
 */
export class Communicator {
    constructor({ url = CB_KEYS_URL, metadata, preference }) {
        this.popup = null;
        this.listeners = new Map();
        /**
         * Posts a message to the popup window
         */
        this.postMessage = async (message) => {
            const popup = await this.waitForPopupLoaded();
            popup.postMessage(message, this.url.origin);
        };
        /**
         * Posts a request to the popup window and waits for a response
         */
        this.postRequestAndWaitForResponse = async (request) => {
            const responsePromise = this.onMessage(({ requestId }) => requestId === request.id);
            this.postMessage(request);
            return await responsePromise;
        };
        /**
         * Listens for messages from the popup window that match a given predicate.
         */
        this.onMessage = async (predicate) => {
            return new Promise((resolve, reject) => {
                const listener = (event) => {
                    if (event.origin !== this.url.origin)
                        return; // origin validation
                    const message = event.data;
                    if (predicate(message)) {
                        resolve(message);
                        window.removeEventListener('message', listener);
                        this.listeners.delete(listener);
                    }
                };
                window.addEventListener('message', listener);
                this.listeners.set(listener, { reject });
            });
        };
        /**
         * Closes the popup, rejects all requests and clears the listeners
         */
        this.disconnect = () => {
            // Note: keys popup handles closing itself. this is a fallback.
            closePopup(this.popup);
            this.popup = null;
            this.listeners.forEach(({ reject }, listener) => {
                reject(standardErrors.provider.userRejectedRequest('Request rejected'));
                window.removeEventListener('message', listener);
            });
            this.listeners.clear();
        };
        /**
         * Waits for the popup window to fully load and then sends a version message.
         */
        this.waitForPopupLoaded = async () => {
            if (this.popup && !this.popup.closed) {
                // In case the user un-focused the popup between requests, focus it again
                this.popup.focus();
                return this.popup;
            }
            logPopupSetupStarted();
            this.popup = await openPopup(this.url);
            this.onMessage(({ event }) => event === 'PopupUnload')
                .then(() => {
                this.disconnect();
                logPopupUnloadReceived();
            })
                .catch(() => { });
            return this.onMessage(({ event }) => event === 'PopupLoaded')
                .then((message) => {
                this.postMessage({
                    requestId: message.id,
                    data: {
                        version: VERSION,
                        metadata: this.metadata,
                        preference: this.preference,
                        location: window.location.toString(),
                    },
                });
            })
                .then(() => {
                if (!this.popup)
                    throw standardErrors.rpc.internal();
                logPopupSetupCompleted();
                return this.popup;
            });
        };
        this.url = new URL(url);
        this.metadata = metadata;
        this.preference = preference;
    }
}
//# sourceMappingURL=Communicator.js.map