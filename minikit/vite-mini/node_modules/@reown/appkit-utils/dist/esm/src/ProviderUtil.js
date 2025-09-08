import { proxy, ref, subscribe } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
const CLEAN_PROVIDERS_STATE = {
    eip155: undefined,
    solana: undefined,
    polkadot: undefined,
    bip122: undefined,
    cosmos: undefined
};
const state = proxy({
    providers: { ...CLEAN_PROVIDERS_STATE },
    providerIds: { ...CLEAN_PROVIDERS_STATE }
});
export const ProviderUtil = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    subscribe(callback) {
        return subscribe(state, () => {
            callback(state);
        });
    },
    subscribeProviders(callback) {
        return subscribe(state.providers, () => callback(state.providers));
    },
    setProvider(chainNamespace, provider) {
        if (provider) {
            state.providers[chainNamespace] = ref(provider);
        }
    },
    getProvider(chainNamespace) {
        return state.providers[chainNamespace];
    },
    setProviderId(chainNamespace, providerId) {
        if (providerId) {
            state.providerIds[chainNamespace] = providerId;
        }
    },
    getProviderId(chainNamespace) {
        if (!chainNamespace) {
            return undefined;
        }
        return state.providerIds[chainNamespace];
    },
    reset() {
        state.providers = { ...CLEAN_PROVIDERS_STATE };
        state.providerIds = { ...CLEAN_PROVIDERS_STATE };
    },
    resetChain(chainNamespace) {
        state.providers[chainNamespace] = undefined;
        state.providerIds[chainNamespace] = undefined;
    }
};
//# sourceMappingURL=ProviderUtil.js.map