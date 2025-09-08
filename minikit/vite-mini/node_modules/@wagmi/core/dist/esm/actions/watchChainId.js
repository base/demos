/** https://wagmi.sh/core/api/actions/watchChainId */
export function watchChainId(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe((state) => state.chainId, onChange);
}
//# sourceMappingURL=watchChainId.js.map