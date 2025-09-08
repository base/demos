import { generateChildLogger, generatePlatformLogger, getDefaultLoggerOptions } from '@walletconnect/logger';
import { DEFAULT_LOG_LEVEL } from './W3mFrameConstants.js';
export class W3mFrameLogger {
    constructor(projectId) {
        const loggerOptions = getDefaultLoggerOptions({
            level: DEFAULT_LOG_LEVEL
        });
        const { logger, chunkLoggerController } = generatePlatformLogger({
            opts: loggerOptions
        });
        this.logger = generateChildLogger(logger, this.constructor.name);
        this.chunkLoggerController = chunkLoggerController;
        if (typeof window !== 'undefined' && this.chunkLoggerController?.downloadLogsBlobInBrowser) {
            if (!window.downloadAppKitLogsBlob) {
                window.downloadAppKitLogsBlob = {};
            }
            window.downloadAppKitLogsBlob['sdk'] = () => {
                if (this.chunkLoggerController?.downloadLogsBlobInBrowser) {
                    this.chunkLoggerController.downloadLogsBlobInBrowser({
                        projectId
                    });
                }
            };
        }
    }
}
//# sourceMappingURL=W3mFrameLogger.js.map