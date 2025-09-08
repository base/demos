import { EventEmitter } from 'eventemitter3';
export class Emitter {
    constructor(uid) {
        Object.defineProperty(this, "uid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: uid
        });
        Object.defineProperty(this, "_emitter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new EventEmitter()
        });
    }
    on(eventName, fn) {
        this._emitter.on(eventName, fn);
    }
    once(eventName, fn) {
        this._emitter.once(eventName, fn);
    }
    off(eventName, fn) {
        this._emitter.off(eventName, fn);
    }
    emit(eventName, ...params) {
        const data = params[0];
        this._emitter.emit(eventName, { uid: this.uid, ...data });
    }
    listenerCount(eventName) {
        return this._emitter.listenerCount(eventName);
    }
}
export function createEmitter(uid) {
    return new Emitter(uid);
}
//# sourceMappingURL=createEmitter.js.map