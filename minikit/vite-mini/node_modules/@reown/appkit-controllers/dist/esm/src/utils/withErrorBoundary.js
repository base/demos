import { TelemetryController } from '../controllers/TelemetryController.js';
export class AppKitError extends Error {
    constructor(message, category, originalError) {
        super(message);
        this.name = 'AppKitError';
        this.category = category;
        this.originalError = originalError;
        // Ensure `this instanceof AppKitError` is true, important for custom errors.
        Object.setPrototypeOf(this, AppKitError.prototype);
        let isStackConstructedFromOriginal = false;
        if (originalError instanceof Error &&
            typeof originalError.stack === 'string' &&
            originalError.stack) {
            const originalErrorStack = originalError.stack;
            /**
             * Most error stacks start with "ErrorName: ErrorMessage\n...frames..."
             * We want to take the "...frames..." part.
             */
            const firstNewlineIndex = originalErrorStack.indexOf('\n');
            if (firstNewlineIndex > -1) {
                const originalFrames = originalErrorStack.substring(firstNewlineIndex + 1);
                this.stack = `${this.name}: ${this.message}\n${originalFrames}`;
                isStackConstructedFromOriginal = true;
            }
        }
        if (!isStackConstructedFromOriginal) {
            /**
             * If stack was not (or could not be) constructed from originalError,
             * generate a standard stack trace for this AppKitError instance.
             * This will point to where `new AppKitError()` was called.
             */
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, AppKitError);
            }
            else if (!this.stack) {
                /**
                 * Fallback for environments without Error.captureStackTrace.
                 * `super(message)` might have set a stack.
                 * If `this.stack` is still undefined/empty, provide a minimal one.
                 * Node.js and modern browsers typically set `this.stack` from `super(message)`.
                 */
                this.stack = `${this.name}: ${this.message}`;
            }
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(err, defaultCategory) {
    const error = err instanceof AppKitError
        ? err
        : new AppKitError(err instanceof Error ? err.message : String(err), defaultCategory, err);
    TelemetryController.sendError(error, error.category);
    throw error;
}
export function withErrorBoundary(controller, defaultCategory = 'INTERNAL_SDK_ERROR') {
    const newController = {};
    Object.keys(controller).forEach(key => {
        const original = controller[key];
        if (typeof original === 'function') {
            let wrapped = original;
            if (original.constructor.name === 'AsyncFunction') {
                wrapped = async (...args) => {
                    try {
                        return await original(...args);
                    }
                    catch (err) {
                        return errorHandler(err, defaultCategory);
                    }
                };
            }
            else {
                wrapped = (...args) => {
                    try {
                        return original(...args);
                    }
                    catch (err) {
                        return errorHandler(err, defaultCategory);
                    }
                };
            }
            newController[key] = wrapped;
        }
        else {
            newController[key] = original;
        }
    });
    return newController;
}
//# sourceMappingURL=withErrorBoundary.js.map