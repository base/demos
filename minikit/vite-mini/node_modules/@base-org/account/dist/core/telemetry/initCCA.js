import { store } from '../../store/store.js';
import { TELEMETRY_SCRIPT_CONTENT } from './telemetry-content.js';
export const loadTelemetryScript = () => {
    return new Promise((resolve, reject) => {
        if (window.ClientAnalytics) {
            return resolve();
        }
        try {
            const script = document.createElement('script');
            script.textContent = TELEMETRY_SCRIPT_CONTENT;
            script.type = 'text/javascript';
            document.head.appendChild(script);
            initCCA();
            document.head.removeChild(script);
            resolve();
        }
        catch (_a) {
            console.error('Failed to execute inlined telemetry script');
            reject();
        }
    });
};
const initCCA = () => {
    var _a, _b, _c;
    if (typeof window !== 'undefined') {
        const deviceId = (_c = (_a = store.config.get().deviceId) !== null && _a !== void 0 ? _a : (_b = window.crypto) === null || _b === void 0 ? void 0 : _b.randomUUID()) !== null && _c !== void 0 ? _c : '';
        if (window.ClientAnalytics) {
            const { init, identify, PlatformName } = window.ClientAnalytics;
            init({
                isProd: true,
                amplitudeApiKey: 'c66737ad47ec354ced777935b0af822e',
                platform: PlatformName.web,
                projectName: 'base_account_sdk',
                showDebugLogging: false,
                version: '1.0.0',
                apiEndpoint: 'https://cca-lite.coinbase.com',
            });
            identify({ deviceId });
            store.config.set({ deviceId });
        }
    }
};
//# sourceMappingURL=initCCA.js.map