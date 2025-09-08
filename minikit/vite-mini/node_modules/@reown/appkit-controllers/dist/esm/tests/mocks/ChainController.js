import { vi } from 'vitest';
import { ChainController } from '../../exports/index.js';
export function mockChainControllerState() {
    ChainController.state.chains = new Map([
        [
            'eip155',
            {
                accountState: {
                    currentTab: 0,
                    tokenBalance: [],
                    smartAccountDeployed: false,
                    addressLabels: new Map(),
                    allAccounts: [],
                    user: undefined
                },
                connectionControllerClient: {
                    disconnect: vi.fn()
                }
            }
        ]
    ]);
    ChainController.state.activeChain = 'eip155';
}
export function mockResetChainControllerState() {
    ChainController.state.chains = new Map();
    ChainController.state.activeChain = undefined;
}
//# sourceMappingURL=ChainController.js.map