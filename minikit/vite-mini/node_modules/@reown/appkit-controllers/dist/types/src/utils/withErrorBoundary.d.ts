import type { TelemetryErrorCategory } from '../controllers/TelemetryController.js';
export type Controller = Record<string, any>;
export declare class AppKitError extends Error {
    category: TelemetryErrorCategory;
    originalError: unknown;
    constructor(message: string, category: TelemetryErrorCategory, originalError?: unknown);
}
export declare function withErrorBoundary<T extends Controller>(controller: T, defaultCategory?: TelemetryErrorCategory): T;
