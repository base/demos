/** https://wagmi.sh/core/api/actions/watchConnectors */
export function watchConnectors(config, parameters) {
    const { onChange } = parameters;
    return config._internal.connectors.subscribe((connectors, prevConnectors) => {
        onChange(Object.values(connectors), prevConnectors);
    });
}
//# sourceMappingURL=watchConnectors.js.map