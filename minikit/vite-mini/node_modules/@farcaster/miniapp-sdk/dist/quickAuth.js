import { SignIn } from '@farcaster/miniapp-core';
import { decodeJwt } from '@farcaster/quick-auth/decodeJwt';
import { createLightClient } from '@farcaster/quick-auth/light';
import * as Siwe from 'ox/Siwe';
import { miniAppHost } from './miniAppHost.js';
export const quickAuth = (() => {
    let current;
    let pendingPromise;
    async function getTokenInner(options) {
        const quickAuthClient = createLightClient({
            origin: options.quickAuthServerOrigin,
        });
        const { nonce } = await quickAuthClient.generateNonce();
        const response = await miniAppHost.signIn({
            nonce,
            acceptAuthAddress: true,
        });
        if (response.result) {
            const parsedSiwe = Siwe.parseMessage(response.result.message);
            // The Farcaster Client rendering the Mini App will set the domain
            // based on the URL it's rendering. It should always be set.
            if (!parsedSiwe.domain) {
                throw new Error('Missing domain on SIWE message');
            }
            const verifyResult = await quickAuthClient.verifySiwf({
                domain: parsedSiwe.domain,
                message: response.result.message,
                signature: response.result.signature,
            });
            current = {
                token: verifyResult.token,
                payload: decodeJwt(verifyResult.token),
            };
            return verifyResult;
        }
        if (response.error.type === 'rejected_by_user') {
            throw new SignIn.RejectedByUser();
        }
        throw new Error('Unreachable');
    }
    return {
        get token() {
            if (current &&
                new Date(current.payload.exp * 1000) > new Date(Date.now() + 15000)) {
                return current.token;
            }
            return undefined;
        },
        async getToken(options = {}) {
            const force = options.force ?? false;
            if (current &&
                !force &&
                new Date(current.payload.exp * 1000) > new Date(Date.now() + 15000)) {
                return { token: current.token };
            }
            if (!pendingPromise) {
                pendingPromise = getTokenInner(options);
            }
            pendingPromise.finally(() => {
                pendingPromise = undefined;
            });
            return pendingPromise;
        },
        async fetch(url, options) {
            const { token } = await this.getToken();
            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${token}`);
            return fetch(url, {
                ...options,
                headers,
            });
        },
    };
})();
