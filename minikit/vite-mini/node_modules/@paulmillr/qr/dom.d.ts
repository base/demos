export declare const getSize: (elm: HTMLElement) => {
    width: number;
    height: number;
};
export type QRCanvasOpts = {
    resultBlockSize: number;
    overlayMainColor: string;
    overlayFinderColor: string;
    overlaySideColor: string;
    overlayTimeout: number;
    cropToSquare: boolean;
};
export type QRCanvasElements = {
    overlay?: HTMLCanvasElement;
    bitmap?: HTMLCanvasElement;
    resultQR?: HTMLCanvasElement;
};
/**
 * Handles canvases for QR code decoding
 */
export declare class QRCanvas {
    private opts;
    private lastDetect;
    private main;
    private overlay?;
    private bitmap?;
    private resultQR?;
    constructor({ overlay, bitmap, resultQR }?: QRCanvasElements, opts?: Partial<QRCanvasOpts>);
    private setSize;
    private drawBitmap;
    private drawResultQr;
    private drawOverlay;
    drawImage(image: CanvasImageSource, height: number, width: number): string | undefined;
    clear(): void;
}
declare class QRCamera {
    private stream;
    private player;
    constructor(stream: MediaStream, player: HTMLVideoElement);
    private setStream;
    /**
     * Returns list of cameras
     * NOTE: available only after first getUserMedia request, so cannot be additional method
     */
    listDevices(): Promise<{
        deviceId: string;
        label: string;
    }[]>;
    /**
     * Change stream to different camera
     * @param deviceId - devideId from '.listDevices'
     */
    setDevice(deviceId: string): Promise<void>;
    readFrame(canvas: QRCanvas, fullSize?: boolean): string | undefined;
    stop(): void;
}
/**
 * Creates new QRCamera from frontal camera
 * @param player - HTML Video element
 * @example
 * const canvas = new QRCanvas();
 * const camera = frontalCamera();
 * const devices = await camera.listDevices();
 * await camera.setDevice(devices[0].deviceId); // Change camera
 * const res = camera.readFrame(canvas);
 */
export declare function frontalCamera(player: HTMLVideoElement): Promise<QRCamera>;
/**
 * Run callback in a loop with requestAnimationFrame
 * @param cb - callback
 * @example
 * const cancel = frameLoop((ns) => console.log(ns));
 * cancel();
 */
export declare function frameLoop(cb: FrameRequestCallback): () => void;
export {};
//# sourceMappingURL=dom.d.ts.map