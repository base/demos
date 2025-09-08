import { proxy, ref, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
const state = proxy({
    provider: undefined,
    providerType: undefined,
    address: undefined,
    chainId: undefined,
    status: 'reconnecting',
    isConnected: false
});
export const EthersStoreUtil = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    setProvider(provider) {
        if (provider) {
            state.provider = ref(provider);
        }
    },
    setProviderType(providerType) {
        state.providerType = providerType;
    },
    setAddress(address) {
        state.address = address;
    },
    setPreferredAccountType(preferredAccountType) {
        state.preferredAccountType = preferredAccountType;
    },
    setChainId(chainId) {
        state.chainId = chainId;
    },
    setStatus(status) {
        state.status = status;
    },
    setIsConnected(isConnected) {
        state.isConnected = isConnected;
    },
    setError(error) {
        state.error = error;
    },
    reset() {
        state.provider = undefined;
        state.address = undefined;
        state.chainId = undefined;
        state.providerType = undefined;
        state.status = 'disconnected';
        state.isConnected = false;
        state.error = undefined;
        state.preferredAccountType = undefined;
    }
};
//# sourceMappingURL=EthersStoreUtil.js.map