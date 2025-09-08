import { type ChunkLoggerController, type Logger } from '@walletconnect/logger';
export declare class W3mFrameLogger {
    logger: Logger;
    chunkLoggerController: ChunkLoggerController | null;
    constructor(projectId: string);
}
