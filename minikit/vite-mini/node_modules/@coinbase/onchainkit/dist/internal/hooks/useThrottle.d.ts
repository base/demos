type AnyFunction = (...args: unknown[]) => unknown;
/**
 * A hook that returns a throttled version of a callback function.
 * Throttling ensures the callback is executed at most once within the specified delay period.
 *
 * @param callback - The function to throttle
 * @param delay - The number of milliseconds to wait before allowing another execution
 *
 * @returns A throttled version of the callback that maintains the same arguments
 * and automatically cleans up any pending executions on unmount
 *
 * More details on throttle: https://developer.mozilla.org/en-US/docs/Glossary/Throttle
 */
export declare const useThrottle: <T extends AnyFunction>(callback: T, delay: number) => ((...args: Parameters<T>) => void);
export {};
//# sourceMappingURL=useThrottle.d.ts.map