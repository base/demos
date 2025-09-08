/**
 * useAnalytics handles analytics events and data preparation
 */
export declare const useAnalytics: () => {
    sendAnalytics: <T extends import('../types').AnalyticsEvent>(event: T, data: import('../types').AnalyticsEventData[T]) => Promise<void>;
};
//# sourceMappingURL=useAnalytics.d.ts.map