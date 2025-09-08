"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRelayClass = void 0;
const type_1 = require("../core/type");
const ScopedLocalStorage_1 = require("../lib/ScopedLocalStorage");
const RelayAbstract_1 = require("../relay/RelayAbstract");
const Session_1 = require("../relay/Session");
const fixtures_1 = require("./fixtures");
function makeMockReturn(response) {
    return { cancel: () => { }, promise: Promise.resolve(response) };
}
class MockRelayClass extends RelayAbstract_1.RelayAbstract {
    constructor() {
        super();
        this.requestEthereumAccounts = this.requestEthereumAccounts.bind(this);
    }
    resetAndReload() { }
    requestEthereumAccounts() {
        return makeMockReturn({
            method: 'requestEthereumAccounts',
            result: [(0, type_1.AddressString)(fixtures_1.MOCK_ADDERESS)],
        });
    }
    addEthereumChain() {
        return makeMockReturn({
            method: 'addEthereumChain',
            result: {
                isApproved: true,
                rpcUrl: 'https://node.ethchain.com',
            },
        });
    }
    watchAsset() {
        return makeMockReturn({
            method: 'watchAsset',
            result: true,
        });
    }
    selectProvider() {
        return makeMockReturn({
            method: 'selectProvider',
            result: type_1.ProviderType.CoinbaseWallet,
        });
    }
    switchEthereumChain() {
        return makeMockReturn({
            method: 'switchEthereumChain',
            result: {
                isApproved: true,
                rpcUrl: 'https://node.ethchain.com',
            },
        });
    }
    signEthereumMessage() {
        return makeMockReturn({
            method: 'signEthereumMessage',
            result: (0, type_1.HexString)('0x'),
        });
    }
    ethereumAddressFromSignedMessage() {
        return makeMockReturn({
            method: 'ethereumAddressFromSignedMessage',
            result: (0, type_1.AddressString)(fixtures_1.MOCK_ADDERESS),
        });
    }
    signEthereumTransaction() {
        return makeMockReturn({
            method: 'signEthereumTransaction',
            result: (0, type_1.HexString)(fixtures_1.MOCK_TX),
        });
    }
    signAndSubmitEthereumTransaction() {
        return makeMockReturn({
            method: 'submitEthereumTransaction',
            result: (0, type_1.HexString)(fixtures_1.MOCK_TX),
        });
    }
    submitEthereumTransaction() {
        return makeMockReturn({
            method: 'submitEthereumTransaction',
            result: (0, type_1.HexString)(fixtures_1.MOCK_TX),
        });
    }
    scanQRCode() {
        return makeMockReturn({
            method: 'scanQRCode',
            result: 'Success',
        });
    }
    genericRequest() {
        return makeMockReturn({
            method: 'generic',
            result: 'Success',
        });
    }
    sendRequest() {
        return { cancel: () => { }, promise: Promise.reject() };
    }
    setAppInfo() {
        return;
    }
    inlineAddEthereumChain() {
        return false;
    }
    setAccountsCallback() {
        return;
    }
    setChainCallback() {
        return;
    }
    setDappDefaultChainCallback() {
        return;
    }
    get session() {
        return new Session_1.Session(new ScopedLocalStorage_1.ScopedLocalStorage('session-test'));
    }
}
exports.MockRelayClass = MockRelayClass;
