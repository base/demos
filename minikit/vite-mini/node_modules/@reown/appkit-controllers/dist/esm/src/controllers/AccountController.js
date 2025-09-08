import { proxy, ref } from 'valtio/vanilla';
import { ConstantsUtil } from '../utils/ConstantsUtil.js';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { BlockchainApiController } from './BlockchainApiController.js';
import { ChainController } from './ChainController.js';
import { SnackController } from './SnackController.js';
// -- State --------------------------------------------- //
const state = proxy({
    currentTab: 0,
    tokenBalance: [],
    smartAccountDeployed: false,
    addressLabels: new Map(),
    allAccounts: []
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    replaceState(newState) {
        if (!newState) {
            return;
        }
        Object.assign(state, ref(newState));
    },
    subscribe(callback) {
        return ChainController.subscribeChainProp('accountState', accountState => {
            if (accountState) {
                return callback(accountState);
            }
            return undefined;
        });
    },
    subscribeKey(property, callback, chain) {
        let prev = undefined;
        return ChainController.subscribeChainProp('accountState', accountState => {
            if (accountState) {
                const nextValue = accountState[property];
                if (prev !== nextValue) {
                    prev = nextValue;
                    callback(nextValue);
                }
            }
        }, chain);
    },
    setStatus(status, chain) {
        ChainController.setAccountProp('status', status, chain);
    },
    getCaipAddress(chain) {
        return ChainController.getAccountProp('caipAddress', chain);
    },
    setCaipAddress(caipAddress, chain) {
        const newAddress = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : undefined;
        if (chain === ChainController.state.activeChain) {
            ChainController.state.activeCaipAddress = caipAddress;
        }
        ChainController.setAccountProp('caipAddress', caipAddress, chain);
        ChainController.setAccountProp('address', newAddress, chain);
    },
    setBalance(balance, balanceSymbol, chain) {
        ChainController.setAccountProp('balance', balance, chain);
        ChainController.setAccountProp('balanceSymbol', balanceSymbol, chain);
    },
    setProfileName(profileName, chain) {
        ChainController.setAccountProp('profileName', profileName, chain);
    },
    setProfileImage(profileImage, chain) {
        ChainController.setAccountProp('profileImage', profileImage, chain);
    },
    setUser(user, chain) {
        ChainController.setAccountProp('user', user, chain);
    },
    setAddressExplorerUrl(explorerUrl, chain) {
        ChainController.setAccountProp('addressExplorerUrl', explorerUrl, chain);
    },
    setSmartAccountDeployed(isDeployed, chain) {
        ChainController.setAccountProp('smartAccountDeployed', isDeployed, chain);
    },
    setCurrentTab(currentTab) {
        ChainController.setAccountProp('currentTab', currentTab, ChainController.state.activeChain);
    },
    setTokenBalance(tokenBalance, chain) {
        if (tokenBalance) {
            ChainController.setAccountProp('tokenBalance', tokenBalance, chain);
        }
    },
    setShouldUpdateToAddress(address, chain) {
        ChainController.setAccountProp('shouldUpdateToAddress', address, chain);
    },
    setAllAccounts(accounts, namespace) {
        ChainController.setAccountProp('allAccounts', accounts, namespace);
    },
    addAddressLabel(address, label, chain) {
        const map = ChainController.getAccountProp('addressLabels', chain) || new Map();
        map.set(address, label);
        ChainController.setAccountProp('addressLabels', map, chain);
    },
    removeAddressLabel(address, chain) {
        const map = ChainController.getAccountProp('addressLabels', chain) || new Map();
        map.delete(address);
        ChainController.setAccountProp('addressLabels', map, chain);
    },
    setConnectedWalletInfo(connectedWalletInfo, chain) {
        ChainController.setAccountProp('connectedWalletInfo', connectedWalletInfo, chain, false);
    },
    setPreferredAccountType(preferredAccountType, chain) {
        ChainController.setAccountProp('preferredAccountTypes', {
            ...state.preferredAccountTypes,
            [chain]: preferredAccountType
        }, chain);
    },
    setPreferredAccountTypes(preferredAccountTypes) {
        state.preferredAccountTypes = preferredAccountTypes;
    },
    setSocialProvider(socialProvider, chain) {
        if (socialProvider) {
            ChainController.setAccountProp('socialProvider', socialProvider, chain);
        }
    },
    setSocialWindow(socialWindow, chain) {
        ChainController.setAccountProp('socialWindow', socialWindow ? ref(socialWindow) : undefined, chain);
    },
    setFarcasterUrl(farcasterUrl, chain) {
        ChainController.setAccountProp('farcasterUrl', farcasterUrl, chain);
    },
    async fetchTokenBalance(onError) {
        state.balanceLoading = true;
        const chainId = ChainController.state.activeCaipNetwork?.caipNetworkId;
        const chain = ChainController.state.activeCaipNetwork?.chainNamespace;
        const caipAddress = ChainController.state.activeCaipAddress;
        const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : undefined;
        if (state.lastRetry &&
            !CoreHelperUtil.isAllowedRetry(state.lastRetry, 30 * ConstantsUtil.ONE_SEC_MS)) {
            state.balanceLoading = false;
            return [];
        }
        try {
            if (address && chainId && chain) {
                const response = await BlockchainApiController.getBalance(address, chainId);
                /*
                 * The 1Inch API includes many low-quality tokens in the balance response,
                 * which appear inconsistently. This filter prevents them from being displayed.
                 */
                const filteredBalances = response.balances.filter(balance => balance.quantity.decimals !== '0');
                AccountController.setTokenBalance(filteredBalances, chain);
                state.lastRetry = undefined;
                state.balanceLoading = false;
                return filteredBalances;
            }
        }
        catch (error) {
            state.lastRetry = Date.now();
            onError?.(error);
            SnackController.showError('Token Balance Unavailable');
        }
        finally {
            state.balanceLoading = false;
        }
        return [];
    },
    resetAccount(chain) {
        ChainController.resetAccount(chain);
    }
};
export const AccountController = withErrorBoundary(controller);
//# sourceMappingURL=AccountController.js.map