/**
 * Utility functions for base64 encoding and decoding
 * Compatible with both browser and Node.js environments
 */

/**
 * Encodes a Uint8Array to a base64url string
 * @param array - The Uint8Array to encode
 * @returns The base64url encoded string
 */
export function encodeBase64(array: Uint8Array): string {
  let base64: string;

  // Check if we're in a Node.js environment (Buffer is available)
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    base64 = Buffer.from(array).toString("base64");
  } else {
    // Browser environment
    base64 = btoa(
      Array.from(array)
        .map(b => String.fromCharCode(b))
        .join(""),
    );
  }

  // Convert to base64url format by replacing characters
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decodes a base64url string to a Uint8Array
 * @param base64url - The base64url encoded string
 * @returns The decoded Uint8Array
 */
export function decodeBase64(base64url: string): Uint8Array {
  // Convert base64url to standard base64 by restoring special chars
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  // Check if we're in a Node.js environment (Buffer is available)
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return new Uint8Array(Buffer.from(base64, "base64"));
  }

  // Browser environment
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

/**
 * Convert an ArrayBuffer or Uint8Array to a base64url string
 * @param buffer - The buffer to convert
 * @returns The base64url encoded string
 */
export function bufferToBase64URLString(
  buffer: ArrayBuffer | Uint8Array,
): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return encodeBase64(bytes);
}

/**
 * Convert a string to UTF-8 encoded Uint8Array
 * @param value - The string to convert
 * @returns The UTF-8 encoded Uint8Array
 */
export function utf8StringToBuffer(value: string): Uint8Array {
  if (typeof TextEncoder !== "undefined") {
    // Modern browsers and Node.js with TextEncoder support
    return new TextEncoder().encode(value);
  }

  if (typeof Buffer !== "undefined") {
    // Node.js fallback
    return new Uint8Array(Buffer.from(value, "utf8"));
  }

  // Very old browsers fallback (not recommended)
  const bytes = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i++) {
    bytes[i] = value.charCodeAt(i);
  }

  return bytes;
}

/**
 * Convert a base64 string to hex string
 * @param base64 - The base64 string to convert
 * @returns The hex string
 */
export function base64ToHex(base64: string): string {
  const bytes = decodeBase64(base64);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
