import { fixture, html } from '@open-wc/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AssetController, AssetUtil, ChainController, ModalController, OptionsController } from '@reown/appkit-controllers';
import { W3mNetworkButton } from '../../src/modal/w3m-network-button';
import { HelpersUtil } from '../utils/HelpersUtil';
const mockCaipNetwork = {
    chainNamespace: 'eip155',
    caipNetworkId: 'eip155:1',
    id: 1,
    name: 'Test Network',
    nativeCurrency: { name: '', symbol: '', decimals: 0 },
    rpcUrls: { default: { http: [], webSocket: undefined } }
};
describe('W3mNetworkButton', () => {
    beforeEach(() => {
        vi.spyOn(AssetController, 'subscribeNetworkImages').mockImplementation(() => () => { });
        vi.spyOn(AssetUtil, 'getNetworkImage').mockReturnValue('network.png');
        vi.spyOn(ChainController.state, 'activeChain', 'get').mockReturnValue('eip155');
        vi.spyOn(ChainController.state, 'activeCaipNetwork', 'get').mockReturnValue(mockCaipNetwork);
        vi.spyOn(ModalController.state, 'loading', 'get').mockReturnValue(false);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('Network Support States', () => {
        it('should set isUnsupportedChain to false when allowUnsupportedChain is true', async () => {
            vi.spyOn(ChainController, 'checkIfSupportedNetwork').mockReturnValue(false);
            vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
                allowUnsupportedChain: true
            });
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(networkButton?.isUnsupportedChain).to.equal(false);
        });
        it('should set isUnsupportedChain to true when allowUnsupportedChain is false ', async () => {
            vi.spyOn(ChainController, 'checkIfSupportedNetwork').mockReturnValue(false);
            vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
                allowUnsupportedChain: false
            });
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(networkButton.isUnsupportedChain).to.equal(true);
        });
    });
    describe('Button Labels', () => {
        it('shows network name when allowUnsupportedChain is true', async () => {
            vi.spyOn(ChainController, 'checkIfSupportedNetwork').mockReturnValue(false);
            vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
                allowUnsupportedChain: true
            });
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(HelpersUtil.getTextContent(networkButton)).to.include('Test Network');
        });
        it('shows "Switch Network" when chain is unsupported and not allowed', async () => {
            vi.spyOn(ChainController, 'checkIfSupportedNetwork').mockReturnValue(false);
            vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
                allowUnsupportedChain: false
            });
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(HelpersUtil.getTextContent(networkButton)).to.include('Switch Network');
        });
        it('shows "Unknown Network" when has address but no network', async () => {
            vi.spyOn(ChainController.state, 'activeCaipNetwork', 'get').mockReturnValue(undefined);
            vi.spyOn(ChainController.state, 'activeCaipAddress', 'get').mockReturnValue('eip155:1:0x123');
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(HelpersUtil.getTextContent(networkButton)).to.include('Unknown Network');
        });
        it('shows custom label when provided and not connected', async () => {
            vi.spyOn(ChainController.state, 'activeCaipNetwork', 'get').mockReturnValue(undefined);
            const element = await fixture(html `<w3m-network-button label="Custom Label"></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(HelpersUtil.getTextContent(networkButton)).to.include('Custom Label');
        });
    });
    describe('Interactions', () => {
        it('opens network modal on click', async () => {
            const modalSpy = vi.spyOn(ModalController, 'open').mockResolvedValue(undefined);
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            HelpersUtil.querySelect(element, 'wui-network-button')?.click();
            expect(modalSpy).toHaveBeenCalled();
        });
        it('disables button when loading', async () => {
            vi.spyOn(ModalController.state, 'loading', 'get').mockReturnValue(true);
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(networkButton.disabled).to.equal(true);
        });
        it('disables button when disabled prop is true', async () => {
            const element = await fixture(html `<w3m-network-button .disabled=${true}></w3m-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(networkButton.disabled).to.equal(true);
        });
    });
    describe('Cleanup', () => {
        it('cleans up subscriptions on disconnect', async () => {
            const element = await fixture(html `<w3m-network-button></w3m-network-button>`);
            const unsubscribeSpy = vi.fn().mockReturnValue(() => { });
            element.unsubscribe = [unsubscribeSpy];
            element.disconnectedCallback();
            expect(unsubscribeSpy).toHaveBeenCalled();
        });
    });
    describe('AppKitNetworkButton', () => {
        it('renders with same functionality', async () => {
            vi.spyOn(ChainController.state, 'activeCaipNetwork', 'get').mockReturnValue(mockCaipNetwork);
            vi.spyOn(ChainController, 'checkIfSupportedNetwork').mockReturnValue(true);
            const element = await fixture(html `<appkit-network-button></appkit-network-button>`);
            const networkButton = HelpersUtil.querySelect(element, 'wui-network-button');
            expect(networkButton).to.exist;
            expect(HelpersUtil.getTextContent(networkButton)).to.include('Test Network');
        });
    });
});
//# sourceMappingURL=w3m-network-button.test.js.map