import { proxy, snapshot } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { ConstantsUtil } from '../utils/ConstantsUtil.js';
import { OptionsUtil } from '../utils/OptionsUtil.js';
// -- State --------------------------------------------- //
const state = proxy({
    features: ConstantsUtil.DEFAULT_FEATURES,
    projectId: '',
    sdkType: 'appkit',
    sdkVersion: 'html-wagmi-undefined',
    defaultAccountTypes: ConstantsUtil.DEFAULT_ACCOUNT_TYPES,
    enableNetworkSwitch: true,
    experimental_preferUniversalLinks: false,
    remoteFeatures: {}
});
// -- Controller ---------------------------------------- //
export const OptionsController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setOptions(options) {
        Object.assign(state, options);
    },
    setRemoteFeatures(remoteFeatures) {
        if (!remoteFeatures) {
            return;
        }
        const newRemoteFeatures = { ...state.remoteFeatures, ...remoteFeatures };
        state.remoteFeatures = newRemoteFeatures;
        if (state.remoteFeatures?.socials) {
            state.remoteFeatures.socials = OptionsUtil.filterSocialsByPlatform(state.remoteFeatures.socials);
        }
    },
    setFeatures(features) {
        if (!features) {
            return;
        }
        if (!state.features) {
            state.features = ConstantsUtil.DEFAULT_FEATURES;
        }
        const newFeatures = { ...state.features, ...features };
        state.features = newFeatures;
    },
    setProjectId(projectId) {
        state.projectId = projectId;
    },
    setCustomRpcUrls(customRpcUrls) {
        state.customRpcUrls = customRpcUrls;
    },
    setAllWallets(allWallets) {
        state.allWallets = allWallets;
    },
    setIncludeWalletIds(includeWalletIds) {
        state.includeWalletIds = includeWalletIds;
    },
    setExcludeWalletIds(excludeWalletIds) {
        state.excludeWalletIds = excludeWalletIds;
    },
    setFeaturedWalletIds(featuredWalletIds) {
        state.featuredWalletIds = featuredWalletIds;
    },
    setTokens(tokens) {
        state.tokens = tokens;
    },
    setTermsConditionsUrl(termsConditionsUrl) {
        state.termsConditionsUrl = termsConditionsUrl;
    },
    setPrivacyPolicyUrl(privacyPolicyUrl) {
        state.privacyPolicyUrl = privacyPolicyUrl;
    },
    setCustomWallets(customWallets) {
        state.customWallets = customWallets;
    },
    setIsSiweEnabled(isSiweEnabled) {
        state.isSiweEnabled = isSiweEnabled;
    },
    setIsUniversalProvider(isUniversalProvider) {
        state.isUniversalProvider = isUniversalProvider;
    },
    setSdkVersion(sdkVersion) {
        state.sdkVersion = sdkVersion;
    },
    setMetadata(metadata) {
        state.metadata = metadata;
    },
    setDisableAppend(disableAppend) {
        state.disableAppend = disableAppend;
    },
    setEIP6963Enabled(enableEIP6963) {
        state.enableEIP6963 = enableEIP6963;
    },
    setDebug(debug) {
        state.debug = debug;
    },
    setEnableWalletConnect(enableWalletConnect) {
        state.enableWalletConnect = enableWalletConnect;
    },
    setEnableWalletGuide(enableWalletGuide) {
        state.enableWalletGuide = enableWalletGuide;
    },
    setEnableAuthLogger(enableAuthLogger) {
        state.enableAuthLogger = enableAuthLogger;
    },
    setEnableWallets(enableWallets) {
        state.enableWallets = enableWallets;
    },
    setPreferUniversalLinks(preferUniversalLinks) {
        state.experimental_preferUniversalLinks = preferUniversalLinks;
    },
    setHasMultipleAddresses(hasMultipleAddresses) {
        state.hasMultipleAddresses = hasMultipleAddresses;
    },
    setSIWX(siwx) {
        state.siwx = siwx;
    },
    setConnectMethodsOrder(connectMethodsOrder) {
        state.features = {
            ...state.features,
            connectMethodsOrder
        };
    },
    setWalletFeaturesOrder(walletFeaturesOrder) {
        state.features = {
            ...state.features,
            walletFeaturesOrder
        };
    },
    setSocialsOrder(socialsOrder) {
        state.remoteFeatures = {
            ...state.remoteFeatures,
            socials: socialsOrder
        };
    },
    setCollapseWallets(collapseWallets) {
        state.features = {
            ...state.features,
            collapseWallets
        };
    },
    setEnableEmbedded(enableEmbedded) {
        state.enableEmbedded = enableEmbedded;
    },
    setAllowUnsupportedChain(allowUnsupportedChain) {
        state.allowUnsupportedChain = allowUnsupportedChain;
    },
    setManualWCControl(manualWCControl) {
        state.manualWCControl = manualWCControl;
    },
    setEnableNetworkSwitch(enableNetworkSwitch) {
        state.enableNetworkSwitch = enableNetworkSwitch;
    },
    setDefaultAccountTypes(defaultAccountType = {}) {
        Object.entries(defaultAccountType).forEach(([namespace, accountType]) => {
            if (accountType) {
                // @ts-expect-error - Keys are validated by the param type
                state.defaultAccountTypes[namespace] = accountType;
            }
        });
    },
    setUniversalProviderConfigOverride(universalProviderConfigOverride) {
        state.universalProviderConfigOverride = universalProviderConfigOverride;
    },
    getUniversalProviderConfigOverride() {
        return state.universalProviderConfigOverride;
    },
    getSnapshot() {
        return snapshot(state);
    }
};
//# sourceMappingURL=OptionsController.js.map