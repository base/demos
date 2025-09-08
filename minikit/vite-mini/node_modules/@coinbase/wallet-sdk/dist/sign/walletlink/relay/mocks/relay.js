import { MOCK_ADDERESS, MOCK_TX } from './fixtures.js';
import { HexString } from '../../../../core/type/index.js';
export function mockedWalletLinkRelay() {
    return mock;
}
function makeMockReturn(response) {
    return Promise.resolve(response);
}
const mock = {
    resetAndReload() { },
    requestEthereumAccounts() {
        return makeMockReturn({
            method: 'requestEthereumAccounts',
            result: [MOCK_ADDERESS],
        });
    },
    addEthereumChain() {
        return makeMockReturn({
            method: 'addEthereumChain',
            result: {
                isApproved: true,
                rpcUrl: 'https://node.ethchain.com',
            },
        });
    },
    watchAsset() {
        return makeMockReturn({
            method: 'watchAsset',
            result: true,
        });
    },
    switchEthereumChain() {
        return makeMockReturn({
            method: 'switchEthereumChain',
            result: {
                isApproved: true,
                rpcUrl: 'https://node.ethchain.com',
            },
        });
    },
    signEthereumTransaction() {
        return makeMockReturn({
            method: 'signEthereumTransaction',
            result: HexString(MOCK_TX),
        });
    },
    signAndSubmitEthereumTransaction() {
        return makeMockReturn({
            method: 'submitEthereumTransaction',
            result: HexString(MOCK_TX),
        });
    },
    submitEthereumTransaction() {
        return makeMockReturn({
            method: 'submitEthereumTransaction',
            result: HexString(MOCK_TX),
        });
    },
    sendRequest() {
        return Promise.reject();
    },
};
//# sourceMappingURL=relay.js.map