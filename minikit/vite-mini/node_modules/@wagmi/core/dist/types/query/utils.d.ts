import { type QueryKey } from '@tanstack/query-core';
export declare function structuralSharing<data>(oldData: data | undefined, newData: data): data;
export declare function hashFn(queryKey: QueryKey): string;
export declare function filterQueryOptions<type extends Record<string, unknown>>(options: type): type;
//# sourceMappingURL=utils.d.ts.map