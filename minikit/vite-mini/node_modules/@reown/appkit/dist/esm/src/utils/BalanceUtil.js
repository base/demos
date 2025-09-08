// Unified method for fetching balance for vue/react
export async function _internalFetchBalance(appKit) {
    if (!appKit) {
        throw new Error('AppKit not initialized when  fetchBalance was called.');
    }
    return await updateBalance(appKit);
}
export async function updateBalance(appKit) {
    const address = appKit.getAddress();
    const chainNamespace = appKit.getActiveChainNamespace();
    const chainId = appKit.getCaipNetwork()?.id;
    if (!address || !chainNamespace || !chainId) {
        return {
            data: undefined,
            error: 'Not able to retrieve balance',
            isSuccess: false,
            isError: true
        };
    }
    const balance = await appKit.updateNativeBalance(address, chainId, chainNamespace);
    return {
        data: balance,
        error: balance ? null : 'No balance found',
        isSuccess: Boolean(balance),
        isError: !balance
    };
}
//# sourceMappingURL=BalanceUtil.js.map