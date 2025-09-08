import { createStore } from 'zustand/vanilla';
const correlationIdsStore = createStore(() => ({
    correlationIds: new Map(),
}));
export const correlationIds = {
    get: (key) => {
        const correlationId = correlationIdsStore.getState().correlationIds.get(key);
        return correlationId;
    },
    set: (key, correlationId) => {
        correlationIdsStore.setState((state) => {
            const newMap = new Map(state.correlationIds);
            newMap.set(key, correlationId);
            return { correlationIds: newMap };
        });
    },
    delete: (key) => {
        correlationIdsStore.setState((state) => {
            const newMap = new Map(state.correlationIds);
            newMap.delete(key);
            return { correlationIds: newMap };
        });
    },
    clear: () => {
        correlationIdsStore.setState({
            correlationIds: new Map(),
        });
    },
};
//# sourceMappingURL=store.js.map