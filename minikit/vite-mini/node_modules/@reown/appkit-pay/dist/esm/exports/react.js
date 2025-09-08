import { useCallback, useEffect, useRef, useState } from 'react';
import { getPayUrl as clientGetPayUrl, openPayUrl as clientOpenPayUrl, getAvailableExchanges } from '../src/client.js';
import { PayController } from '../src/controllers/PayController.js';
import { AppKitPayError, AppKitPayErrorCodes } from '../src/types/errors.js';
const MINIMUM_POLLING_INTERVAL = 3000;
export function usePay(parameters) {
    const { onSuccess, onError } = parameters ?? {};
    const [isControllerLoading, setIsControllerLoading] = useState(PayController.state.isLoading);
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(PayController.state.isPaymentInProgress);
    const [error, setError] = useState(PayController.state.error);
    const [data, setData] = useState(PayController.state.currentPayment?.result ?? null);
    useEffect(() => {
        const unsubLoading = PayController.subscribeKey('isLoading', val => setIsControllerLoading(val));
        const unsubProgress = PayController.subscribeKey('isPaymentInProgress', val => {
            setIsPaymentInProgress(val);
            const payResult = PayController.state.currentPayment?.result ?? null;
            setData(payResult);
            if (payResult && onSuccess) {
                onSuccess(payResult);
            }
            if (payResult) {
                setError(null);
            }
        });
        const unsubError = PayController.subscribeKey('error', val => {
            setError(val);
            if (val && onError) {
                onError(val);
            }
            if (val) {
                setData(null);
            }
        });
        return () => {
            unsubLoading();
            unsubProgress();
            unsubError();
        };
    }, [onSuccess, onError]);
    const open = useCallback(async (options) => {
        setError(null);
        setData(null);
        await PayController.handleOpenPay(options);
    }, []);
    const isPending = isControllerLoading || isPaymentInProgress;
    const isError = error !== null;
    const isSuccess = data !== null && !isError;
    return {
        open,
        isPending,
        isSuccess,
        isError,
        error,
        data
    };
}
export function useAvailableExchanges(options) {
    const { shouldFetchOnInit = true, page: initialPage, asset, amount, network } = options ?? {};
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(shouldFetchOnInit);
    const [error, setError] = useState(null);
    const fetchExchanges = useCallback(async (params) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAvailableExchanges(params);
            setData(response.exchanges);
        }
        catch (err) {
            const fetchError = err instanceof Error ? err : new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES);
            setError(fetchError);
            setData(null);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        if (shouldFetchOnInit) {
            fetchExchanges({ page: initialPage, asset, amount, network }).catch(() => {
            });
        }
    }, [shouldFetchOnInit, initialPage]);
    const fetch = useCallback(async (params) => {
        await fetchExchanges(params);
    }, [fetchExchanges]);
    return { data, isLoading, error, fetch };
}
export function usePayUrlActions() {
    const getUrl = useCallback(async (exchangeId, params) => clientGetPayUrl(exchangeId, params), []);
    const openUrl = useCallback(async (exchangeId, params, openInNewTab) => clientOpenPayUrl(exchangeId, params, openInNewTab), []);
    return { getUrl, openUrl };
}
export function useExchangeBuyStatus(params) {
    const { exchangeId, sessionId, pollingInterval, isEnabled = true, onSuccess, onError } = params;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(isEnabled);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);
    const fetchAndSetStatus = useCallback(async (options) => {
        if (options.showLoading) {
            setIsLoading(true);
        }
        if (options.showLoading) {
            setError(null);
        }
        try {
            const status = await PayController.getBuyStatus(exchangeId, sessionId);
            setData(status);
            setError(null);
            if (onSuccess) {
                onSuccess(status);
            }
            return status;
        }
        catch (err) {
            const fetchError = err instanceof Error
                ? err
                : new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_BUY_STATUS);
            setError(fetchError);
            if (onError) {
                onError(fetchError);
            }
            throw fetchError;
        }
        finally {
            if (options.showLoading) {
                setIsLoading(false);
            }
        }
    }, [exchangeId, sessionId, onSuccess, onError]);
    useEffect(() => {
        if (isEnabled) {
            fetchAndSetStatus({ showLoading: true });
        }
        else {
            setData(null);
            setError(null);
            setIsLoading(false);
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [isEnabled, exchangeId, sessionId]);
    useEffect(() => {
        const isTerminalStatus = data?.status === 'SUCCESS' || data?.status === 'FAILED';
        const shouldPoll = isEnabled && pollingInterval && pollingInterval > 0 && !isTerminalStatus;
        function clearPollingInterval() {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        if (shouldPoll) {
            clearPollingInterval();
            const interval = pollingInterval < MINIMUM_POLLING_INTERVAL ? MINIMUM_POLLING_INTERVAL : pollingInterval;
            intervalRef.current = setInterval(() => {
                fetchAndSetStatus({ showLoading: false }).catch(() => {
                    clearPollingInterval();
                });
            }, interval);
        }
        else {
            clearPollingInterval();
        }
        return clearPollingInterval;
    }, [isEnabled, pollingInterval, data?.status]);
    const refetch = useCallback(async () => {
        if (!isEnabled) {
            return;
        }
        await fetchAndSetStatus({ showLoading: true });
    }, [fetchAndSetStatus, isEnabled]);
    return { data, isLoading, error, refetch };
}
//# sourceMappingURL=react.js.map