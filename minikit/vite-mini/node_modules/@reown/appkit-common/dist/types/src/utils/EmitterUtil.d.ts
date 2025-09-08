type EventName = string;
type EventCallback<T> = (data?: T) => void;
type EventData = Record<EventName, any>;
export declare class Emitter {
    private static eventListeners;
    on<T extends EventName>(eventName: T, callback: EventCallback<EventData[T]>): void;
    off<T extends EventName>(eventName: T, callback: EventCallback<EventData[T]>): void;
    emit<T extends EventName>(eventName: T, data?: EventData[T]): void;
    clear(eventName: EventName): void;
    clearAll(): void;
}
export {};
