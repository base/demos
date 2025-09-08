export class Emitter {
    on(eventName, callback) {
        if (!Emitter.eventListeners.has(eventName)) {
            Emitter.eventListeners.set(eventName, new Set());
        }
        Emitter.eventListeners.get(eventName)?.add(callback);
    }
    off(eventName, callback) {
        const listeners = Emitter.eventListeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
        }
    }
    emit(eventName, data) {
        const listeners = Emitter.eventListeners.get(eventName);
        if (listeners) {
            listeners.forEach(callback => callback(data));
        }
    }
    clear(eventName) {
        Emitter.eventListeners.delete(eventName);
    }
    clearAll() {
        Emitter.eventListeners.clear();
    }
}
Emitter.eventListeners = new Map();
//# sourceMappingURL=EmitterUtil.js.map