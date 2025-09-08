import { EventEmitter } from 'eventemitter3';
type EventMap = Record<string, object | never>;
type EventKey<eventMap extends EventMap> = string & keyof eventMap;
type EventFn<parameters extends unknown[] = any[]> = (...parameters: parameters) => void;
export type EventData<eventMap extends EventMap, eventName extends keyof eventMap> = (eventMap[eventName] extends [never] ? unknown : eventMap[eventName]) & {
    uid: string;
};
export declare class Emitter<eventMap extends EventMap> {
    uid: string;
    _emitter: EventEmitter<string | symbol, any>;
    constructor(uid: string);
    on<key extends EventKey<eventMap>>(eventName: key, fn: EventFn<eventMap[key] extends [never] ? [{
        uid: string;
    }] : [data: eventMap[key] & {
        uid: string;
    }]>): void;
    once<key extends EventKey<eventMap>>(eventName: key, fn: EventFn<eventMap[key] extends [never] ? [{
        uid: string;
    }] : [data: eventMap[key] & {
        uid: string;
    }]>): void;
    off<key extends EventKey<eventMap>>(eventName: key, fn: EventFn<eventMap[key] extends [never] ? [{
        uid: string;
    }] : [data: eventMap[key] & {
        uid: string;
    }]>): void;
    emit<key extends EventKey<eventMap>>(eventName: key, ...params: eventMap[key] extends [never] ? [] : [data: eventMap[key]]): void;
    listenerCount<key extends EventKey<eventMap>>(eventName: key): number;
}
export declare function createEmitter<eventMap extends EventMap>(uid: string): Emitter<eventMap>;
export {};
//# sourceMappingURL=createEmitter.d.ts.map