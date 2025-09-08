/**
 * useMatrix generates a QR code matrix from a given value.
 * @param errorCorrectionLevel QR code error correction level (L, M, Q, H)
 * @param value String value to encode in QR code. useMatrix adds an 'ethereum:' prefix to the value as we only support EVM addresseses
 * @returns 2D array representing the QR code matrix, where 1 = black pixel and 0 = white pixel
 */
export declare function useMatrix(errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H', value?: string | null): number[][];
//# sourceMappingURL=useMatrix.d.ts.map