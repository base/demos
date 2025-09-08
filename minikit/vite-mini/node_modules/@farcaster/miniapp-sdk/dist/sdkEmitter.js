import EventEmitter from 'eventemitter3';
export function createEmitter() {
    const emitter = new EventEmitter();
    return {
        get eventNames() {
            return emitter.eventNames.bind(emitter);
        },
        get listenerCount() {
            return emitter.listenerCount.bind(emitter);
        },
        get listeners() {
            return emitter.listeners.bind(emitter);
        },
        addListener: emitter.addListener.bind(emitter),
        emit: emitter.emit.bind(emitter),
        off: emitter.off.bind(emitter),
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter),
        removeAllListeners: emitter.removeAllListeners.bind(emitter),
        removeListener: emitter.removeListener.bind(emitter),
    };
}
export const emitter = createEmitter();
