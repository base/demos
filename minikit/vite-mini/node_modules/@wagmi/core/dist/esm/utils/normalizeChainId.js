/** @deprecated use `Number` instead */
export function normalizeChainId(chainId) {
    if (typeof chainId === 'string')
        return Number.parseInt(chainId, chainId.trim().substring(0, 2) === '0x' ? 16 : 10);
    if (typeof chainId === 'bigint')
        return Number(chainId);
    if (typeof chainId === 'number')
        return chainId;
    throw new Error(`Cannot normalize chainId "${chainId}" of type "${typeof chainId}"`);
}
//# sourceMappingURL=normalizeChainId.js.map