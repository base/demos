'use client';
import { deepEqual } from '@wagmi/core/internal';
import { useMemo, useRef } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';
const isPlainObject = (obj) => typeof obj === 'object' && !Array.isArray(obj);
export function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = deepEqual) {
    const trackedKeys = useRef([]);
    const result = useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, (x) => x, (a, b) => {
        if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
            for (const key of trackedKeys.current) {
                const equal = isEqual(a[key], b[key]);
                if (!equal)
                    return false;
            }
            return true;
        }
        return isEqual(a, b);
    });
    return useMemo(() => {
        if (isPlainObject(result)) {
            const trackedResult = { ...result };
            let properties = {};
            for (const [key, value] of Object.entries(trackedResult)) {
                properties = {
                    ...properties,
                    [key]: {
                        configurable: false,
                        enumerable: true,
                        get: () => {
                            if (!trackedKeys.current.includes(key)) {
                                trackedKeys.current.push(key);
                            }
                            return value;
                        },
                    },
                };
            }
            Object.defineProperties(trackedResult, properties);
            return trackedResult;
        }
        return result;
    }, [result]);
}
//# sourceMappingURL=useSyncExternalStoreWithTracked.js.map