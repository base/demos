export function getClient(config, parameters = {}) {
    try {
        return config.getClient(parameters);
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=getClient.js.map