/// <reference types="node" />
/**
 * Handles communication between the in-app browser and MetaMask mobile application.
 * This function processes and forwards messages through the ReactNativeWebView bridge,
 * supporting both Buffer and regular message formats.
 *
 * @param chunk - The data to be written (either Buffer or message object)
 * @param _encoding - Buffer encoding (unused but required by stream interface)
 * @param cb - Callback function to handle completion or errors
 */
export declare function write(chunk: any, _encoding: BufferEncoding, cb: (error?: Error | null) => void): void;
//# sourceMappingURL=write.d.ts.map