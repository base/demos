import { fixture } from '@open-wc/testing';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { ApiController, ConnectorController, CoreHelperUtil, EventsController, OptionsController, RouterController } from '@reown/appkit-controllers';
import { W3mAllWalletsWidget } from '../../src/partials/w3m-all-wallets-widget';
import { HelpersUtil } from '../utils/HelpersUtil';
const ALL_WALLETS_TEST_ID = 'all-wallets';
const WALLET_CONNECT_ID = 'walletConnect';
const mockConnectorState = {
    connectors: [],
    activeConnector: undefined,
    allConnectors: [],
    filterByNamespace: undefined,
    activeConnectorIds: {
        eip155: undefined,
        solana: undefined,
        polkadot: undefined,
        bip122: undefined,
        cosmos: undefined
    },
    filterByNamespaceMap: {
        eip155: true,
        solana: true,
        polkadot: true,
        bip122: true,
        cosmos: true
    }
};
const mockOptionsState = {
    allWallets: 'SHOW',
    projectId: 'test-project-id',
    sdkVersion: '1.0.0',
    sdkType: 'appkit',
    defaultAccountTypes: {}
};
const mockConnector = {
    id: WALLET_CONNECT_ID,
    type: 'WALLET_CONNECT',
    name: 'WalletConnect',
    chain: 'eip155'
};
const featuredWallets = [
    {
        id: '1',
        name: 'Test Wallet',
        rdns: 'io.test',
        homepage: 'https://test.com',
        image_url: 'https://test.com/image.png'
    }
];
const mockApiState = {
    page: 1,
    count: 8,
    featured: featuredWallets,
    allFeatured: featuredWallets,
    allRecommended: [],
    promises: {},
    recommended: [],
    wallets: [],
    search: [],
    isAnalyticsEnabled: false,
    excludedWallets: [],
    isFetchingRecommendedWallets: false,
    filteredWallets: []
};
describe('W3mAllWalletsWidget', () => {
    beforeAll(() => {
        vi.spyOn(CoreHelperUtil, 'isMobile').mockReturnValue(false);
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it('should not render if WalletConnect connector is not found', async () => {
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue(mockConnectorState);
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        expect(HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID)).toBeNull();
    });
    it('should not render if allWallets option is HIDE', async () => {
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue({
            ...mockConnectorState,
            connectors: [mockConnector]
        });
        vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
            allWallets: 'HIDE'
        });
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        expect(HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID)).toBeNull();
    });
    it('should not render if allWallets is ONLY_MOBILE and not on mobile', async () => {
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue({
            ...mockConnectorState,
            connectors: [mockConnector]
        });
        vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
            allWallets: 'ONLY_MOBILE'
        });
        vi.spyOn(CoreHelperUtil, 'isMobile').mockReturnValue(false);
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        expect(HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID)).toBeNull();
    });
    it('should render with correct wallet count tag', async () => {
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue({
            ...mockConnectorState,
            connectors: [mockConnector]
        });
        vi.spyOn(OptionsController, 'state', 'get').mockReturnValue(mockOptionsState);
        vi.spyOn(ApiController, 'state', 'get').mockReturnValue(mockApiState);
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        const walletList = HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID);
        expect(walletList).not.toBeNull();
        expect(walletList.getAttribute('tagLabel')).toBe('9');
    });
    it('should navigate to AllWallets view and track event on click', async () => {
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue({
            ...mockConnectorState,
            connectors: [mockConnector]
        });
        vi.spyOn(OptionsController, 'state', 'get').mockReturnValue(mockOptionsState);
        vi.spyOn(ApiController, 'state', 'get').mockReturnValue(mockApiState);
        const routerPushSpy = vi.spyOn(RouterController, 'push');
        const sendEventSpy = vi.spyOn(EventsController, 'sendEvent');
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        const walletList = HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID);
        walletList.click();
        expect(sendEventSpy).toHaveBeenCalledWith({ type: 'track', event: 'CLICK_ALL_WALLETS' });
        expect(routerPushSpy).toHaveBeenCalledWith('AllWallets');
    });
    it('should update wallet count when filteredWallets changes', async () => {
        const initialFilteredWallets = [
            {
                id: '2',
                name: 'Filtered Wallet',
                rdns: 'io.filtered',
                homepage: 'https://filtered.com',
                image_url: 'https://filtered.com/image.png'
            }
        ];
        const apiState = {
            ...mockApiState,
            filteredWallets: initialFilteredWallets
        };
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue({
            ...mockConnectorState,
            connectors: [mockConnector]
        });
        vi.spyOn(OptionsController, 'state', 'get').mockReturnValue(mockOptionsState);
        vi.spyOn(ApiController, 'state', 'get').mockReturnValue(apiState);
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        let walletList = HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID);
        expect(walletList.getAttribute('tagLabel')).toBe('1');
        apiState.filteredWallets = [
            ...initialFilteredWallets,
            {
                id: '3',
                name: 'Another Filtered Wallet',
                rdns: 'io.another',
                homepage: 'https://another.com',
                image_url: 'https://another.com/image.png'
            }
        ];
        element.requestUpdate();
        await element.updateComplete;
        walletList = HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID);
        expect(walletList.getAttribute('tagLabel')).toBe('1');
    });
    it('should show total wallet count when filteredWallets is empty', async () => {
        vi.spyOn(ConnectorController, 'state', 'get').mockReturnValue({
            ...mockConnectorState,
            connectors: [mockConnector]
        });
        vi.spyOn(OptionsController, 'state', 'get').mockReturnValue(mockOptionsState);
        vi.spyOn(ApiController, 'state', 'get').mockReturnValue({
            ...mockApiState,
            count: 15,
            featured: featuredWallets,
            filteredWallets: []
        });
        const element = await fixture(html `<w3m-all-wallets-widget></w3m-all-wallets-widget>`);
        const walletList = HelpersUtil.getByTestId(element, ALL_WALLETS_TEST_ID);
        expect(walletList).not.toBeNull();
        expect(walletList.getAttribute('tagLabel')).toBe('10+');
    });
});
//# sourceMappingURL=w3m-all-wallets-widget.test.js.map