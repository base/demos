import EventEmitter from 'eventemitter3';
import type { Emitter, EventMap } from './types.ts';
export declare function createEmitter(): Emitter;
export declare const emitter: {
    eventNames: () => (keyof EventMap)[];
    listeners: <T extends keyof EventMap>(event: T) => ((...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => void)[];
    listenerCount: (event: keyof EventMap) => number;
    emit: <T extends keyof EventMap>(event: T, ...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => boolean;
    on: <T extends keyof EventMap>(event: T, fn: (...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => void, context?: any) => EventEmitter<EventMap, any>;
    addListener: <T extends keyof EventMap>(event: T, fn: (...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => void, context?: any) => EventEmitter<EventMap, any>;
    once: <T extends keyof EventMap>(event: T, fn: (...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => void, context?: any) => EventEmitter<EventMap, any>;
    removeListener: <T extends keyof EventMap>(event: T, fn?: ((...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => void) | undefined, context?: any, once?: boolean) => EventEmitter<EventMap, any>;
    off: <T extends keyof EventMap>(event: T, fn?: ((...args: EventEmitter.ArgumentMap<EventMap>[Extract<T, keyof EventMap>]) => void) | undefined, context?: any, once?: boolean) => EventEmitter<EventMap, any>;
    removeAllListeners: (event?: keyof EventMap | undefined) => EventEmitter<EventMap, any>;
};
