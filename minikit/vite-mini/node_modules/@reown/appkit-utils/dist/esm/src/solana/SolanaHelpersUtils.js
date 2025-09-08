import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { SolConstantsUtil } from './SolanaConstantsUtil.js';
export const SolHelpersUtil = {
    detectRpcUrl(chain, projectId) {
        if (chain.rpcUrls.default.http[0]?.includes(new URL(CommonConstantsUtil.BLOCKCHAIN_API_RPC_URL).hostname)) {
            return `${chain.rpcUrls.default.http[0]}?chainId=solana:${chain.id}&projectId=${projectId}`;
        }
        return chain.rpcUrls.default.http[0];
    },
    getChain(chains, chainId) {
        const chain = chains.find(lChain => lChain.id === chainId);
        if (chain) {
            return chain;
        }
        return SolConstantsUtil.DEFAULT_CHAIN;
    },
    hexStringToNumber(value) {
        const hexString = value.startsWith('0x') ? value.slice(2) : value;
        const decimalValue = parseInt(hexString, 16);
        return decimalValue;
    },
    getAddress(provider) {
        const address = provider.publicKey?.toBase58();
        return address;
    }
};
//# sourceMappingURL=SolanaHelpersUtils.js.map