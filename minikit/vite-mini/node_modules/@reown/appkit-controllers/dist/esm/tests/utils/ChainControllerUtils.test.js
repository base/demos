import { describe, expect, it } from 'vitest';
import { ConstantsUtil } from '@reown/appkit-common';
import { ChainController } from '../../src/controllers/ChainController.js';
import { ConnectorController } from '../../src/controllers/ConnectorController.js';
import { getChainsToDisconnect } from '../../src/utils/ChainControllerUtil.js';
describe('getChainsToDisconnect', () => {
    it('should return all chains when no namespace is provided', () => {
        const mockChains = new Map([
            ['eip155', {}],
            ['solana', {}],
            ['polkadot', {}],
            ['bip122', {}]
        ]);
        ChainController.state.chains = mockChains;
        ConnectorController.state.activeConnectorIds = {
            eip155: 'eip155-connector',
            solana: 'solana-connector',
            polkadot: 'polkadot-connector',
            bip122: 'bip122-connector',
            cosmos: 'cosmos-connector'
        };
        const result = getChainsToDisconnect();
        expect(result).toEqual(Array.from(mockChains.entries()));
    });
    it('should return all namespaces connected with WalletConnect connector', () => {
        const mockChains = new Map([
            ['eip155', {}],
            ['solana', {}],
            ['polkadot', {}],
            ['bip122', {}]
        ]);
        ChainController.state.chains = mockChains;
        ConnectorController.state.activeConnectorIds = {
            eip155: ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,
            solana: 'solana-connector',
            polkadot: 'polkadot-connector',
            bip122: ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,
            cosmos: 'cosmos-connector'
        };
        const result = getChainsToDisconnect('eip155');
        expect(result).toEqual([
            ['eip155', mockChains.get('eip155')],
            ['bip122', mockChains.get('bip122')]
        ]);
    });
    it('should return all namespaces connected with WalletConnect connector', () => {
        const mockChains = new Map([
            ['eip155', {}],
            ['solana', {}],
            ['polkadot', {}],
            ['bip122', {}]
        ]);
        ChainController.state.chains = mockChains;
        ConnectorController.state.activeConnectorIds = {
            eip155: ConstantsUtil.CONNECTOR_ID.AUTH,
            solana: ConstantsUtil.CONNECTOR_ID.AUTH,
            polkadot: 'polkadot-connector',
            bip122: 'bip122-connector',
            cosmos: 'cosmos-connector'
        };
        const result = getChainsToDisconnect('solana');
        expect(result).toEqual([
            ['solana', mockChains.get('solana')],
            ['eip155', mockChains.get('eip155')]
        ]);
    });
});
//# sourceMappingURL=ChainControllerUtils.test.js.map