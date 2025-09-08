export function extractRpcUrls(parameters) {
    const { chain } = parameters;
    const fallbackUrl = chain.rpcUrls.default.http[0];
    if (!parameters.transports)
        return [fallbackUrl];
    const transport = parameters.transports?.[chain.id]?.({ chain });
    const transports = transport?.value?.transports || [transport];
    return transports.map(({ value }) => value?.url || fallbackUrl);
}
//# sourceMappingURL=extractRpcUrls.js.map