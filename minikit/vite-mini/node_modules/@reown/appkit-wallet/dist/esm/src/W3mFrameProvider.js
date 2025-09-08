import { W3mFrame } from './W3mFrame.js';
import { W3mFrameConstants, W3mFrameRpcConstants } from './W3mFrameConstants.js';
import { W3mFrameHelpers } from './W3mFrameHelpers.js';
import { W3mFrameLogger } from './W3mFrameLogger.js';
import { W3mFrameStorage } from './W3mFrameStorage.js';
export class W3mFrameProvider {
    constructor({ projectId, chainId, enableLogger = true, onTimeout, abortController }) {
        this.openRpcRequests = [];
        this.isInitialized = false;
        if (enableLogger) {
            this.w3mLogger = new W3mFrameLogger(projectId);
        }
        this.abortController = abortController;
        this.w3mFrame = new W3mFrame({ projectId, isAppClient: true, chainId, enableLogger });
        this.onTimeout = onTimeout;
        if (this.getLoginEmailUsed()) {
            this.createFrame();
        }
    }
    async createFrame() {
        this.w3mFrame.initFrame();
        this.initPromise = new Promise(resolve => {
            this.w3mFrame.events.onFrameEvent(event => {
                if (event.type === W3mFrameConstants.FRAME_READY) {
                    setTimeout(() => {
                        resolve();
                    }, 500);
                }
            });
        });
        await this.initPromise;
        this.isInitialized = true;
        this.initPromise = undefined;
    }
    async init() {
        if (this.isInitialized) {
            return;
        }
        if (this.initPromise) {
            await this.initPromise;
            return;
        }
        await this.createFrame();
    }
    getLoginEmailUsed() {
        return Boolean(W3mFrameStorage.get(W3mFrameConstants.EMAIL_LOGIN_USED_KEY));
    }
    getEmail() {
        return W3mFrameStorage.get(W3mFrameConstants.EMAIL);
    }
    getUsername() {
        return W3mFrameStorage.get(W3mFrameConstants.SOCIAL_USERNAME);
    }
    async reload() {
        try {
            await this.appEvent({
                type: W3mFrameConstants.APP_RELOAD
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error reloading iframe');
            throw error;
        }
    }
    async connectEmail(payload) {
        try {
            W3mFrameHelpers.checkIfAllowedToTriggerEmail();
            await this.init();
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_CONNECT_EMAIL,
                payload
            });
            this.setNewLastEmailLoginTime();
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error connecting email');
            throw error;
        }
    }
    async connectDevice() {
        try {
            return this.appEvent({
                type: W3mFrameConstants.APP_CONNECT_DEVICE
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error connecting device');
            throw error;
        }
    }
    async connectOtp(payload) {
        try {
            return this.appEvent({
                type: W3mFrameConstants.APP_CONNECT_OTP,
                payload
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error connecting otp');
            throw error;
        }
    }
    async isConnected() {
        try {
            if (!this.getLoginEmailUsed()) {
                return { isConnected: false };
            }
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_IS_CONNECTED
            });
            if (!response?.isConnected) {
                this.deleteAuthLoginCache();
            }
            return response;
        }
        catch (error) {
            this.deleteAuthLoginCache();
            this.w3mLogger?.logger.error({ error }, 'Error checking connection');
            throw error;
        }
    }
    async getChainId() {
        try {
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_GET_CHAIN_ID
            });
            this.setLastUsedChainId(response.chainId);
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error getting chain id');
            throw error;
        }
    }
    async getSocialRedirectUri(payload) {
        try {
            await this.init();
            return this.appEvent({
                type: W3mFrameConstants.APP_GET_SOCIAL_REDIRECT_URI,
                payload
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error getting social redirect uri');
            throw error;
        }
    }
    async updateEmail(payload) {
        try {
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_UPDATE_EMAIL,
                payload
            });
            this.setNewLastEmailLoginTime();
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error updating email');
            throw error;
        }
    }
    async updateEmailPrimaryOtp(payload) {
        try {
            return this.appEvent({
                type: W3mFrameConstants.APP_UPDATE_EMAIL_PRIMARY_OTP,
                payload
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error updating email primary otp');
            throw error;
        }
    }
    async updateEmailSecondaryOtp(payload) {
        try {
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_UPDATE_EMAIL_SECONDARY_OTP,
                payload
            });
            this.setLoginSuccess(response.newEmail);
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error updating email secondary otp');
            throw error;
        }
    }
    async syncTheme(payload) {
        try {
            return this.appEvent({
                type: W3mFrameConstants.APP_SYNC_THEME,
                payload
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error syncing theme');
            throw error;
        }
    }
    async syncDappData(payload) {
        try {
            return this.appEvent({
                type: W3mFrameConstants.APP_SYNC_DAPP_DATA,
                payload
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error syncing dapp data');
            throw error;
        }
    }
    async getSmartAccountEnabledNetworks() {
        try {
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS
            });
            this.persistSmartAccountEnabledNetworks(response.smartAccountEnabledNetworks);
            return response;
        }
        catch (error) {
            this.persistSmartAccountEnabledNetworks([]);
            this.w3mLogger?.logger.error({ error }, 'Error getting smart account enabled networks');
            throw error;
        }
    }
    async setPreferredAccount(type) {
        try {
            return this.appEvent({
                type: W3mFrameConstants.APP_SET_PREFERRED_ACCOUNT,
                payload: { type }
            });
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error setting preferred account');
            throw error;
        }
    }
    async connect(payload) {
        if (payload?.socialUri) {
            try {
                await this.init();
                const response = await this.appEvent({
                    type: W3mFrameConstants.APP_CONNECT_SOCIAL,
                    payload: {
                        uri: payload.socialUri,
                        preferredAccountType: payload.preferredAccountType,
                        chainId: payload.chainId
                    }
                });
                if (response.userName) {
                    this.setSocialLoginSuccess(response.userName);
                }
                this.setLoginSuccess(response.email);
                this.setLastUsedChainId(response.chainId);
                this.user = response;
                return response;
            }
            catch (error) {
                this.w3mLogger?.logger.error({ error }, 'Error connecting social');
                throw error;
            }
        }
        else {
            try {
                const chainId = payload?.chainId || this.getLastUsedChainId() || 1;
                const response = await this.getUser({
                    chainId,
                    preferredAccountType: payload?.preferredAccountType
                });
                this.setLoginSuccess(response.email);
                this.setLastUsedChainId(response.chainId);
                this.user = response;
                return response;
            }
            catch (error) {
                this.w3mLogger?.logger.error({ error }, 'Error connecting');
                throw error;
            }
        }
    }
    async getUser(payload) {
        try {
            await this.init();
            const chainId = payload?.chainId || this.getLastUsedChainId() || 1;
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_GET_USER,
                payload: { ...payload, chainId }
            });
            this.user = response;
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error connecting');
            throw error;
        }
    }
    async connectSocial(uri) {
        try {
            await this.init();
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_CONNECT_SOCIAL,
                payload: { uri }
            });
            if (response.userName) {
                this.setSocialLoginSuccess(response.userName);
            }
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error connecting social');
            throw error;
        }
    }
    async getFarcasterUri() {
        try {
            await this.init();
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_GET_FARCASTER_URI
            });
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error getting farcaster uri');
            throw error;
        }
    }
    async connectFarcaster() {
        try {
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_CONNECT_FARCASTER
            });
            if (response.userName) {
                this.setSocialLoginSuccess(response.userName);
            }
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error connecting farcaster');
            throw error;
        }
    }
    async switchNetwork(chainId) {
        try {
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_SWITCH_NETWORK,
                payload: { chainId }
            });
            this.setLastUsedChainId(response.chainId);
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error switching network');
            throw error;
        }
    }
    async disconnect() {
        try {
            this.deleteAuthLoginCache();
            const response = await new Promise(async (resolve) => {
                const timeout = setTimeout(() => {
                    resolve();
                }, 3_000);
                await this.appEvent({
                    type: W3mFrameConstants.APP_SIGN_OUT
                });
                clearTimeout(timeout);
                resolve();
            });
            return response;
        }
        catch (error) {
            this.w3mLogger?.logger.error({ error }, 'Error disconnecting');
            throw error;
        }
    }
    async request(req) {
        try {
            if (W3mFrameRpcConstants.GET_CHAIN_ID === req.method) {
                return this.getLastUsedChainId();
            }
            this.rpcRequestHandler?.(req);
            const response = await this.appEvent({
                type: W3mFrameConstants.APP_RPC_REQUEST,
                payload: req
            });
            this.rpcSuccessHandler?.(response, req);
            return response;
        }
        catch (error) {
            this.rpcErrorHandler?.(error, req);
            this.w3mLogger?.logger.error({ error }, 'Error requesting');
            throw error;
        }
    }
    onRpcRequest(callback) {
        this.rpcRequestHandler = callback;
    }
    onRpcSuccess(callback) {
        this.rpcSuccessHandler = callback;
    }
    onRpcError(callback) {
        this.rpcErrorHandler = callback;
    }
    onIsConnected(callback) {
        this.w3mFrame.events.onFrameEvent(event => {
            if (event.type === W3mFrameConstants.FRAME_IS_CONNECTED_SUCCESS &&
                event.payload.isConnected) {
                callback();
            }
        });
    }
    onNotConnected(callback) {
        this.w3mFrame.events.onFrameEvent(event => {
            if (event.type === W3mFrameConstants.FRAME_IS_CONNECTED_ERROR) {
                callback();
            }
            if (event.type === W3mFrameConstants.FRAME_IS_CONNECTED_SUCCESS &&
                !event.payload.isConnected) {
                callback();
            }
        });
    }
    onConnect(callback) {
        this.w3mFrame.events.onFrameEvent(event => {
            if (event.type === W3mFrameConstants.FRAME_GET_USER_SUCCESS) {
                callback(event.payload);
            }
        });
    }
    onSocialConnected(callback) {
        this.w3mFrame.events.onFrameEvent(event => {
            if (event.type === W3mFrameConstants.FRAME_CONNECT_SOCIAL_SUCCESS) {
                callback(event.payload);
            }
        });
    }
    async getCapabilities() {
        try {
            const capabilities = await this.request({
                method: 'wallet_getCapabilities'
            });
            return capabilities || {};
        }
        catch {
            return {};
        }
    }
    onSetPreferredAccount(callback) {
        this.w3mFrame.events.onFrameEvent(event => {
            if (event.type === W3mFrameConstants.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS) {
                callback(event.payload);
            }
            else if (event.type === W3mFrameConstants.FRAME_SET_PREFERRED_ACCOUNT_ERROR) {
                callback({ type: W3mFrameRpcConstants.ACCOUNT_TYPES.EOA });
            }
        });
    }
    onGetSmartAccountEnabledNetworks(callback) {
        this.w3mFrame.events.onFrameEvent(event => {
            if (event.type === W3mFrameConstants.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS) {
                callback(event.payload.smartAccountEnabledNetworks);
            }
            else if (event.type === W3mFrameConstants.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR) {
                callback([]);
            }
        });
    }
    getAvailableChainIds() {
        return Object.keys(this.w3mFrame.networks);
    }
    rejectRpcRequests() {
        try {
            this.openRpcRequests.forEach(({ abortController, method }) => {
                if (!W3mFrameRpcConstants.SAFE_RPC_METHODS.includes(method)) {
                    abortController.abort();
                }
            });
            this.openRpcRequests = [];
        }
        catch (e) {
            this.w3mLogger?.logger.error({ error: e }, 'Error aborting RPC request');
        }
    }
    async appEvent(event) {
        let requestTimeout = undefined;
        let iframeReadyTimeout = undefined;
        function replaceEventType(type) {
            return type.replace('@w3m-app/', '');
        }
        const safeEventTypes = [
            W3mFrameConstants.APP_SYNC_DAPP_DATA,
            W3mFrameConstants.APP_SYNC_THEME,
            W3mFrameConstants.APP_SET_PREFERRED_ACCOUNT
        ];
        const type = replaceEventType(event.type);
        if (!this.w3mFrame.iframeIsReady &&
            !safeEventTypes.includes(event.type)) {
            iframeReadyTimeout = setTimeout(() => {
                this.onTimeout?.('iframe_load_failed');
                this.abortController.abort();
            }, 20_000);
        }
        await this.w3mFrame.frameLoadPromise;
        clearTimeout(iframeReadyTimeout);
        const shouldCheckForTimeout = [
            W3mFrameConstants.APP_CONNECT_EMAIL,
            W3mFrameConstants.APP_CONNECT_DEVICE,
            W3mFrameConstants.APP_CONNECT_OTP,
            W3mFrameConstants.APP_CONNECT_SOCIAL,
            W3mFrameConstants.APP_GET_SOCIAL_REDIRECT_URI
        ]
            .map(replaceEventType)
            .includes(type);
        if (shouldCheckForTimeout) {
            requestTimeout = setTimeout(() => {
                this.onTimeout?.('iframe_request_timeout');
                this.abortController.abort();
            }, 30_000);
        }
        return new Promise((resolve, reject) => {
            const id = Math.random().toString(36).substring(7);
            this.w3mLogger?.logger.info?.({ event, id }, 'Sending app event');
            this.w3mFrame.events.postAppEvent({ ...event, id });
            const abortController = new AbortController();
            if (type === 'RPC_REQUEST') {
                const rpcEvent = event;
                this.openRpcRequests = [...this.openRpcRequests, { ...rpcEvent.payload, abortController }];
            }
            abortController.signal.addEventListener('abort', () => {
                if (type === 'RPC_REQUEST') {
                    reject(new Error('Request was aborted'));
                }
                else if (type !== 'GET_FARCASTER_URI') {
                    reject(new Error('Something went wrong'));
                }
            });
            function handler(framEvent, logger) {
                if (framEvent.id !== id) {
                    return;
                }
                logger?.logger.info?.({ framEvent, id }, 'Received frame response');
                if (framEvent.type === `@w3m-frame/${type}_SUCCESS`) {
                    if (requestTimeout) {
                        clearTimeout(requestTimeout);
                    }
                    if (iframeReadyTimeout) {
                        clearTimeout(iframeReadyTimeout);
                    }
                    if ('payload' in framEvent) {
                        resolve(framEvent.payload);
                    }
                    resolve(undefined);
                }
                else if (framEvent.type === `@w3m-frame/${type}_ERROR`) {
                    if (requestTimeout) {
                        clearTimeout(requestTimeout);
                    }
                    if (iframeReadyTimeout) {
                        clearTimeout(iframeReadyTimeout);
                    }
                    if ('payload' in framEvent) {
                        reject(new Error(framEvent.payload?.message || 'An error occurred'));
                    }
                    reject(new Error('An error occurred'));
                }
            }
            this.w3mFrame.events.registerFrameEventHandler(id, frameEvent => handler(frameEvent, this.w3mLogger), this.abortController.signal);
        });
    }
    setNewLastEmailLoginTime() {
        W3mFrameStorage.set(W3mFrameConstants.LAST_EMAIL_LOGIN_TIME, Date.now().toString());
    }
    setSocialLoginSuccess(username) {
        W3mFrameStorage.set(W3mFrameConstants.SOCIAL_USERNAME, username);
    }
    setLoginSuccess(email) {
        if (email) {
            W3mFrameStorage.set(W3mFrameConstants.EMAIL, email);
        }
        W3mFrameStorage.set(W3mFrameConstants.EMAIL_LOGIN_USED_KEY, 'true');
        W3mFrameStorage.delete(W3mFrameConstants.LAST_EMAIL_LOGIN_TIME);
    }
    deleteAuthLoginCache() {
        W3mFrameStorage.delete(W3mFrameConstants.EMAIL_LOGIN_USED_KEY);
        W3mFrameStorage.delete(W3mFrameConstants.EMAIL);
        W3mFrameStorage.delete(W3mFrameConstants.LAST_USED_CHAIN_KEY);
        W3mFrameStorage.delete(W3mFrameConstants.SOCIAL_USERNAME);
    }
    setLastUsedChainId(chainId) {
        if (chainId) {
            W3mFrameStorage.set(W3mFrameConstants.LAST_USED_CHAIN_KEY, String(chainId));
        }
    }
    getLastUsedChainId() {
        const chainId = W3mFrameStorage.get(W3mFrameConstants.LAST_USED_CHAIN_KEY) ?? undefined;
        const numberChainId = Number(chainId);
        return isNaN(numberChainId) ? chainId : numberChainId;
    }
    persistSmartAccountEnabledNetworks(networks) {
        W3mFrameStorage.set(W3mFrameConstants.SMART_ACCOUNT_ENABLED_NETWORKS, networks.join(','));
    }
}
//# sourceMappingURL=W3mFrameProvider.js.map