import { proxy, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { EnsUtil } from '../utils/EnsUtil.js';
import { StorageUtil } from '../utils/StorageUtil.js';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { AccountController } from './AccountController.js';
import { BlockchainApiController } from './BlockchainApiController.js';
import { ChainController } from './ChainController.js';
import { ConnectionController } from './ConnectionController.js';
import { ConnectorController } from './ConnectorController.js';
import { RouterController } from './RouterController.js';
// -- State --------------------------------------------- //
const state = proxy({
    suggestions: [],
    loading: false
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    async resolveName(name) {
        try {
            return await BlockchainApiController.lookupEnsName(name);
        }
        catch (e) {
            const error = e;
            throw new Error(error?.reasons?.[0]?.description || 'Error resolving name');
        }
    },
    async isNameRegistered(name) {
        try {
            await BlockchainApiController.lookupEnsName(name);
            return true;
        }
        catch {
            return false;
        }
    },
    async getSuggestions(value) {
        try {
            state.loading = true;
            state.suggestions = [];
            const response = await BlockchainApiController.getEnsNameSuggestions(value);
            state.suggestions =
                response.suggestions.map(suggestion => ({
                    ...suggestion,
                    name: suggestion.name
                })) || [];
            return state.suggestions;
        }
        catch (e) {
            const errorMessage = EnsController.parseEnsApiError(e, 'Error fetching name suggestions');
            throw new Error(errorMessage);
        }
        finally {
            state.loading = false;
        }
    },
    async getNamesForAddress(address) {
        try {
            const network = ChainController.state.activeCaipNetwork;
            if (!network) {
                return [];
            }
            const cachedEns = StorageUtil.getEnsFromCacheForAddress(address);
            if (cachedEns) {
                return cachedEns;
            }
            const response = await BlockchainApiController.reverseLookupEnsName({ address });
            StorageUtil.updateEnsCache({
                address,
                ens: response,
                timestamp: Date.now()
            });
            return response;
        }
        catch (e) {
            const errorMessage = EnsController.parseEnsApiError(e, 'Error fetching names for address');
            throw new Error(errorMessage);
        }
    },
    async registerName(name) {
        const network = ChainController.state.activeCaipNetwork;
        if (!network) {
            throw new Error('Network not found');
        }
        const address = AccountController.state.address;
        const emailConnector = ConnectorController.getAuthConnector();
        if (!address || !emailConnector) {
            throw new Error('Address or auth connector not found');
        }
        state.loading = true;
        try {
            const message = JSON.stringify({
                name,
                attributes: {},
                // Unix timestamp
                timestamp: Math.floor(Date.now() / 1000)
            });
            RouterController.pushTransactionStack({
                onCancel() {
                    RouterController.replace('RegisterAccountName');
                }
            });
            const signature = await ConnectionController.signMessage(message);
            state.loading = false;
            const networkId = network.id;
            if (!networkId) {
                throw new Error('Network not found');
            }
            const coinType = EnsUtil.convertEVMChainIdToCoinType(Number(networkId));
            await BlockchainApiController.registerEnsName({
                coinType,
                address: address,
                signature: signature,
                message
            });
            AccountController.setProfileName(name, network.chainNamespace);
            RouterController.replace('RegisterAccountNameSuccess');
        }
        catch (e) {
            const errorMessage = EnsController.parseEnsApiError(e, `Error registering name ${name}`);
            RouterController.replace('RegisterAccountName');
            throw new Error(errorMessage);
        }
        finally {
            state.loading = false;
        }
    },
    validateName(name) {
        return /^[a-zA-Z0-9-]{4,}$/u.test(name);
    },
    parseEnsApiError(error, defaultError) {
        const ensError = error;
        return ensError?.reasons?.[0]?.description || defaultError;
    }
};
// Export the controller wrapped with our error boundary
export const EnsController = withErrorBoundary(controller);
//# sourceMappingURL=EnsController.js.map